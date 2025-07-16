"use client";

import React, { useState } from "react";
import { AnimatedGradientText } from "../ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tables } from "@datatypes.types";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { CheckIcon } from "lucide-react";

type Product = Tables<"products">;
type Price = Tables<"prices">;

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PricingProps {
  products: ProductWithPrices[];
  mostPopularProduct?: string;
}

const Pricing = ({ products, mostPopularProduct = "pro" }: PricingProps) => {
  const [billingInterval, setBillingInterval] = useState("month");
  return (
    <section className="w-full lg:px-0 px-10 bg-muted flex flex-col items-center justify-center">
      <div className="w-full container mx-auto py-5 flex flex-col items-center justify-center">
        <div className="group relative mx-auto flex items-center justify-center rounded-full w-fit px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
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
          <AnimatedGradientText className="text-sm font-medium">
            Pricing!
          </AnimatedGradientText>
        </div>

        <h1 className="mt-5 capitalize text-2xl text-center lg:text-4xl font-bold">
          Choose the plan that fits your needs
        </h1>
        <p className="mt-4 text-base text-center text-muted-foreground max-w-3xl">
          Choose an affordable plan that is packed with the best features for
          engaging your audience, customer loyalty and driving sales.
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 py-8">
        <Label htmlFor="pricing-switch" className="font-semibold text-base">
          Monthly
        </Label>

        <Switch
          id="pricing-switch"
          checked={billingInterval === "year"}
          onCheckedChange={(checked) =>
            setBillingInterval(checked ? "year" : "month")
          }
        />

        <Label htmlFor="pricing-switch" className="font-semibold text-base">
          Yearly
        </Label>
      </div>

      <div className="grid container md:grid-cols-3 grid-cols-1 place-items-center mx-auto sm:gap-8 gap-y-8">
        {products.map((product) => {
          const price = product?.prices.find(
            (price) => price.interval === billingInterval
          );
          if (!price) {
            return null;
          }
          const priceString = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: price.currency!,
            minimumFractionDigits: 0,
          }).format((price.unit_amount || 0) / 100);

          return (
            <div
              key={product.id}
              className={cn(
                "border bg-background rounded-xl mb-10 shadow-sm h-fit divide-y divide-border border-border",
                product.name?.toLowerCase() === mostPopularProduct.toLowerCase()
                  ? "border-primary bg-background drop-shadow-md scale-105"
                  : "border-border"
              )}
            >
              <div className="p-5">
                <h2 className="text-xl leading-6 font-semibold text-foreground flex items-center justify-between">
                  {product.name}
                  {product.name?.toLowerCase() ===
                  mostPopularProduct.toLowerCase() ? (
                    <Badge className="border-border font-semibold">
                      Most Polpular
                    </Badge>
                  ) : null}
                </h2>
                <p className="text-muted-foreground mt-4 text-sm">
                  {product.description}
                </p>
                <p className="mt-8">
                  <span className="text-3xl font-extrabold text-foreground">
                    {priceString}
                  </span>
                  <span className="text-base font-medium text-muted-foreground">
                    /{billingInterval}
                  </span>
                </p>
                <Link href="/login?state=signup">
                  <Button
                    className="mt-6 w-full font-semibold"
                    variant={
                      product.name?.toLowerCase() ===
                      mostPopularProduct.toLowerCase()
                        ? "default"
                        : "secondary"
                    }
                  >
                    Subscribe
                  </Button>
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="uppercase tracking-wide text-foreground font-medium text-sm">
                  {" "}
                  What&apos;s included
                </h3>
                <ul className="mt-6 space-y-2">
                  {Object.values(product.metadata || {}).map(
                    (feature, index) => {
                      if (feature) {
                        return (
                          <li
                            className="flex space-x-3 items-center"
                            key={index}
                          >
                            <CheckIcon className="h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        );
                      }
                    }
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Pricing;
