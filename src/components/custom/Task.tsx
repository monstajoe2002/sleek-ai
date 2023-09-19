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
import { Draggable } from "react-beautiful-dnd";
import { Checkbox } from "../ui/checkbox";

type Props = {
  id: Id<"tasks">;
  title: string;
  index: number;
  completed: boolean;
};

export default function Task({ title, id, index, completed }: Props) {
  const deleteTaskMutation = useMutation(api.tasks.deleteTask);
  const toggleTaskMutation = useMutation(api.tasks.toggleTask);
  function toggleTask() {
    toggleTaskMutation({ id });
  }
  const deleteTask = () => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    deleteTaskMutation({ id });
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <ContextMenu>
          <ContextMenuTrigger>
            <EditTaskModal taskId={id}>
              <Card
                className="p-4 mt-4 mb-2 cursor-pointer hover:shadow-md transition-shadow"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                <CardDescription className="text-base">
                  <Checkbox
                    className="mr-2"
                    onCheckedChange={toggleTask}
                    checked={completed}
                  />
                  <span className={completed ? "line-through" : ""}>
                    {title}
                  </span>
                </CardDescription>
              </Card>
            </EditTaskModal>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              className="focus:bg-red-100 focus:text-red-600 text-red-600 dark:focus:bg-red-600 
              dark:focus:bg-opacity-50 dark:focus:text-red-100"
              onClick={deleteTask}>
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      )}
    </Draggable>
  );
}
