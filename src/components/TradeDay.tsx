import React, { useState } from "react";
import TradeItem from "./TradeItem";

type TradeDayProps = {
  date: string;
  trades: {
    boughtTimestamp: string;
    id: number;
    symbol: string;
    qty: number;
    buyPrice: number;
    sellPrice: number;
    duration: string;
    pnl: number;
  }[];
};

export default function TradeDay({ date, trades }: TradeDayProps) {
  const [collapsed, setCollapsed] = useState(false);
  const dayPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
  const pnlColor = dayPnL > 0 ? "text-green-400" : dayPnL < 0 ? "text-red-400" : "text-gray-300";

  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="border border-gray-700 rounded-lg bg-gray-900 overflow-hidden">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex justify-between items-center p-3 bg-gray-800 hover:bg-gray-700 transition-colors font-medium text-left"
      >
        <div className="flex items-center gap-2">
          <span>{formattedDate}</span>
          <span className={`${pnlColor} font-semibold`}>
            ({dayPnL >= 0 ? "+" : "-"}${Math.abs(dayPnL).toFixed(2)})
          </span>
        </div>
        <span>{collapsed ? "▼" : "▲"}</span>
      </button>

      {!collapsed && (
        <div className="p-3 space-y-2">
          {trades
            .sort((a, b) => new Date(a.boughtTimestamp).getTime() - new Date(b.boughtTimestamp).getTime())
            .map((t) => (
              <TradeItem key={t.id} trade={t} />
            ))}
        </div>
      )}
    </div>
  );
}
