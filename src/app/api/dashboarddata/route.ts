import { NextResponse } from "next/server";
import { projectData } from "./mockData";
export async function GET() {
  return NextResponse.json(projectData);
}