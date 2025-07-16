"use client";

import React, { useState } from "react";
import LoginForm from "@/components/authentication/LoginForm";
import { Button } from "@/components/ui/button";
import SignupForm from "@/components/authentication/SignupForm";
import Link from "next/link";
import ResetForm from "./ResetForm";

const AuthForm = ({state}:{state: string}) => {
  const [mode, setMode] = useState(state);
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {mode === "reset"
            ? "Reset Password"
            : mode === "login"
            ? "Login"
            : "Sign Up"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {mode === "reset"
            ? "Enter your email below to reset your password"
            : mode === "login"
            ? "Enter your email below to login to your account"
            : "Enter your information below to create an account"}
        </p>
      </div>
      {mode === "login" && (
        <>
          <LoginForm />
          <div className="text-center flex justify-between">
            <Button
              className="p-0"
              variant={"link"}
              onClick={() => setMode("signup")}
            >
              Need an account? Sign Up
            </Button>
            <Button
              className="p-0"
              variant={"link"}
              onClick={() => setMode("reset")}
            >
              Forgot password?
            </Button>
          </div>
        </>
      )}
      {mode === "signup" && (
        <>
          <SignupForm />
          <div className="text-center">
            <Button
              className="p-0"
              variant={"link"}
              onClick={() => setMode("login")}
            >
              Already have an account? Login now.
            </Button>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking sign up, you agree to our
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              &nbsp;terms & conditions
            </Link>
            &nbsp;and
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              &nbsp;Privacy policy
            </Link>
          </p>
        </>
      )}
      {mode === "reset" && (
        <>
          <ResetForm />
          <div className="text-center">
            <Button
              className="p-0"
              variant={"link"}
              onClick={() => setMode("login")}
            >
              Back to login
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;
