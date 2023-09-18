"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import useWeekdays from "@/hooks/useWeekdays";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  completed: z.boolean(),
  date: z.string().optional(),
});

export default function CreateTaskModal({ dueDate }: { dueDate: string }) {
  const createTaskMutation = useMutation(api.tasks.createTask);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      completed: false,
      date: dueDate,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    createTaskMutation({
      title: values.title,
      body: values.description,
      date: dueDate,
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-5" variant={"secondary"} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create New Task</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
