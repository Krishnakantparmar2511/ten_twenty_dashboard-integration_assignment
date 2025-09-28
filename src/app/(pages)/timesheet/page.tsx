import { getTimeSheetByWeekUseCase } from "@/modules/timesheet/domain/usecase/getTimeSheetByWeekUseCase";
import TimesheetWeekView from "./components/ListView";
import { Suspense } from "react";
import { Spinner } from "@/components/atoms/spinner/Spinner";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ weekId?: string }>;
}) {
  const { weekId } = await searchParams;

  const timeSheetDataByWeekIdRes = await getTimeSheetByWeekUseCase(weekId!);
  return (
    <div className=" max-w-7xl shadow-md mx-auto p-6 bg-white  rounded-lg">
      <Suspense fallback={<Spinner />}>
        <TimesheetWeekView
          weekId={Number(weekId)}
          timeSheetDataByWeekIdRes={timeSheetDataByWeekIdRes}
        />
      </Suspense>
    </div>
  );
}
