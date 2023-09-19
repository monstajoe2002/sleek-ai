"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ThemeToggle from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import GenerateTasksModal from "./GenerateTasksModal";

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
        {userId ? (
          <div className="flex flex-row gap-2">
            <GenerateTasksModal />
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>
                    {user?.emailAddresses[0].toString()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col w-fit gap-2 mt-2">
                <h4 className="font-medium leading-none mb-4">
                  Welcome,{" "}
                  {user?.firstName ?? user?.emailAddresses[0].toString()}
                </h4>
                <ThemeToggle />
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
