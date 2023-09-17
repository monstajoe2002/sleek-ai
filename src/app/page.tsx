"use client";

import Task from "@/components/custom/Task";
import useWeekdays from "@/hooks/useWeekdays";

export default function Home() {
  const weekdays = useWeekdays();
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
      {weekdays.map((day) => (
        <div className="flex flex-col items-center" key={day.toISOString()}>
          <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-blue-400">
            {new Intl.DateTimeFormat("en-US", {
              day: "2-digit",
              weekday: "long",
              month: "long",
            }).format(day)}
          </h3>
          <Task title="New" />
        </div>
      ))}
    </div>
  );
}
