"use client";
import React from "react";
import { useTableData } from "../hooks/useTableData";
import { usePagination } from "../hooks/usePagination";
import { useTableHelpers } from "../hooks/useTableHelpers";
import { TablePagination } from "./TablePagination";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { ProjectDataItem, TableViewDashboardProps } from "../interface/interface";

export const TableViewDashboard = ({data}:TableViewDashboardProps) => {

  const {
    currentPage,
    itemsPerPage,
    statusFilter,
    currentData,
    totalPages,
    startIndex,
    endIndex,
    filteredData,

    setCurrentPage,
    handleItemsPerPageChange,
    handleStatusFilterChange,
    handleDateRangeChange,
  } = useTableData({data:data});

  const { getPageNumbers } = usePagination(currentPage, totalPages);
  const { formatDateRange, getStatusStyle, getAction,getStatus } = useTableHelpers();

  return (
    <div className="  ">
      <TableHeader
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        onDateRangeChange={handleDateRangeChange}
      />

      <div className=" p-6">
        <div
          className="rounded-lg"
          style={{
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <TableBody
            data={currentData as ProjectDataItem[]}
            formatDateRange={formatDateRange}
            getStatusStyle={getStatusStyle}
            getAction={getAction}
            getStatus={getStatus}
          />
        </div>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={filteredData.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        getPageNumbers={getPageNumbers}
      />
    </div>
  );
};