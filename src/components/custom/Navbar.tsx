"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import Image from "next/image";

export default function Navbar() {
  const { userId, user } = useStoreUserEffect();

  return (
    <div className="py-6 justify-between flex">
      <Link
        href="/"
        className="scroll-m-20 text-4xl font-bold tracking-tight 
      bg-clip-text bg-gradient-to-r text-transparent from-blue-500 to-blue-800 ">
        Sleek
      </Link>
      {userId ? (
        <div className="flex flex-row gap-2">
          <Button>
            <SignOutButton />
          </Button>
          <Image
            src={user!.imageUrl}
            width={50}
            height={50}
            className="rounded-full"
            alt="profile pic"
          />
        </div>
      ) : (
        <Button>
          <SignInButton />
        </Button>
      )}
    </div>
  );
}
