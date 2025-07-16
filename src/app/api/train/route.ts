import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const WEBHOOK_URL = "https://359c-2409-40c1-6024-2207-f1d6-cb1-79de-357d.ngrok-free.app"

async function validateUserCredits(userId: string){
  const {data: userCredits, error} = await supabaseAdmin.from("credits").select("*").eq("user_id", userId).single();

  if(error) throw new Error ("Error getting user credits!")

  const credits = userCredits?.model_training_count ?? 0;
  if(credits <= 0){
    throw new Error("No credits left for training!")
  }
  return credits;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error("The replicate api token is not set!");
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const input = {
      fileKey: formData.get("fileKey") as string,
      modelName: formData.get("modelName") as string,
      gender: formData.get("gender") as string,
    };
    console.log(input);

    if (!input.fileKey || !input.modelName) {
      return NextResponse.json(
        { error: "Missing required feilds!" },
        { status: 400 }
      );
    }


    const oldCredits = await validateUserCredits(user?.id);


    const fileName = input.fileKey.replace("training-data/", "");
    const { data: fileUrl } = await supabaseAdmin.storage
      .from("training-data")
      .createSignedUrl(fileName, 3600);

    if (!fileUrl?.signedUrl) {
      throw new Error("Failed to get the file URL");
    }

    const modelId = `${user.id}_${Date.now()}_${input.modelName
      .toLowerCase()
      .replaceAll(" ", "_")}`;

    //create model first
    await replicate.models.create("mananroy", modelId, {
      visibility: "private",
      hardware: "gpu-a100-large",
    });

    //start training
    const training = await replicate.trainings.create(
      "ostris",
      "flux-dev-lora-trainer",
      "26dce37af90b9d997eeb970d92e47de3064d46c300504ae376c75bef6a9022d2",
      {
        // You need to create a model on Replicate that will be the destination for the trained version.
        destination: `mananroy/${modelId}`,
        input: {
          steps: 1200,
          resolution: "1024",
          input_images: fileUrl.signedUrl,
          trigger_word: "RDJTM",
        },
        webhook: `${WEBHOOK_URL}/api/webhooks/training?userId=${user.id}&modelName=${encodeURIComponent(input.modelName)}&fileName=${encodeURIComponent(fileName)}`,
        webhook_events_filter: ["completed"]
      }
    );

    //add model values in the supabase
    await supabaseAdmin.from("models").insert({
      model_id: modelId,
      user_id: user.id,
      model_name: input.modelName,
      gender: input.gender === "men" || input.gender === "women" ? input.gender : null,
      training_status: training.status,
      trigger_word: "RDJTM",
      training_steps: 1200,
      training_id: training.id
    })

    // update credits
    await supabaseAdmin.from("credits").update({model_training_count: oldCredits - 1}).eq("user_id", user?.id) 





    // console.log(training)

    return NextResponse.json(
      {success: true,},{ status: 201 }
    );
  } catch (error) {
    console.error("Training Error: ", error);
    const errorMessege =
      error instanceof Error
        ? error.message
        : "Failed to start the the model training!";
    return NextResponse.json(
      {
        error: errorMessege,
      },
      { status: 500 }
    );
  }
}
