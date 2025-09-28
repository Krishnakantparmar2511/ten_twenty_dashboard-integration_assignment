import { API_BASE_URL } from "@/config/appConfig";

export async function fetchDashboardDataService() {
  const res = await fetch(`${API_BASE_URL}/api/dashboarddata`, {
    cache: "no-store", // optional: avoid Next.js caching issues
  });
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }
  return res.json();
}