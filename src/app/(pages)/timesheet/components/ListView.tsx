"use client";
import React from "react";
import { TimesheetWeekViewProps } from "../../dashboard/interface/interface";
import { AddEntryModal } from "./TimeSheetEntryModel";
import { DaySection } from "./DaySection";
import { ProgressBar } from "@/components/atoms/progress/Progress";
import { useTimesheetWeekView } from "../hooks/useTimesheetWeekView";

const TimesheetWeekView: React.FC<TimesheetWeekViewProps> = ({
  timeSheetDataByWeekIdRes,
}) => {
  const {
    weekData,
    completionPercentage,
    isModalOpen,
    selectedDate,
    setIsModalOpen,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleModalSubmit,
  } = useTimesheetWeekView(timeSheetDataByWeekIdRes);

  return (
    <div className="mx-auto p-6 min-h-screen">
      <div className=" flex">
        <div className="flex justify-between   w-full mb-4">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              This week's timesheet
            </h1>
          </div>

          <ProgressBar
            percentage={completionPercentage}
            maxHours={weekData.maxHours}
            currentHours={weekData.totalHours}
          />
        </div>
      </div>

      <div className="text-gray-600 text-sm my-7">{weekData.weekRange}</div>

      <div className="space-y-8">
        {weekData.tasks.map((dayData) => (
          <DaySection
            key={dayData.id}
            dayData={dayData}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-gray-500">
          © 2024 tentwenty. All rights reserved.
        </p>
      </div>


      <AddEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default TimesheetWeekView;
