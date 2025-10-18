// src/components/Header.tsx
import React from "react";

type Props = {
  onUploadClick?: () => void;
};

export default function Header({onUploadClick }: Props) {

  return (
    <header className="flex items-center justify-between">
        <div className="text-right">
          <div className="text-2xl font-bold text-white">MyJournal</div>
          <div className="text-xs text-gray-300">trading stats</div>
        </div>

        <button
          onClick={onUploadClick}
          className="px-4 py-2 border rounded-md text-sm"
        >
          Upload new data
        </button>
    </header>
  );
}
