"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Minus, Plus, X } from "lucide-react";
import {
  addEntrySchema,
  type AddEntryFormInput,
  type AddEntryFormData,
} from "../utils/validation/AddNewEntrySchema";
import { AddEntryModalProps } from "../../dashboard/interface/interface";
import { projects, workTypes } from "../utils/mockData";

export const AddEntryModal: React.FC<AddEntryModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<AddEntryFormInput, any, AddEntryFormData>({
    resolver: zodResolver(addEntrySchema),
    defaultValues: {
      project: "",
      workType: "",
      taskDescription: "",
      hours: "1",
    },
  });

  const hoursStr = watch("hours");
  const hoursNum = Number(hoursStr || "0");

  const clamp = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, n));

  const adjustHours = (increment: number) => {
    const next = clamp(
      Number.isNaN(hoursNum) ? 0 : hoursNum + increment,
      0,
      24
    );
    setValue("hours", String(next), { shouldValidate: true, shouldDirty: true });
  };

  const handleFormSubmit = (data: AddEntryFormData) => {
    onSubmit({ ...data, date: selectedDate });
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-[646px] mx-4 my-8 p-6 shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add New Entry</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Project <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                {...register("project")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="">Project Name</option>
                {projects.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {errors.project && (
              <p className="text-sm text-red-600 mt-1">
                {errors.project.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Work <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                {...register("workType")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="">Select type</option>
                {workTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {errors.workType && (
              <p className="text-sm text-red-600 mt-1">
                {errors.workType.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("taskDescription")}
              placeholder="Write text here ..."
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {errors.taskDescription && (
              <p className="text-sm text-red-600 mt-1">
                {errors.taskDescription.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hours <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => adjustHours(-1)}
                className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                {...register("hours")}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={0}
                max={24}
              />
              <button
                type="button"
                onClick={() => adjustHours(1)}
                className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {errors.hours && (
              <p className="text-sm text-red-600 mt-1">{errors.hours.message}</p>
            )}
          </div>

          <div className="flex space-x-3 mt-8">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Add entry
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
