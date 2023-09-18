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
import { CalendarIcon, Plus } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import useWeekdays from "@/hooks/useWeekdays";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  occurence: z.number().min(1).max(7),
  completed: z.boolean(),
  dates: z.array(z.date()),
});
export default function CreateTaskModal() {
  const weekdays = useWeekdays();
  const createTaskMutation = useMutation(api.tasks.createTask);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // occurence: 1,
      completed: false,
      dates: [weekdays[0]],
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    createTaskMutation({
      title: values.title,
      body: values.description,
      date: values.dates.map((date) => date.toISOString()),
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-2" variant={"secondary"} size="icon">
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
            <FormField
              control={form.control}
              name="occurence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of days</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={7}
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dates"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Day(s) of occurence</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal w-full",
                            !field.value && "text-muted-foreground"
                          )}>
                          {field.value ? (
                            field.value.map((date, index) => (
                              <div key={date?.toISOString()}>
                                {new Intl.DateTimeFormat("en-US", {
                                  weekday: "long",
                                }).format(date)}
                                {index < field.value.length - 1 && ", "}
                              </div>
                            ))
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="multiple"
                        min={1}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > weekdays[weekdays.length - 1] ||
                          date < weekdays[0]
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

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
