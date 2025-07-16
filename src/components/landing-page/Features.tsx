import React from "react";
import { AnimatedGradientText } from "../ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Blocks, ImageIcon, Package2, Palette } from "lucide-react";
import Image from "next/image";
import dashboardImg from "@/public/DashBoardImage2.png";
const featureList = [
  {
    title: "AI-Powered Photos",
    description:
      "Instantly transform your photos into high-quality, lifelike images with the power of AI. Whether you need fresh content for social media, professional shots for LinkedIn, or a fun set of images for personal project.",
    icon: <ImageIcon className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    title: "Diverse Photo Packs at Your Fingertips",
    description:
      "Say goodbye to spending hours setting up shots. With over 60 preset photo packs, from classic corporate headshots to trendy street-style looks, you can capture any vibe or mood with a single click",
    icon: <Package2 className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    title: "Customizable Photo Generation",
    description:
      "Tailor each image to reflect your personal or brand style. By creating your own AI model., you can effortlessly fine-tune poses, expressions, and each background settings for a perfect visual representation that fits your unique aesthetic.",
    icon: <Palette className="w-6 h-6" strokeWidth={1.5} />,
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="w-full lg:px-0 px-10 bg-muted py-32 flex flex-col items-center justify-center"
    >
      <div className="container px-6 sm:px-0 sm:mx-8 lg:mx-auto gap-8 relative bg-muted space-y-3">
        <div className="group relative w-fit ml-0 mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
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
          <Blocks className="w-4 h-4" />
          <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <AnimatedGradientText className="text-sm font-medium ml-0 backdrop-blur-0">
            Features!
          </AnimatedGradientText>
        </div>
        <h2 className="lg:text-4xl text-2xl font-bold">
          Unlock Unlimited Possibilities with Pictoria AI
        </h2>
        <p className="text-base text-muted-foreground lg:max-w-[75%]">
          Our platform offers a wide range of features designed to enhance your
          image creation experience. From easy-to-use editing tools to powerful
          AI-powered image generation, we have everything you need to bring your
          ideas to life.
        </p>
      </div>
      <div className="container grid lg:grid-cols-2 grid-cols-1 gap-8 mt-6">
        <div className="flex flex-col justify-start items-start order-2 lg:order-1">
          {featureList.map((feature) => {
            return (
              <div
                key={feature.title}
                className="flex items-start sm:gap-4 gap-2 rounded-lg lg:p-10 p-6"
              >
                <span className="sm:p-2 p-0 rounded-md text-foreground sm:text-background bg-muted sm:bg-foreground">
                  {feature.icon}
                </span>
                <div>
                  <h3 className="sm:text-2xl text-xl font-medium">{feature.title}</h3>
                  <p className="text-xs sm:text-base text-muted-foreground pt-2">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={cn(
            "order-1 lg:order-2 h-fit lg:sticky top-32 pl-16 pt-16 rounded-lg border border-r-gray-300 border-b-gray-300 animate-gradient bg-gradient-to-r from-[#4082e4] via-[#5d3c8c] to-[#4082e4] bg-[length:var(--bg-size)_100%] [--bg-size:400%]"
          )}
        >
          <Image
            src={dashboardImg}
            alt="dashboardImage"
            className="w-full h-auto rounded-tl-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
