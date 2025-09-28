import { useState } from "react";
import type { UseDateRangePickerProps, UseDateRangePickerReturn } from "../interface/interface";

// Custom hook for date range picker business logic
export const useDateRangePicker = ({
  onDateRangeChange,
  initialStartDate = null,
  initialEndDate = null,
  disabled = false
}: UseDateRangePickerProps): UseDateRangePickerReturn => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date): (Date | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];


    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const isInRange = (date: Date | null): boolean => {
    if (!startDate || !endDate || !date) return false;
    return date >= startDate && date <= endDate;
  };

  const isRangeStart = (date: Date | null): boolean => {
    return startDate ? isSameDay(date, startDate) : false;
  };

  const isRangeEnd = (date: Date | null): boolean => {
    return endDate ? isSameDay(date, endDate) : false;
  };

  const handleDateClick = (date: Date): void => {
    if (disabled) return;

    if (!startDate || (startDate && endDate)) {

      setStartDate(date);
      setEndDate(null);
      if (onDateRangeChange) {
        onDateRangeChange({ startDate: date, endDate: null });
      }
    } else if (startDate && !endDate) {
      let newStartDate: Date = startDate;
      let newEndDate: Date = date;
      
      if (date < startDate) {
        newStartDate = date;
        newEndDate = startDate;
      }
      
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      
      if (onDateRangeChange) {
        onDateRangeChange({ startDate: newStartDate, endDate: newEndDate });
      }
      

      setTimeout(() => setIsOpen(false), 100);
    }
  };

  const navigateMonth = (direction: number): void => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const formatDateRange = (placeholder: string): string => {
  const formatDate = (date: Date): string => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  if (!startDate && !endDate) return placeholder;
  if (startDate && !endDate) return `${formatDate(startDate)} - end date`;
  if (startDate && endDate) {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }
  return '';
};

  const clearSelection = (): void => {
    setStartDate(null);
    setEndDate(null);
    if (onDateRangeChange) {
      onDateRangeChange({ startDate: null, endDate: null });
    }
  };

  const handleInputClick = (): void => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return {
    currentMonth,
    startDate,
    endDate,
    isOpen,
    
    setIsOpen,
    handleDateClick,
    navigateMonth,
    clearSelection,
    handleInputClick,
    
    getDaysInMonth,
    isSameDay,
    isInRange,
    isRangeStart,
    isRangeEnd,
    formatDateRange,
    

    months,
    daysOfWeek,
  };
};