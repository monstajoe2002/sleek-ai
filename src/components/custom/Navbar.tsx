"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";

export default function Navbar() {
  const { userId, user } = useStoreUserEffect();

  return (
    <div className="py-6 justify-between">
      <Link
        href="/"
        className="scroll-m-20 text-4xl font-bold tracking-tight 
      bg-clip-text bg-gradient-to-r text-transparent from-blue-500 to-blue-800 ">
        Sleek
        <Button>{userId ? <SignOutButton /> : <SignInButton />}</Button>
      </Link>
    </div>
  );
}
