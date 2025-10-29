import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Trade } from "@prisma/client";
import { parse } from "csv-parse/sync";

const prisma = new PrismaClient();

type CsvTrade = {
  Symbol: string;
  Side: string;
  Type: string;
  Qty: string;
  "Limit Price"?: string;
  "Stop Price"?: string;
  "Take Profit"?: string;
  "Stop Loss"?: string;
  "Avg Fill Price"?: string;
  Status: string;
  "Update Time": string;
  "Order ID": string;
  Expiry?: string;
  "Expiry Time"?: string;
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

    // Convert CSV rows to Prisma format
    const trades: Omit<Trade, "id">[] = records.map((r) => ({
      symbol: r.Symbol,
      side: r.Side,
      type: r.Type,
      qty: parseInt(r.Qty, 10) || 0,
      limitPrice: r["Limit Price"] ? parseFloat(r["Limit Price"]) : null,
      stopPrice: r["Stop Price"] ? parseFloat(r["Stop Price"]) : null,
      takeProfit: r["Take Profit"] ? parseFloat(r["Take Profit"]) : null,
      stopLoss: r["Stop Loss"] ? parseFloat(r["Stop Loss"]) : null,
      avgFillPrice: r["Avg Fill Price"]
        ? parseFloat(r["Avg Fill Price"])
        : null,
      status: r.Status,
      updateTime: new Date(r["Update Time"]),
      orderId: r["Order ID"],
      expiry: r.Expiry || null,
      expiryTime: r["Expiry Time"] || null,
      createdAt: new Date(),
    }));

    await prisma.trade.createMany({ data: trades, skipDuplicates: true });

    return NextResponse.json({ success: true, count: trades.length });
  } catch (error) {
    console.error("Upload error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
