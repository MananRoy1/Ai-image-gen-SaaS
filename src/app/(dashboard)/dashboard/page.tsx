import { getCredits } from "@/app/actions/credit-action";
import { getImages } from "@/app/actions/image-actions";
import { fetchModels } from "@/app/actions/model-actions";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentImages from "@/components/dashboard/RecentImages";
import RecentModels from "@/components/dashboard/RecentModels";
import StatsCards from "@/components/dashboard/StatsCards";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: models, count: modelCount } = await fetchModels();

  const { data: credits } = await getCredits();
  const { data: images } = await getImages();

  const imageCount = images?.length || 0;

  return (
    <section className="container mx-auto flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold tracking-tight text-3xl">
          Welcome Back, {user?.user_metadata.full_name}
        </h2>
      </div>
      <StatsCards
        imageCount={imageCount}
        modelCount={modelCount}
        credits={credits}
      />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <RecentImages images={images?.slice(0, 6) ?? []} />

        <div className="col-span-full xl:col-span-1 gap-6 xl:space-y-6 xl:gap-0 flex flex-col sm:flex-row xl:flex-col h-full">
          <QuickActions />
          <RecentModels models={models ?? []} />
        </div>
      </div>
    </section>
  );
}
