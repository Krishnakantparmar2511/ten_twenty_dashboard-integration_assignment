import { fetchTimesheetByWeekId } from "../service/timeSheetService";
export const TimeSheetRepository = {
  async getTimeSheetDetailsByWeekId(weekId:string) {
    return await fetchTimesheetByWeekId(weekId);
  },
};
