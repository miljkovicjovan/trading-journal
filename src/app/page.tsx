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
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  // ✅ Filter data for the selected month
  const monthData = useMemo(() => {
    return MONTH_DUMMY.filter((d) => {
      const dDate = new Date(d.date);
      return dDate.getMonth() === month && dDate.getFullYear() === year;
    });
  }, [month, year]);

  // ✅ Calculate monthly PnL
  const monthlyPnl = useMemo(
    () => monthData.reduce((sum, d) => sum + (d.pnl ?? 0), 0),
    [monthData]
  );

  // ✅ Handle CSV file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  };

  // ✅ Upload CSV to backend
  const handleUpload = async () => {
    if (!file) return alert("Please select a CSV file first.");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Upload failed");

      alert(`✅ Uploaded ${result.count} trades successfully!`);

      setFile(null);
      setShowUpload(false);
    } catch (err) {
      console.error(err);
      alert(`❌ ${(err as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <Header onUploadClick={() => setShowUpload((prev) => !prev)} />

        <MonthSelector
          month={month}
          year={year}
          monthlyPnl={monthlyPnl}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />

        {/* --- CSV Upload Section --- */}
        {showUpload && (
          <section className="mt-8 p-6 bg-gray-900 rounded-2xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Upload Daily Trades (CSV)</h2>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <input
                id="csvUpload"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />

              <label
                htmlFor="csvUpload"
                className="cursor-pointer bg-white text-black font-medium px-5 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-colors"
              >
                {file ? `📄 ${file.name}` : "Choose CSV File"}
              </label>

              {file && (
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  {uploading ? "Uploading..." : "Upload & Save Trades"}
                </button>
              )}
            </div>
          </section>
        )}

        {/* --- Calendar --- */}
        <main className="mt-10">
          <CalendarGrid monthData={monthData} year={year} month={month} />
        </main>
      </div>
    </div>
  );
}
