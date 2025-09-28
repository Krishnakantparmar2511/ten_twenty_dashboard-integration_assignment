import { useState } from "react";
import { TaskItemProps } from "../../dashboard/interface/interface";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-[10px] px-3 mb-[10px] border rounded-lg border-gray-100 last:border-b-0">
      <div className="flex-1 mb-2 sm:mb-0">
        <div className="text-gray-900 font-medium">{task.title}</div>
      </div>


      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:space-x-3 justify-between sm:justify-end w-full sm:w-auto">
        <span className="text-sm text-gray-500">{task.hours} hrs</span>
        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
          {task.project}
        </span>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 w-32">
              <button
                onClick={() => {
                  onEdit(task);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center space-x-2"
              >
                <Edit className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 text-red-600 flex items-center space-x-2"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
