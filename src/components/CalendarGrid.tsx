import React from "react";
import DayCell from "./DayCell";
import { DayStats } from "../data/dummyData";

type Props = {
  monthData: DayStats[];
  year: number;
  month: number; // 0 = January
};

type CalendarDay = {
  date: Date | null;
  stats: DayStats | null;
  isPadding?: boolean;
};

function weeklyPnL(week: CalendarDay[]) {
  return week.reduce((sum, d) => sum + (d?.stats?.pnl ?? 0), 0);
}

function daysTraded(week: CalendarDay[]) {
  return week.filter((d) => d?.stats && (d.stats.trades ?? 0) > 0).length;
}

function pctChange(week: CalendarDay[]) {
  const totalPct = week.reduce(
    (sum, d) => sum + ((d?.stats?.pct ?? 0) * ((d?.stats?.trades ?? 0) > 0 ? 1 : 0)),
    0
  );
  const count = daysTraded(week);
  return count ? totalPct / count : 0;
}

function getMonthDays(year: number, month: number): CalendarDay[] {
  const lastDay = new Date(year, month + 1, 0).getDate();
  const days: CalendarDay[] = [];

  for (let d = 1; d <= lastDay; d++) {
    days.push({ date: new Date(year, month, d), stats: null });
  }

  return days;
}

function formatCurrency(v: number) {
  return v < 0 ? `-$${Math.abs(v).toFixed(2)}` : `+$${v.toFixed(2)}`;
}


export default function CalendarGrid({ monthData, year, month }: Props) {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Weekly"];

  const fullMonth = getMonthDays(year, month);

  // Map trades using full date comparison
  fullMonth.forEach((day) => {
    const trade = monthData.find((t) => {
      const tDate = new Date(t.date);
      return (
        tDate.getFullYear() === day.date!.getFullYear() &&
        tDate.getMonth() === day.date!.getMonth() &&
        tDate.getDate() === day.date!.getDate()
      );
    });
    if (trade) day.stats = trade;
  });

  const firstWeekDay = (fullMonth[0].date!.getDay() + 6) % 7; // Monday = 0
  const leadingPadding: CalendarDay[] = Array(firstWeekDay).fill({
    date: null,
    stats: null,
    isPadding: true,
  });

  const totalCells = leadingPadding.length + fullMonth.length;
  const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  const trailingPadding: CalendarDay[] = Array(remaining).fill({
    date: null,
    stats: null,
    isPadding: true,
  });

  const allDays = [...leadingPadding, ...fullMonth, ...trailingPadding];

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  return (
    <div className="mt-6 space-y-3">
      {/* Weekday header */}
      <div className="grid grid-cols-8 gap-3 text-sm font-semibold text-gray-300 mb-2">
        {weekDays.map((d) => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>

      {/* Weeks */}
      {weeks.map((week, idx) => {
        const wPnL = weeklyPnL(week);
        const wDays = daysTraded(week);
        const wPct = pctChange(week);
        const pnlColor =
          wPnL > 0 ? "bg-green-100 border-green-300 text-green-700" :
          wPnL < 0 ? "bg-red-100 border-red-300 text-red-700" :
          "bg-white border-gray-200 text-gray-600";

        return (
          <div key={idx} className="grid grid-cols-8 gap-3 items-start">
            {week.map((d, i) => (
              <DayCell
                key={i}
                stats={d?.stats ?? null}
                date={d?.date ?? null}
                isPadding={d?.isPadding ?? false}
              />
            ))}

            {/* Weekly summary */}
            <div className={`p-3 h-28 flex flex-col justify-between items-center rounded border-2 ${pnlColor}`}>
              <div className="text-sm font-medium">Week {idx + 1}</div>
              <div className="text-lg font-semibold">{formatCurrency(wPnL)}</div>
              <div className="text-xs text-gray-700">{(wPct * 100).toFixed(2)}%</div>
              <div className="text-xs text-gray-700">{wDays} trade days</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
