import { useState, useMemo } from 'react';
import type { DateRange } from "@/components/organism/dateRangePicker/interface/interface";
import { ProjectDataItem, TableViewDashboardProps } from '../interface/interface';

export const useTableData = ({data}:TableViewDashboardProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });


  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const typedItem = item as ProjectDataItem;
      
      if (statusFilter !== "all") {
  let computedStatus: "completed" | "incomplete" | "missing";

  if (typedItem.hours === 40) {
    computedStatus = "completed";
  } else if (typedItem.hours === 0) {
    computedStatus = "missing";
  } else {
    computedStatus = "incomplete";
  }

  if (computedStatus !== statusFilter) return false;
}
      

      if (dateRange.startDate && dateRange.endDate) {
        const itemStartDate = new Date(typedItem.startDate);
        const itemEndDate = new Date(typedItem.endDate);
        const filterStartDate = new Date(dateRange.startDate );
        const filterEndDate = new Date(dateRange.endDate);
        
        itemStartDate.setHours(0, 0, 0, 0);
        itemEndDate.setHours(23, 59, 59, 999);
        filterStartDate.setHours(0, 0, 0, 0);
        filterEndDate.setHours(23, 59, 59, 999);
        
        const hasOverlap = itemStartDate <= filterEndDate && itemEndDate >= filterStartDate;
        
        if (!hasOverlap) return false;
      }
      
      return true;
    });
  }, [statusFilter, dateRange]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

 


  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (range: DateRange) => {
    console.log("Selected date range:", range);
    setDateRange(range);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setStatusFilter('all');
    setDateRange({ startDate: null, endDate: null });
    setCurrentPage(1);
  };

  return {
    currentPage,
    itemsPerPage,
    statusFilter,
    dateRange,
    

    filteredData,
    currentData,
    totalPages,
    startIndex,
    endIndex,
    
    setCurrentPage,
    handleItemsPerPageChange,
    handleStatusFilterChange,
    handleDateRangeChange,
    clearAllFilters
  };
};