import CallToAction from "@/components/landing-page/CallToAction";
import Faqs from "@/components/landing-page/Faqs";
import Features from "@/components/landing-page/Features";
import Footer from "@/components/landing-page/Footer";
import HeroSection from "@/components/landing-page/HeroSection";
import Navigation from "@/components/landing-page/Navigation";
import Pricing from "@/components/landing-page/Pricing";
import Testimonials from "@/components/landing-page/testimonials";
import { getProducts, getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const [user, products] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
  ]);

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navigation />
      <HeroSection />
      <Features />
      <Testimonials />
      {/* <Pricing products={products ?? []} /> */}
      <Faqs />
      <CallToAction />
      <Footer />
    </main>
  );
}
