"use client";

import { useState } from "react";
import { FormData, Task, WeekData } from "@/app/(pages)/dashboard/interface/interface";

export function useTimesheetWeekView(initialData: WeekData) {
  const [weekData, setWeekData] = useState<WeekData>(initialData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const completionPercentage: number = Math.round(
    (weekData.totalHours / weekData.maxHours) * 100
  );

  const handleAddTask = (date: string): void => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task): void => {

  };

  const handleDeleteTask = (taskId: number): void => {
  };

  const handleModalSubmit = (data: FormData & { date: string }): void => {
  };

  return {
    weekData,
    completionPercentage,
    isModalOpen,
    selectedDate,
    setIsModalOpen,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleModalSubmit,
  };
}
