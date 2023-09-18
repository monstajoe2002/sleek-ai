"use client";

import Task from "@/components/custom/Task";
import useWeekdays from "@/hooks/useWeekdays";

export default function Home() {
  const { formattedWeekDays, today } = useWeekdays();
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 my-auto">
      {formattedWeekDays.map((day, i) => (
        <div className="flex flex-col" key={i}>
          <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-blue-400">
            {day}
          </h3>
          <Task title="New" />
        </div>
      ))}
    </div>
  );
}
