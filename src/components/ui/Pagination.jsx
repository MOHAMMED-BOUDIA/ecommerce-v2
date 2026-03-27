import React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';
import { clsx } from 'clsx';

/**
 * Premium Pagination Component
 */
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = "" 
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;
    
    if (totalPages <= showMax) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + showMax - 1);
      
      if (end === totalPages) start = Math.max(1, end - showMax + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <div className={clsx("flex items-center justify-center gap-4", className)}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-950 transition-premium hover:bg-emerald-500 hover:border-emerald-500 disabled:opacity-30 disabled:pointer-events-none shadow-sm"
      >
        <HiOutlineChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-3xl border border-slate-100">
        {getPageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={clsx(
              "w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-premium",
              currentPage === number 
                ? "bg-slate-950 text-white shadow-lg shadow-slate-900/20" 
                : "text-slate-400 hover:text-slate-950 hover:bg-white"
            )}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-950 transition-premium hover:bg-emerald-500 hover:border-emerald-500 disabled:opacity-30 disabled:pointer-events-none shadow-sm"
      >
        <HiOutlineChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
