import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Trade } from "@prisma/client";
import { parse } from "csv-parse/sync";

const prisma = new PrismaClient();

type CsvTrade = {
  symbol: string;
  _priceFormat: string;
  _priceFormatType: string;
  _tickSize: string;
  buyFillId: string;
  sellFillId: string;
  qty: string;
  buyPrice: string;
  sellPrice: string;
  pnl: string;
  boughtTimestamp: string;
  soldTimestamp: string;
  duration: string;
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file)
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );

    const csvText = await file.text();

    // Parse CSV safely and explicitly type it
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as CsvTrade[];

    const LOSS_PER_CONTRACT = 1.90;

    function parsePnl(pnlStr: string, qty: number): number {
      // Parse original PnL
      pnlStr = pnlStr.trim();
      let pnl = 0;

      if (pnlStr.startsWith("$(") && pnlStr.endsWith(")")) {
        pnl = -parseFloat(pnlStr.slice(2, -1));
      } else {
        pnl = parseFloat(pnlStr.replace("$", ""));
      }

      // Subtract per-contract fee
      pnl -= LOSS_PER_CONTRACT * qty;

      return pnl;
    }

    // Convert CSV rows to Prisma format
    const trades: Omit<Trade, "id">[] = records.map((r) => {
      return {
        symbol: r.symbol,
        priceFormat: parseInt(r._priceFormat, 10),
        priceFormatType: parseInt(r._priceFormatType, 10),
        tickSize: parseFloat(r._tickSize),
        buyFillId: r.buyFillId,
        sellFillId: r.sellFillId,
        qty: parseInt(r.qty, 10),
        buyPrice: parseFloat(r.buyPrice),
        sellPrice: parseFloat(r.sellPrice),
        pnl: parsePnl(r.pnl, parseInt(r.qty, 10)),
        boughtTimestamp: new Date(r.boughtTimestamp),
        soldTimestamp: new Date(r.soldTimestamp),
        duration: r.duration,
        createdAt: new Date(),
      };
    });

    await prisma.trade.createMany({ data: trades, skipDuplicates: true });

    return NextResponse.json({ success: true, count: trades.length });
  } catch (error) {
    console.error("Upload error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
