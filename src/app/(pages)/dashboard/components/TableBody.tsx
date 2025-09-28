import React from "react";
import { ProjectDataItem } from "../interface/interface";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface TableBodyProps {
  data: ProjectDataItem[];
  formatDateRange: (startDate: string, endDate: string) => string;
  getStatusStyle: (status: string) => string;
  getAction: (status: string) => { text: string; color: string };
  getStatus: (hours:number) => 'completed' | 'incomplete' | 'missing';
}

export const TableBody: React.FC<TableBodyProps> = ({
  data,
  formatDateRange,
  getStatusStyle,
  getAction,
  getStatus
}) => {
  return (
    <div className="overflow-x-auto">
      <table  
        className="w-full  overflow-hidden" 
       
      >
        <thead className="h-[50px] w-full">
          <tr className="border-b border-gray-200 bg-[#F9FAFB]">
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center justify-between w-full">
                <span>Week #</span>
                <ChevronDown className="w-5 h-5 ml-2" />
              </div>
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center w-full">
                <span>Date</span>
                <ChevronDown className="w-5 h-5 ml-2" />
              </div>
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center w-full">
                <span>Status</span>
                <ChevronDown className="w-5 h-5 ml-2" />
              </div>
            </th>
            <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center justify-end w-full">
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => {
            const status = getStatus(item.hours);
            const action = getAction(status);
            return (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-3 py-4 w-[10%] bg-[#F9FAFB] whitespace-nowrap text-sm text-gray-900">
                  {item.week}
                </td>
                <td className="px-3 py-4 w-[40%] whitespace-nowrap text-sm text-gray-700">
                  {formatDateRange(item.startDate, item.endDate)}
                </td>
                <td className="px-3 w-[40%] py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                      status
                    )}`}
                  >
                    {status.toUpperCase()}
                  </span>
                </td>
                <td className="px-3 w-[10%] py-4 whitespace-nowrap text-right text-sm">
                  <Link href={`/timesheet?weekId=${item.week}`} className={`font-medium ${action.color}`}>
                    {action.text}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};