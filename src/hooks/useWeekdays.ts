import { useState, useEffect } from "react";

export default function useWeekdays() {
  const [weekDays, setWeekDays] = useState<Date[]>([]);

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const days = Array.from({ length: 7 }, (_, i) => {
      const diff = i - dayOfWeek;
      const date = new Date(today);
      date.setDate(today.getDate() + diff);
      return date;
    });
    setWeekDays(days);
  }, []);

  return weekDays;
}
