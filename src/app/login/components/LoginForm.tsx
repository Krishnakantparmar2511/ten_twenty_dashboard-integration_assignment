"use client";

import { Button } from "@/components/atoms/button/Button";
import { Input } from "@/components/atoms/Input/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../validation/LoginSchema";
import { useLogin } from "../hooks/useLogin";

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { errors, isSubmitting } = formState;
  const { onSubmit, loginError } = useLogin();

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Welcome back
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="test@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="password123"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{loginError}</p>
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                {...register("rememberMe")}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              text={isSubmitting ? "Signing in..." : "Sign in"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
