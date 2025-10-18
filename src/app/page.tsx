"use client";

import React, { useState, useMemo } from "react";
import Header from "../components/Header";
import CalendarGrid from "../components/CalendarGrid";
import MonthSelector from "../components/MonthSelector";
import { MONTH_DUMMY } from "../data/dummyData";

export default function Page() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  // Filter data for the selected month
  const monthData = useMemo(() => {
    return MONTH_DUMMY.filter((d) => {
      const dDate = new Date(d.date);
      return dDate.getMonth() === month && dDate.getFullYear() === year;
    });
  }, [month, year]);

  const monthlyPnl = useMemo(() => monthData.reduce((sum, d) => sum + (d.pnl ?? 0), 0), [monthData]);

  const handleUpload = () => alert("Upload clicked — CSV upload coming soon!");

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <Header
          onUploadClick={handleUpload}
        />

        <MonthSelector
          month={month}
          year={year}
          monthlyPnl={monthlyPnl}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
        <main>
          <CalendarGrid monthData={monthData} year={year} month={month} />
        </main>
      </div>
    </div>
  );
}
