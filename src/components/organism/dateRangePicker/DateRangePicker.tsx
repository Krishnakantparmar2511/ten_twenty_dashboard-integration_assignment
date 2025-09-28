import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useOutsideClick } from './hooks/useOutSideClick';
import { useDateRangePicker } from './hooks/useDateRangePickerState';
import type { DateRangePickerProps } from './interface/interface';




export const DateRangePicker: React.FC<DateRangePickerProps> = ({ 
  onDateRangeChange, 
  initialStartDate = null, 
  initialEndDate = null,
  className = "",
  placeholder = "Date Range",
  disabled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    currentMonth,
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
  } = useDateRangePicker({
    onDateRangeChange,
    initialStartDate,
    initialEndDate,
    disabled
  });


  useOutsideClick(containerRef, () => setIsOpen(false), isOpen);

  const days = getDaysInMonth(currentMonth);

  return (
    <div ref={containerRef} className={`relative ${className}`}>

      <div className="relative inline-block min-w-fit">
        <input
          type="text"
          value={formatDateRange(placeholder)}
          onClick={handleInputClick}
          readOnly
          disabled={disabled}
          className={`
            px-4 py-3 pr-12 h-[42px] border border-gray-300 rounded-lg bg-white cursor-pointer 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            min-w-fit w-auto
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          placeholder={placeholder}
          style={{ width: formatDateRange(placeholder).length > 20 ? `${formatDateRange(placeholder).length * 0.7}em` : '22em' }}
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>


      {isOpen && !disabled && (
        <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-96">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded"
              type="button"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 rounded"
              type="button"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>


          <div className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day: string) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>


            <div className="grid grid-cols-7 gap-1">
              {days.map((date: Date | null, index: number) => {
                if (!date) {
                  return <div key={index} className="h-10"></div>;
                }

                const isStart: boolean = isRangeStart(date);
                const isEnd: boolean = isRangeEnd(date);
                const inRange: boolean = isInRange(date);
                const isToday: boolean = isSameDay(date, new Date());

                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => handleDateClick(date)}
                    type="button"
                    className={`
                      h-10 text-sm rounded-lg transition-colors relative
                      ${isStart || isEnd 
                        ? 'bg-blue-500 text-white font-semibold' 
                        : inRange 
                          ? 'bg-blue-100 text-blue-900' 
                          : 'hover:bg-gray-100'
                      }
                      ${isToday && !isStart && !isEnd && !inRange 
                        ? 'bg-gray-200 font-semibold' 
                        : ''
                      }
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>


          <div className="flex justify-end items-center p-4 border-t border-gray-200">
            <button
              onClick={clearSelection}
              type="button"
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};