import { fetchDashboardDataService } from "../service/dashboardDataService";
export const DashboardRepository = {
  async getDashboardDataRepository() {
    return await fetchDashboardDataService();
  },
};
