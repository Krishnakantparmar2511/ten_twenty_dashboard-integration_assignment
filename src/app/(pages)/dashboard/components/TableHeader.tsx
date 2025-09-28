
import { DateRangePicker } from '@/components/organism/dateRangePicker/DateRangePicker';
import type { DateRange } from '@/components/organism/dateRangePicker/interface/interface';
import { ChevronDown } from 'lucide-react';

interface TableHeaderProps {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onDateRangeChange: (range: DateRange) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  statusFilter,
  onStatusFilterChange,
  onDateRangeChange
}) => {
  return (
    <div className="p-6   ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Your Timesheets</h1>
      </div>
      
      <div className="flex gap-4">
        <DateRangePicker onDateRangeChange={onDateRangeChange} />
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Status</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
            <option value="missing">Missing</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
