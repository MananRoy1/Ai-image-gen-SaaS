/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AnimatedGradientText } from "../ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { AuroraText } from "../magicui/aurora-text";
import { Marquee } from "../magicui/marquee";
import img1 from "@/public/hero-images/Charismatic Young Man with a Warm Smile and Stylish Tousled Hair.jpeg";
import img2 from "@/public/hero-images/1.jpg";
import img3 from "@/public/hero-images/2.jpg";
import img4 from "@/public/hero-images/3.png";
import img5 from "@/public/hero-images/Confident Businesswoman on Turquoise Backdrop.jpeg";
import img6 from "@/public/hero-images/Confident Woman in Red Outfit.jpeg";
import img7 from "@/public/hero-images/Confident Woman in Urban Setting.jpeg";
import img8 from "@/public/hero-images/Futuristic Helmet Portrait.jpeg";
import img9 from "@/public/hero-images//Futuristic Woman in Armor.jpeg";
import img10 from "@/public/hero-images/Poised Elegance of a Young Professional.jpeg";
import img11 from "@/public/hero-images/Man in Brown Suit.jpeg";
import Image from "next/image";

const avatars = [
  {
    src: "/avatars/AutumnTechFocus.jpeg",
    fallback: "CN",
  },
  {
    src: "/avatars/Casual Creative Professional.jpeg",
    fallback: "AB",
  },
  {
    src: "/avatars/Golden Hour Contemplation.jpeg",
    fallback: "FG",
  },
  {
    src: "/avatars/Portrait of a Woman in Rust-Colored Top.jpeg",
    fallback: "PW",
  },
  {
    src: "/avatars/Radiant Comfort.jpeg",
    fallback: "RC",
  },
  {
    src: "/avatars/Relaxed Bearded Man with Tattoo at Cozy Cafe.jpeg",
    fallback: "RB",
  },
];

const Images = [
  {
    src: img1,
    alt: "AI generated image",
  },
  {
    src: img2,
    alt: "AI generated image",
  },
  {
    src: img3,
    alt: "AI generated image",
  },
  {
    src: img4,
    alt: "AI generated image",
  },
  {
    src: img5,
    alt: "AI generated image",
  },
  {
    src: img6,
    alt: "AI generated image",
  },
  {
    src: img7,
    alt: "AI generated image",
  },
  {
    src: img8,
    alt: "AI generated image",
  },
  {
    src: img9,
    alt: "AI generated image",
  },
  {
    src: img10,
    alt: "AI generated image",
  },
  {
    src: img11,
    alt: "AI generated image",
  },
];

const MarqeeColumn = ({
  reverse,
  className,
  duration,
}: {
  reverse: boolean;
  duration: string;
  className?: string;
}) => {
  return (
    <Marquee
      reverse={reverse}
      pauseOnHover
      vertical
      className={cn(
        "w-full relative h-full flex flex-col justify-center items-center", className)}
      style={{
        "--duration": duration,
      } as any}
    >
      {Images.sort(() => Math.random() - 0.5).map((image, index) => {
        return (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            priority
            className="w-full h-full object-cover rounded-lg opacity-[.25] hover:opacity-100 transition-opacity duration-300 ease-in-out"
          />
        );
      })}
    </Marquee>
  );
};

const HeroSection = () => {
  return (
    <section className="w-full relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <div className="z-30">
        <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
          <span
            className={cn(
              "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
            }}
          />
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <AnimatedGradientText className="text-sm font-medium">
            Try new flux model
          </AnimatedGradientText>
          <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </div>
      </div>
      <div className="space-y-4 mx-auto flex flex-col z-40 backdrop-blur-[2px] mt-4 max-w-[800px] text-center">
        <h1 className="lg:text-6xl md:text-5xl sm:text-3xl font-extrabold tracking-tighter">
          Transform your photos with the power of <AuroraText>AI</AuroraText>
        </h1>
        <p className="mx-auto mb-8 lg:text-xl sm:text-md md:text-lg text-gray-600 px-2 lg:p-0">
          From LinkedIn headshots to Instagram influencer photos, Pictoria
          AI&apos;s state-of-the-art technology ensures you always look your
          best. Create, edit, and generate images effortlessly.
        </p>
      </div>
      <div className="flex items-center space-x-2 my-4 z-30">
        <div className="flex items-center -space-x-5 sm:-space-x-4 overflow-hidden">
          {avatars.map((avatar, index) => {
            return (
              <Avatar
                key={index}
                className="inline-block border-2 border-background"
              >
                <AvatarImage src={avatar.src} />
                <AvatarFallback>{avatar.fallback}</AvatarFallback>
              </Avatar>
            );
          })}
        </div>
        <span className="text-sm font-medium">Loved by 1K+ customers </span>
      </div>
      <Link href={"/login"} className="my-2 z-40">
        <Button className="rounded-md text-base h-11">
          ✨Create your first AI model✨
        </Button>
      </Link>

      <div className="absolute top-0 w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 z-10">
        <MarqeeColumn reverse={false} duration="120s" className="" />
        <MarqeeColumn reverse={true} duration="120s" className="" />
        <MarqeeColumn reverse={false} duration="120s" className="" />
        <MarqeeColumn reverse={true} duration="120s" className="hidden md:flex" />
        <MarqeeColumn reverse={false} duration="120s" className="hidden lg:flex" />
        <MarqeeColumn reverse={true} duration="120s" className="hidden lg:flex" />
      </div>
    </section>
  );
};

export default HeroSection;
