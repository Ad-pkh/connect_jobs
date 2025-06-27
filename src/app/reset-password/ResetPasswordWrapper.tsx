"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the client-only logic
const ResetPasswordClient = dynamic(() => import("./Resetpassword"), {
  ssr: false,
});

export default function ResetPasswordWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
