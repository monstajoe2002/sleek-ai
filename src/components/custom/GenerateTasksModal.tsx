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
import { Plus, Sparkles } from "lucide-react";
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
import useWeekdays from "../../hooks/useWeekdays";
import { useAction } from "convex/react";
import { api } from "@convex/_generated/api";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { Id } from "@convex/_generated/dataModel";
const formSchema = z.object({
  prompt: z.string(),
});
export default function GenerateTasksModal() {
  const createTaskMutation = useAction(api.tasks.generateTasks);
  const { today } = useWeekdays();
  const { userId } = useStoreUserEffect();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    createTaskMutation({
      userPrompt: values.prompt,
      date: today!,
      userId: userId as Id<"users">,
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-2">
          <Sparkles className="h-4 w-4 mr-2" />
          Generate using AI
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{`Got a lot this week? Write them down here and we'll take care of the rest!`}</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea required {...field} />
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
