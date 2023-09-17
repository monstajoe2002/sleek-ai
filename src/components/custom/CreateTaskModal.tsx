import React, { ComponentProps } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
type Props = ComponentProps<typeof Button>;
export default function CreateTaskModal({ className }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className={className}>
          <Plus className="mr-1" />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create New Task</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
