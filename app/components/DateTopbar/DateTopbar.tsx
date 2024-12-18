"use client";

import moment from "moment";
import { useMemo } from "react";
import { useState } from "react";
import { iTodoStore, todoStore } from "@/store/todoStore";

const DateTopbar: React.FC = () => {
  const today = moment();
  const datesWithWeekdays = useMemo(() => getDates(today, 3), []);
  const [selectedDate, setSelectedDate] = useState(datesWithWeekdays[3]);

  const setCurrentDate = todoStore((state:iTodoStore) => state.setCurrentDate) 

  return (
    <div id="DateTopbar" className="flex flex-col bg-white rounded-3xl shadow-2xl shadow-zinc-200">
      <div className="text-lg font-black px-9 pt-4">Todo list</div>
      <div className="flex">
        {datesWithWeekdays.map((date) => (
          <div
            key={date.dateDay}
            className="pb-2 pt-1 flex-1 flex justify-center items-center"
          >
            <div
              onClick={() => {
                setSelectedDate(date)
                setCurrentDate(date.date)
            }}
              className={
                "px-[14px] py-[10px] cursor-pointer rounded-lg flex flex-col justify-center items-center " +
                (selectedDate.dateDay === date.dateDay ? "bg-zinc-900" : "")
              }
            >
              <div className="text-xs font-semibold text-zinc-300">
                {date.weekdayNumber}
              </div>
              <div
                className={
                  "text-xl " +
                  (selectedDate.dateDay === date.dateDay
                    ? "!text-white "
                    : "") +
                  (today.date() < date.dateDay ? "text-zinc-400" : "")
                }
              >
                {date.dateDay}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

//Getting all the dates with week around today
function getDates(centerDate: moment.Moment, range: number) {
  const dates = [];
  for (let i = -range; i <= range; i++) {
    const date = centerDate.clone().add(i, "days");
    dates.push({
      date: date.format("YYYY-MM-DD"),
      dateDay: date.date(),
      weekday: date.format("dddd"),
      weekdayNumber: date.format("dddd")[0],
    });
  }
  return dates;
}

export default DateTopbar;
