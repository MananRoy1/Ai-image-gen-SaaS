import { fetchModels } from "@/app/actions/model-actions";
import Configurations from "@/components/image-generation/Configurations";
import GeneratedImages from "@/components/image-generation/GeneratedImages";
import React from "react";


interface searchParams {
  model_id?: string,
}

const ImageGeneration = async ({searchParams}: {searchParams: Promise<searchParams>}) => {

  const model_id = (await searchParams).model_id;
  const {data: userModels} = await fetchModels()
  return (
    <section className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 px-10 pb-4 overflow-hidden">
      <Configurations userModels={userModels || []} model_id={model_id} />
      <div className="col-span-2 md:p-8 p-0 rounded-xl flex items-center justify-center h-fit">
        <GeneratedImages />
      </div>
    </section>
  );
};

export default ImageGeneration;
