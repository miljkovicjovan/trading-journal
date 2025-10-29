"use client";

import { useState, useEffect, useRef } from "react";
import { FiFilter } from "react-icons/fi";

export default function TradeFilters({
  showCancelled,
  setShowCancelled,
}: {
  showCancelled: boolean;
  setShowCancelled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      {/* Filter icon button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
        title="Filters"
      >
        <FiFilter className="w-5 h-5" />
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="absolute mt-2 right-0 min-w-[200px] max-w-sm p-4 bg-black/60 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg z-10"
        >
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer overflow-hidden">
              <input
                type="checkbox"
                checked={showCancelled}
                onChange={() => setShowCancelled((prev) => !prev)}
                className="w-4 h-4 accent-green-500 flex-shrink-0"
              />
              <span className="truncate">Show Cancelled Trades</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
