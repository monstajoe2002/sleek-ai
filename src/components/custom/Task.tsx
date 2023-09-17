"use client";

import React from "react";
import { Card, CardDescription } from "../ui/card";
import { Id } from "@convex/_generated/dataModel";

type Props = {
  id?: Id<"tasks">;
  title: string;
};

export default function Task({ title }: Props) {
  return (
    <Card className="w-full p-4 mt-4 mb-6">
      <CardDescription>{title}</CardDescription>
    </Card>
  );
}
