export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangePickerProps {
  onDateRangeChange?: (dateRange: DateRange) => void;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface UseDateRangePickerProps {
  onDateRangeChange?: (dateRange: DateRange) => void;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  disabled?: boolean;
}

export interface UseDateRangePickerReturn {
  // State
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  isOpen: boolean;
  
  // Actions
  setIsOpen: (open: boolean) => void;
  handleDateClick: (date: Date) => void;
  navigateMonth: (direction: number) => void;
  clearSelection: () => void;
  handleInputClick: () => void;
  
  // Helpers
  getDaysInMonth: (date: Date) => (Date | null)[];
  isSameDay: (date1: Date | null, date2: Date | null) => boolean;
  isInRange: (date: Date | null) => boolean;
  isRangeStart: (date: Date | null) => boolean;
  isRangeEnd: (date: Date | null) => boolean;
  formatDateRange: (placeholder: string) => string;
  
  // Constants
  months: string[];
  daysOfWeek: string[];
}
