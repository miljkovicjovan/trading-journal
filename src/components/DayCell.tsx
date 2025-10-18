import React from "react";
import { DayStats } from "../data/dummyData";

type Props = {
  stats: DayStats | null;
  date: Date | null; // the actual date of the cell
  isPadding?: boolean;
};

const formatCurrency = (v: number) =>
  v === 0 ? "$0.00" : v < 0 ? `-$${Math.abs(v).toFixed(2)}` : `+$${v.toFixed(2)}`;

export default function DayCell({ stats, date, isPadding }: Props) {
  // padding cells (outside month)
  if (isPadding) {
    return (
      <div className="p-3 h-28 flex flex-col justify-between rounded border bg-gray-700 border-gray-600"></div>
    );
  }

  // no trades
  if (!stats || stats.trades === 0) {
    return (
      <div className="p-3 h-28 flex flex-col justify-between rounded border bg-gray-100 border-gray-200">
        <div className="text-sm text-gray-500">{date ? date.getDate() : ""}</div>
        <div className="text-xs text-gray-400">no trades</div>
      </div>
    );
  }

  const { pnl, pct, trades, wins } = stats;
  const dayNum = date?.getDate() ?? 0;
  const winRate = trades === 0 ? 0 : Math.round((wins / trades) * 100);

  const bgClass =
    pnl > 0 ? "bg-green-100 border-green-300" : pnl < 0 ? "bg-red-100 border-red-300" : "bg-white border-gray-200";

  const pnlClass = pnl > 0 ? "text-green-700" : pnl < 0 ? "text-red-700" : "text-gray-700";

  return (
    <div className={`p-3 h-28 flex flex-col justify-between rounded border-2 ${bgClass}`}>
      <div className="flex justify-between items-start">
        <div className="text-sm font-medium text-gray-700">{dayNum}</div>
        <div className={`text-sm font-semibold ${pnlClass}`}>{formatCurrency(pnl)}</div>
      </div>

      <div className={`text-xs text-gray-700`}>
        <div>{(pct * 100).toFixed(2)}%</div>
        <div>{winRate}% WR</div>
        <div>{trades} trades</div>
      </div>
    </div>
  );
}
