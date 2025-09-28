import {  TimeSheetRepository } from "../../data/repository/timeSheetRepository";

export async function getTimeSheetByWeekUseCase(weekId:string) {
  return await TimeSheetRepository.getTimeSheetDetailsByWeekId(weekId);
}