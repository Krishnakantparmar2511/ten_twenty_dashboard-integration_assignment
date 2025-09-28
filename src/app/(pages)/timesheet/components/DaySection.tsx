import type { DaySectionProps } from "@/app/(pages)/dashboard/interface/interface";
import { AddTaskButton } from "./AddTaskButton";
import { TaskItem } from "./TaskItem";

export const DaySection: React.FC<DaySectionProps> = ({ dayData, onAddTask, onEditTask, onDeleteTask }) => (
  <div className="mb-6 flex items-start justify-between">
    <h3 className="text-lg font-semibold text-gray-900 mb-4 py-3 pr-4">{dayData.date}</h3>
    <div className="flex-1 ml-4 ">
      {dayData.tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
      <AddTaskButton onAddTask={() => onAddTask(dayData.date)} />
    </div>
</div>
);