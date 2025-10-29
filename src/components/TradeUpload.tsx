"use client";

import React, { useState } from "react";

type TradeUploadProps = {
  onUploadComplete: () => void;
};

export default function TradeUpload({ onUploadComplete }: TradeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a CSV file first.");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Upload failed");

      alert(`✅ Uploaded ${result.count} trades successfully!`);
      setFile(null);
      onUploadComplete();
    } catch (err) {
      console.error(err);
      alert(`❌ ${(err as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="mt-8 p-6 bg-gray-900 rounded-2xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Upload Daily Trades (CSV)</h2>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input id="csvUpload" type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
        <label htmlFor="csvUpload" className="cursor-pointer bg-white text-black font-medium px-5 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-colors">
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
  );
}
