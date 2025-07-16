import { cn } from "@/lib/utils";
import React from "react";
import { AnimatedGradientText } from "../ui/animated-gradient-text";
import avatar1 from "@/public/avatars/AutumnTechFocus.jpeg";
import avatar2 from "@/public/avatars/Casual Creative Professional.jpeg";
import avatar3 from "@/public/avatars/Golden Hour Contemplation.jpeg";
import avatar4 from "@/public/avatars/Portrait of a Woman in Rust-Colored Top.jpeg";
import avatar5 from "@/public/avatars/Radiant Comfort.jpeg";
import avatar6 from "@/public/avatars/Relaxed Bearded Man with Tattoo at Cozy Cafe.jpeg";
import { Marquee } from "../magicui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Jack Smith",
    username: "@jacksmith",
    body: "The dating profile photos I received transformed my online presence and boosted my matches significantly. Truly a game changer!",
    img: avatar1,
  },
  {
    name: "Jill Smith",
    username: "@jillsmith",
    body: "I was completely blown away by the results. This service exceeded all my expectations. Absolutely amazing!",
    img: avatar2,
  },
  {
    name: "John Doe",
    username: "@johndoe",
    body: "Using Photo AI for my LinkedIn profile was a fantastic decision. The quality was outstanding, and I got multiple job offers!",
    img: avatar3,
  },
  {
    name: "Jane Doe",
    username: "@janedoe",
    body: "Words can't express how thrilled I am with the results. This service is simply phenomenal. I love it!",
    img: avatar4,
  },
  {
    name: "Jenny Mandell",
    username: "@jennymandell",
    body: "I can't find the words to describe how impressed I am. This service is truly remarkable. I love it!",
    img: avatar5,
  },
  {
    name: "James Cameron",
    username: "@jamescameron",
    body: "I am genuinely amazed by the quality of the photos. This service is a game changer for anyone looking to enhance their profile!",
    img: avatar6,
  },
];

import type { StaticImageData } from "next/image";

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: StaticImageData;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-4 flex flex-col justify-between",
        // light styles
        "border-primary/[.15] bg-muted/70 hover:bg-muted/80",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full aspect-square"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="w-full lg:px-0 px-10 py-32 flex flex-col items-center justify-center overflow-hidden space-y-4"
    >
      <div>
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
          <AnimatedGradientText className="text-sm font-medium backdrop-blur-0">
            Testimonials!
          </AnimatedGradientText>
        </div>
      </div>
      <h2 className="lg:text-4xl text-2xl font-bold">What Our Users Say </h2>
      <p className="text-base text-muted-foreground text-center lg:max-w-3xl">
        Discover why thousands are choosing Pictoria AI for effortless,
        high-quality photo generation, from LinkedIn headshots to vibrant social
        media content.
      </p>
      <div className="relative pt-10 flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:50s] [--gap:1rem] sm:[--gap:2rem]">
          {reviews.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:50s] [--gap:1rem] sm:[--gap:2rem] sm:mt-4 mt-1">
          {reviews.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 sm:w-1/4 w-1/3 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 sm:w-1/4 w-1/3 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
};

export default Testimonials;
