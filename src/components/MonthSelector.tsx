"use client";

import React from "react";

type Props = {
  month: number;
  year: number;
  monthlyPnl: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
};

export default function MonthSelector({ month, year, monthlyPnl, onMonthChange, onYearChange }: Props) {
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // Format PnL for display
  const fmt = (v: number) =>
    v < 0 ? `-$${Math.abs(v).toFixed(2)}` : `+$${v.toFixed(2)}`;

  // Determine colors dynamically
  const pnlColor =
    monthlyPnl > 0
      ? "text-green-700 bg-green-100 border-green-300"
      : monthlyPnl < 0
      ? "text-red-700 bg-red-100 border-red-300"
      : "text-gray-200 border-gray-300";

  return (
    <div className="flex items-center gap-4 mt-4 mb-2 justify-between">
      <div className="flex items-center gap-4">
        <label className="text-sm">Select Month:</label>
        <select
          value={month}
          onChange={(e) => onMonthChange(Number(e.target.value))}
          className="text-white border-white border-2 rounded px-2 py-1"
        >
          {monthNames.map((name, i) => (
            <option key={i} value={i}>
              {name} {year}
            </option>
          ))}
        </select>

        <label className="text-sm">Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="text-white border-white border-2 rounded px-2 py-1 w-20"
        />
      </div>

      {/* Monthly PnL display */}
      <div className={`p-2 rounded border-2 text-m font-semibold ${pnlColor}`}>
        <span className="text-gray-800">Monthly Stats:</span> {fmt(monthlyPnl)}
      </div>
    </div>
  );
}
