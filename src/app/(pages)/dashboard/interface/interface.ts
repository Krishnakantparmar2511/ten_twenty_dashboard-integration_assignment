export interface Task {
  id: number;
  title: string;
  hours: number;
  project: string;
}

export interface DayData {
  id: number;
  date: string;
  tasks: Task[];
}

export interface WeekData {
  weekId: number;
  weekRange: string;
  totalHours: number;
  maxHours: number;
  tasks: DayData[];
}

export interface TimesheetData {
  [key: number]: WeekData;
}

export interface FormData {
  project: string;
  workType: string;
  taskDescription: string;
  hours: number;
}

export interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  onSubmit: (data: FormData & { date: string }) => void;
}

export interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export interface AddTaskButtonProps {
  onAddTask: () => void;
}

export interface DaySectionProps {
  dayData: DayData;
  onAddTask: (date: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

export interface TimesheetWeekViewProps {
  timeSheetDataByWeekIdRes: WeekData;
  weekId?: number;
}

export interface ProjectDataItem {
  id: number;
  week: number;
  startDate: string;
  endDate: string;
  hours: number;
  title: string;
  project: string;
}

export interface TableViewDashboardProps {
  data: ProjectDataItem[];
}
export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
  getPageNumbers: () => (number | string)[];
}
