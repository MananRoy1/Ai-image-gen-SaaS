/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useId, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { ChangePassword } from "@/app/actions/auth-actions";

const passwordValidationRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"
);

const formSchema = z
  .object({
    password: z
      .string({
        required_error: "Password is required!",
      })
      .min(8, {
        message: "Password must be at least 8 characters long!",
      })
      .regex(passwordValidationRegex, {
        message:
          "Password must contain 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.",
      }),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

const ChangePasswordForm = ({ className }: { className?: string }) => {
  const [loading, setLoading] = useState(false);

  const toastId = useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Changing Password... ", { id: toastId });
    setLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      const { success, error } = await ChangePassword(values.password);
      if (!success) {
        toast.error(String(error), { id: toastId });
        setLoading(false);
      } else {
        toast.success("Password is successfully updated!", {
          id: toastId,
        });
        setLoading(false);
        redirect("/login");
      }
    } catch (error: any) {
        toast.error(String(error?.message), {id: toastId})
    }finally{
        setLoading(false)
    }
  }
  return (
    <div className={cn("grid gap-6", className)}>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Change Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your new password below to change or update your password.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a strong password that meets the requirements above.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Re-enter your new password to confirm
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full pt-4">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Changing password..." : "Change Password"}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Make sure to your remember your password or store it securely.
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
