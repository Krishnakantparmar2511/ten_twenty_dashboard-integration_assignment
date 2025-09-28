import { API_BASE_URL } from "@/config/appConfig";

// services/timesheetService.ts
export async function fetchTimesheetByWeekId(weekId: string) {
  const res = await fetch(`${API_BASE_URL}/api/timesheet?weekId=${weekId}`);
  if (!res.ok) throw new Error("Failed to fetch timesheet data");
  return res.json();
}
