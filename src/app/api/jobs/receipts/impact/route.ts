import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET transparency data (total money raised)
export async function GET(req: Request) {
  const { data, error } = await supabase
    .from("receipts")
    .select("amount");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Sum all amounts to show scholarships fund
  const totalRaised = data.reduce((sum, r) => sum + r.amount, 0);

  return NextResponse.json({ totalRaised }, { status: 200 });
}
