import { Plus } from "lucide-react";
import { AddTaskButtonProps } from "@/app/(pages)/dashboard/interface/interface";

export const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onAddTask }) => (
  <button
    onClick={onAddTask}
    className="w-full py-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
  >
    <Plus className="w-4 h-4" />
    <span className="text-sm font-medium">Add new task</span>
  </button>
);
