import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import React from "react";
import { Card, CardDescription } from "../ui/card";

export default function EditTaskModal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" w-full flex flex-col justify-center">
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
  );
}
