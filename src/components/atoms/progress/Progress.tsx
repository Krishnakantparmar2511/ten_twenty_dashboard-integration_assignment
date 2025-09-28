import React from "react";

interface ProgressBarProps {
  percentage: number;
  currentHours: number;
  maxHours: number;
  width?: number; // pixel width
  height?: string;
  backgroundColor?: string;
  fillColor?: string;
  className?: string;
  showAnimation?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  currentHours,
  maxHours,
  width = 188,
  height = "h-2",
  backgroundColor = "#E5E7EB",
  fillColor = "#FF8A4C",
  className = "",
  showAnimation = true,
}) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: `${width}px` }}
    >

      <div className="flex justify-between items-center mb-2">
        <div
          className="relative bg-white shadow-md rounded-md px-3 py-1 text-sm font-semibold text-gray-900 whitespace-nowrap"
          style={{
            transform: `translateX(${clampedPercentage}%) translateX(-50%)`,
          }}
        >
          {currentHours}/{maxHours} hrs
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-white"></div>
        </div>

        <span className="text-sm text-gray-500 font-medium">
          {clampedPercentage}%
        </span>
      </div>


      <div
        className={`relative ${height} rounded-full`}
        style={{ backgroundColor }}
      >
        <div
          className={`${height} rounded-full ${
            showAnimation ? "transition-all duration-300" : ""
          }`}
          style={{
            width: `${clampedPercentage}%`,
            backgroundColor: fillColor,
          }}
        />
      </div>
    </div>
  );
};
