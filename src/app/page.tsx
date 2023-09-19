"use client";

import CreateTaskModal from "@/components/custom/CreateTaskModal";
import Task from "@/components/custom/Task";
import { Skeleton } from "@/components/ui/skeleton";
import useWeekdays from "@/hooks/useWeekdays";
import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { formattedWeekDays, today } = useWeekdays();
  const getTasksQuery = useQuery(api.tasks.getAllTasks);
  const onDragEnd = (result: any) => {
    // TODO: handle drag and drop
  };

  useEffect(() => {
    setIsLoading(true);
    if (getTasksQuery) {
      setIsLoading(false);
    }
  }, [getTasksQuery]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 my-auto">
        {formattedWeekDays.map((day, i) => (
          <div className="flex flex-col" key={i}>
            <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-blue-400">
              {day}
            </h3>
            <Droppable droppableId={day}>
              {({ innerRef, droppableProps }) => (
                <div ref={innerRef} {...droppableProps}>
                  {isLoading ? (
                    <Skeleton className="p-4 mt-4 mb-6 w-full h-[50px]" />
                  ) : (
                    getTasksQuery?.map((task, i) => {
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
                </div>
              )}
            </Droppable>
            <CreateTaskModal dueDate={day} />
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
