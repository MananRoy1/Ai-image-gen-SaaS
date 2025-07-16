import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CreditCard, PlusIcon, Wand2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Get started with common actions</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button asChild className="w-full">
          <Link href={"/image-generation"}>
            <Wand2Icon className="mr-2 w-4 h-4" />
            Generate Image
          </Link>
        </Button>

        <Button asChild className="w-full" variant={"destructive"}>
          <Link href={"/model-training"}>
            <PlusIcon className="mr-2 w-4 h-4" />
            Train New Model
          </Link>
        </Button>

        <Button asChild className="w-full" variant={"secondary"}>
          <Link href={"/billings"}>
            <CreditCard className="mr-2 w-4 h-4" />
            Billing
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
