import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD", {
      cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json({
      rates: data.rates,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch exchange rates" },
      { status: 500 },
    );
  }
}
