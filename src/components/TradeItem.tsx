import React from "react";

type TradeItemProps = {
  trade: {
    id: number;
    symbol: string;
    qty: number;
    buyPrice: number;
    sellPrice: number;
    duration: string;
    pnl: number;
  };
};

export default function TradeItem({ trade }: TradeItemProps) {
  return (
    <div className="p-3 border border-gray-700 rounded bg-gray-800 flex justify-between">
      <div>
        <span className="font-medium">{trade.symbol}</span> - Qty: {trade.qty} - Buy: {trade.buyPrice} - Sell: {trade.sellPrice} - Duration: {trade.duration}
      </div>
      <div className={`${trade.pnl >= 0 ? "text-green-400" : "text-red-400"} font-semibold`}>
        {trade.pnl >= 0 ? "+" : "-"}${Math.abs(trade.pnl).toFixed(2)}
      </div>
    </div>
  );
}
