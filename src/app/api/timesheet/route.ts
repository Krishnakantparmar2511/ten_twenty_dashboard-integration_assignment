import { NextRequest, NextResponse } from "next/server";
import { mockTimesheetData } from "./listMockData";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const weekId = searchParams.get("weekId");

  if (!weekId) {
    return NextResponse.json(
      { error: "Missing weekId parameter" },
      { status: 400 }
    );
  }

  const data = mockTimesheetData[Number(weekId)];

  if (!data) {
    return NextResponse.json(
      { error: `No timesheet data found for weekId ${weekId}` },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
