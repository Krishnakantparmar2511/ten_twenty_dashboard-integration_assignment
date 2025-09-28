import { DashboardRepository } from "../../data/repository/dashboardRepository";

export async function getAllDashboardDataUseCase() {
  return await DashboardRepository.getDashboardDataRepository();
}