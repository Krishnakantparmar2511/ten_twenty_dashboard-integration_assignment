
import React from "react";

import "../globals.css";
import Header from "@/components/organism/header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#F8F8F8]">

      <Header userName="John Doe" />

      <div className="w-full mt-7 ">{children}</div>
         
       
    </main>
  );
}
