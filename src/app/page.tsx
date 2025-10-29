"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TradeList from "@/components/TradeList";
import TradeStats from "@/components/TradeStats";

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

export default function Page() {
  const [trades, setTrades] = useState<Trade[]>([]);

  const fetchTrades = async () => {
    try {
      const res = await fetch("/api/trades");
      const data = await res.json();
      setTrades(data.trades);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Header onUploadComplete={fetchTrades} />
        <TradeStats trades={trades} />
        <TradeList trades={trades} />
      </div>
    </div>
  );
}
