import React from "react";
import TradeDay from "./TradeDay";

type TradeListProps = {
  trades: {
    id: number;
    symbol: string;
    qty: number;
    buyPrice: number;
    sellPrice: number;
    duration: string;
    pnl: number;
    boughtTimestamp: string;
  }[];
};

export default function TradeList({ trades }: TradeListProps) {
  // Group trades by day
  const tradesByDay: Record<string, typeof trades> = trades.reduce((acc, trade) => {
    const dateKey = new Date(trade.boughtTimestamp).toLocaleDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(trade);
    return acc;
  }, {} as Record<string, typeof trades>);

  return (
    <section className="mt-2 space-y-4">
      {Object.keys(tradesByDay).length === 0 ? (
        <p className="text-gray-400">No trades found.</p>
      ) : (
        Object.entries(tradesByDay)
          .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
          .map(([date, tradesForDay]) => <TradeDay key={date} date={date} trades={tradesForDay} />)
      )}
    </section>
  );
}
