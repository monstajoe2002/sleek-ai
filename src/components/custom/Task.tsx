"use client";

import React from "react";
import { Card, CardDescription } from "../ui/card";
import { Id } from "@convex/_generated/dataModel";
import EditTaskModal from "./EditTaskModal";

type Props = {
  id?: Id<"tasks">;
  title: string;
};

export default function Task({ title }: Props) {
  return (
    <EditTaskModal>
      <Card className="p-4 mt-4 mb-6 cursor-pointer hover:shadow-md transition-shadow">
        <CardDescription>{title}</CardDescription>
      </Card>
    </EditTaskModal>
  );
}
