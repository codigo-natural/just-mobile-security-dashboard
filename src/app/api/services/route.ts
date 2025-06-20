import { NextResponse } from "next/server";
import { getAllData } from "@/lib/data-loader";

export async function GET() {
  try {
    const data = await getAllData();
    return NextResponse.json(data.services);
  } catch (error) {
    console.error("API Error (services):", error);
    return NextResponse.json({ message: 'Error fetching services ' }, { status: 500 });
  }
}