
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { TablePaginationProps } from '../interface/interface';


export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  getPageNumbers
}) => {
  return (
    <div className="px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
        
      </div>

      <div className="flex  border rounded-xl">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-l-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {getPageNumbers().map((page, idx) => (
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-3 border-l py-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => {
                if (typeof page === 'number') onPageChange(page);
              }}
              className={`px-3 py-2 text-sm  border-l  ${
                currentPage === page
                  ? 'text-blue-600 '
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )
        ))}
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm border-l text-gray-700 hover:bg-gray-100 rounded-r-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};
