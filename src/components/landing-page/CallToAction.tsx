import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const CallToAction = () => {
  return (
    <section className="mb-16 bg-muted w-full mt-16">
      <div className="text-center space-y-4 rounded-lg  py-16">
        <h1 className="lg:text-4xl text-2xl font-bold">Ready to Transform Your Photos?</h1>
        <p className="pb-5 text-base text-muted-foreground">
          Join thousands of users who are already creating amazing AI-generated
          images.
        </p>
        <Link href={"/login"} className="my-2 z-40">
          <Button className="rounded-md text-base h-11 animate-bounce">
            ✨Create your first AI model✨
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
