import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// POST new job
export async function POST(req: Request) {
  const body = await req.json();
  const { title, company, description } = body;

  const { data, error } = await supabase
    .from("Jobs") // 👈 Capital J
    .insert([{ title, company, description }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ job: data }, { status: 201 });
}

// GET all jobs
export async function GET() {
  const { data, error } = await supabase
    .from("Jobs") // 👈 Capital J
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ jobs: data }, { status: 200 });
}
