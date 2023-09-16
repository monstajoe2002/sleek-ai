"use client";

import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { SignInButton } from "@clerk/clerk-react";

export default function Home() {
  const { userId, user } = useStoreUserEffect();
  if (userId === null) {
    return <SignInButton />;
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      Hello, {user?.firstName}
    </main>
  );
}
