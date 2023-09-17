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
        <Button className="w-full mt-2" variant={"secondary"}>
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create New Task</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
