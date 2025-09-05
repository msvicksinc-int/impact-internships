import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// Define TypeScript type for receipts
type Receipt = {
  employerId: string;
  amount: number;
  transactionId: string;
};

// POST a new receipt
export async function POST(req: Request) {
  const body = await req.json();
  const { employerId, amount, transactionId } = body as Receipt;

  const { data, error } = await supabase
    .from("receipts")
    .insert([{ employerId, amount, transactionId }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ receipt: data }, { status: 201 });
}

// GET all receipts and total raised
export async function GET(req: Request) {
  const { data, error } = await supabase
    .from("receipts")
    .select("amount");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const totalRaised = (data as { amount: number }[]).reduce(
    (sum: number, r) => sum + r.amount,
    0
  );

  return NextResponse.json({ totalRaised, receipts: data }, { status: 200 });
}
