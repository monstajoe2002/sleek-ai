"use client";

import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import useWeekdays from "@/hooks/useWeekdays";
import { SignInButton } from "@clerk/clerk-react";

export default function Home() {
  const weekdays = useWeekdays();
  return (
    <div>
      {weekdays.map((day) => (
        <div key={day.toISOString()}>
          {new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            weekday: "long",
            month: "long",
          }).format(day)}
        </div>
      ))}
    </div>
  );
}
