"use client";

import React from "react";
import { Card, CardDescription } from "../ui/card";
import { Id } from "@convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type Props = {
  id?: Id<"tasks">;
  title: string;
};

export default function Task({ title }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-full p-4 mt-4 mb-6 cursor-pointer hover:shadow-md transition-shadow">
          <CardDescription>{title}</CardDescription>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          Edit <span className="font-medium">{title}</span>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
