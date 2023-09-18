import { useState, useEffect } from "react";

export default function useWeekdays() {
  const [weekdays, setWeekdays] = useState<Date[]>([]);

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const days = Array.from({ length: 7 }, (_, i) => {
      const diff = i - dayOfWeek;
      const date = new Date(today);
      date.setDate(today.getDate() + diff);
      return date;
    });
    setWeekdays(days);
  }, []);

  const formattedWeekDays = weekdays.map((date) =>
    new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(date)
  );
  const today = weekdays
    .find((date) => date.getDay() === new Date().getDay())
    ?.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  return { formattedWeekDays, today };
}
