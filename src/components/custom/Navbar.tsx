"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import CreateTaskModal from "./CreateTaskModal";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { userId, user } = useStoreUserEffect();

  return (
    <div className="py-6 flex justify-between">
      <Link
        href="/"
        className="scroll-m-20 text-4xl font-bold tracking-tight 
      bg-clip-text bg-gradient-to-r text-transparent from-blue-500 to-blue-800 my-auto ">
        Sleek
      </Link>
      <div className="flex-row flex justify-between gap-4">
        <ThemeToggle />

        {userId ? (
          <div className="flex flex-row gap-2">
            <Popover>
              <PopoverTrigger>
                <Image
                  src={user!.imageUrl}
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="profile pic"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h4 className="font-medium leading-none mb-4">
                  Welcome, {user?.firstName}
                </h4>
                <Button asChild>
                  <SignOutButton />
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button asChild>
            <SignInButton />
          </Button>
        )}
      </div>
    </div>
  );
}
