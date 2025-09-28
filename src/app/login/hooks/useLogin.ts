"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { setAccessToken } from "@/utils/auth";
import  type { LoginFormData } from "../validation/LoginSchema";


export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginError, setLoginError] = useState<string>("");

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoginError(""); 

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setLoginError(
          "valid email=test@example.com and password=password123. Please try again."
        );
        return;
      }

      if (result?.ok) {
        const sessionResponse = await fetch("/api/auth/session");
        const session = await sessionResponse.json();

        const accessToken =
          session?.user?.accessToken ;

        setAccessToken(accessToken);

        await new Promise((res) => setTimeout(res, 100));

        const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
        router.push(callbackUrl);
      }
    } catch (err) {
      setLoginError("An unexpected error occurred. Please try again.");
    }
  };

  return {
    onSubmit,
    loginError,
  };
}
