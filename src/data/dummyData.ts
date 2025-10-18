// src/data/dummyData.ts
export type DayStats = {
  date: string; // ISO date e.g. "2025-10-01"
  pnl: number;  // USD PnL for the day (negative allowed)
  pct: number;  // percent change for that day
  trades: number;
  wins: number; // number of winning trades
};

export const MONTH_DUMMY: DayStats[] = (() => {
  const out: DayStats[] = [];
  // build dummy data for the current month (1..30)
  for (let d = 1; d <= 30; d++) {
    const date = `2025-10-${String(d).padStart(2, "0")}`;
    if (d % 7 === 0) {
      // empty day
      out.push({ date, pnl: 0, pct: 0, trades: 0, wins: 0 });
    } else {
      const pnl = Math.round((Math.sin(d / 3) * 300 + (d % 3 === 0 ? -200 : 150)));
      const trades = Math.max(0, Math.round(Math.abs(pnl) / 120));
      const wins = Math.round(trades * (0.4 + (d % 5) * 0.1));
      out.push({ date, pnl, pct: Number((pnl / 10000).toFixed(3)), trades, wins });
    }
  }
  return out;
})();
