"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TradeFilters from "@/components/TradeFilters";
import TradeUpload from "@/components/TradeUpload";
import TradeList from "@/components/TradeList";

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
  const [showUpload, setShowUpload] = useState(true);

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
      <div className="max-w-6xl mx-auto">
        <Header onUploadClick={() => setShowUpload((prev) => !prev)} />
        {showUpload && <TradeUpload onUploadComplete={fetchTrades} />}
        <section className="mt-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Trades</h2>
        </section>
        <TradeList trades={trades} />
      </div>
    </div>
  );
}
