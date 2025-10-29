// src/components/Header.tsx
"use client";

import React, { useState, useRef } from "react";

type Props = {
  onUploadComplete?: () => void;
};

export default function Header({ onUploadComplete }: Props) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger hidden file input
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Upload failed");

      alert(`✅ Uploaded ${result.count} trades successfully!`);
      onUploadComplete?.();
    } catch (err) {
      console.error(err);
      alert(`❌ ${(err as Error).message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; // reset input
    }
  };

  return (
    <header className="flex items-center justify-between">
      <div className="text-right">
        <div className="text-2xl font-bold text-white">MyJournal</div>
        <div className="text-xs text-gray-300">trading stats</div>
      </div>

      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 border rounded-md text-sm"
        >
          {uploading ? "Uploading..." : "Upload Trades"}
        </button>
      </div>
    </header>
  );
}
