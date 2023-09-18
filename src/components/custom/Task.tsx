"use client";

import React from "react";
import { Card, CardDescription } from "../ui/card";
import { Id } from "@convex/_generated/dataModel";
import EditTaskModal from "./EditTaskModal";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Trash } from "lucide-react";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";

type Props = {
  id: Id<"tasks">;
  title: string;
};

export default function Task({ title, id }: Props) {
  const deleteTaskMutation = useMutation(api.tasks.deleteTask);
  const deleteTask = () => {
    deleteTaskMutation({ id });
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <EditTaskModal taskId={id}>
          <Card className="p-4 mt-4 mb-6 cursor-pointer hover:shadow-md transition-shadow">
            <CardDescription className="text-base">{title}</CardDescription>
          </Card>
        </EditTaskModal>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className="focus:bg-red-100 focus:text-red-600 text-red-600"
          onClick={deleteTask}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
