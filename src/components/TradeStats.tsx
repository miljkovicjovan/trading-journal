import React, { useMemo } from "react";

type Trade = {
  id: number;
  symbol: string;
  priceFormat: number;
  priceFormatType: number;
  tickSize: number;
  buyFillId: string;
  sellFillId: string;
  qty: number;
  buyPrice: number;
  sellPrice: number;
  pnl: number;
  boughtTimestamp: string;
  soldTimestamp: string;
  duration: string;
};

type TradeStatsProps = {
  trades: Trade[];
};

export default function TradeStats({ trades }: TradeStatsProps) {
  const stats = useMemo(() => {
    if (trades.length === 0)
      return { totalPnL: 0, winRate: 0, avgWin: 0, avgLoss: 0 };

    const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
    const wins = trades.filter((t) => t.pnl > 0);
    const losses = trades.filter((t) => t.pnl < 0);

    const winRate = (wins.length / trades.length) * 100;
    const avgWin =
      wins.length > 0
        ? wins.reduce((sum, t) => sum + t.pnl, 0) / wins.length
        : 0;
    const avgLoss =
      losses.length > 0
        ? losses.reduce((sum, t) => sum + t.pnl, 0) / losses.length
        : 0;

    return { totalPnL, winRate, avgWin, avgLoss };
  }, [trades]);

  const { totalPnL, winRate, avgWin, avgLoss } = stats;

  return (
    <div className="text-center space-y-2 text-lg font-semibold">
      <div>
        Total PnL:{" "}
        <span
          className={totalPnL >= 0 ? "text-green-400" : "text-red-400"}
        >
          {totalPnL.toFixed(2)}
        </span>{" "}
        | Win Rate:{" "}
        <span className="text-blue-400">{winRate.toFixed(1)}%</span>
      </div>

      <div>
        Avg Win:{" "}
        <span className="text-green-400">{avgWin.toFixed(2)}</span> | Avg Loss:{" "}
        <span className="text-red-400">{avgLoss.toFixed(2)}</span>
      </div>
    </div>
  );
}
