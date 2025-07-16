"use client";

import { Tables } from "@datatypes.types";
import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ImageDialog from "./ImageDialog";

type ImageProps = {
  url: string | undefined;
} & Tables<"generated_images">;

interface GalleryProps {
  images: ImageProps[];
}

const GalleryComponent = ({ images }: GalleryProps) => {
  const [selectedImage, setselectedImage] = useState<ImageProps | null>(null);
  console.log(images);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-xl text-muted-foreground">
        No Images Found!
      </div>
    );
  }
  return (
    <section className="container mx-auto py-4">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {images.map((image, index) => {
          return (
            <div key={index}>
              <div
                className="relative group overflow-hidden cursor-pointer transition-transform"
                onClick={() => setselectedImage(image)}
              >
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50 rounded">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-primary-foreground flex items-center gap-1 text-lg font-semibold border border-white/80 py-1 px-2 rounded">
                      View Details <ArrowRight className="size-4" />
                    </p>
                  </div>
                </div>
                <Image
                  src={image.url || ""}
                  alt={image.prompt || ""}
                  width={image.width || 0}
                  height={image.height || 0}
                  className="object-cover rounded"
                />
              </div>
            </div>
          );
        })}
      </div>
      {selectedImage && <ImageDialog image={selectedImage} onClose={() => setselectedImage(null)}/>}
    </section>
  );
};

export default GalleryComponent;
