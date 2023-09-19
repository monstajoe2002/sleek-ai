"use client";

import CreateTaskModal from "@/components/custom/CreateTaskModal";
import Task from "@/components/custom/Task";
import { Skeleton } from "@/components/ui/skeleton";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import useWeekdays from "@/hooks/useWeekdays";
import { SignedIn } from "@clerk/clerk-react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { formattedWeekDays, today } = useWeekdays();
  const { userId } = useStoreUserEffect();
  const getTasksQuery = useQuery(api.tasks.getTasksByUserId, {
    userId: (userId as string) ?? "",
  });
  const dndMutation = useMutation(api.tasks.dragAndDrop);
  const [tasks, setTasks] = useState<typeof getTasksQuery>([]);
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    dndMutation({
      id: result.draggableId as Id<"tasks">,
      date: result.destination.droppableId,
    });
  };

  useEffect(() => {
    if (!tasks) {
      setIsLoading(true);
    }
    setTasks(getTasksQuery);
    setIsLoading(false);
  }, [tasks, getTasksQuery]);
  return (
    <SignedIn>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 my-auto">
          {formattedWeekDays.map((day, i) => (
            <div className="flex flex-col" key={i}>
              <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-blue-400">
                {day}
              </h3>
              <Droppable droppableId={day}>
                {({ innerRef, droppableProps, placeholder }) => (
                  <div ref={innerRef} {...droppableProps}>
                    {isLoading ? (
                      <Skeleton className="p-4 mt-4 mb-6 w-full h-[50px]" />
                    ) : (
                      tasks?.map((task, i) => {
                        if (task.date === day) {
                          return (
                            <Task
                              index={i}
                              key={task._id}
                              title={task.title}
                              id={task._id}
                            />
                          );
                        }
                      })
                    )}
                    {placeholder}
                  </div>
                )}
              </Droppable>
              <CreateTaskModal dueDate={day} />
            </div>
          ))}
        </div>
      </DragDropContext>
    </SignedIn>
  );
}
