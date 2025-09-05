import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// POST a new receipt after payment
export async function POST(req: Request) {
  const body = await req.json();
  const { employerId, amount, transactionId } = body;

  const { data, error } = await supabase
    .from("receipts")
    .insert([{ employerId, amount, transactionId }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ receipt: data }, { status: 201 });
}

// GET all receipts
export async function GET(req:Request) {
  const { data, error } = await supabase.from("receipts").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ receipts: data }, { status: 200 });
}
