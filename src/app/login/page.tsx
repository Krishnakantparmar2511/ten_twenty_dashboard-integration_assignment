import React, { Suspense } from "react";
import { BrandingPart } from "./components/BrandingPart";
import { LoginForm } from "./components/LoginForm";
import { Spinner } from "@/components/atoms/spinner/Spinner";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Suspense fallback={<Spinner />}>
        <LoginForm />
      </Suspense>

      <BrandingPart />
    </div>
  );
}
