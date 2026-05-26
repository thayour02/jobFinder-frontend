import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  loading = false,
  className = '' 
}) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePageClick = (page) => {
    if (!loading && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={loading || currentPage === 1}
        className={`p-2 rounded-md border ${
          currentPage === 1 || loading
            ? 'border-gray-300 text-gray-300 cursor-not-allowed'
            : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
        }`}
      >
        <FiChevronLeft className="w-4 h-4" />
      </button>

      {/* First Page */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageClick(1)}
            disabled={loading}
            className={`px-3 py-1 rounded-md border ${
              currentPage === 1
                ? 'bg-purple-600 text-white border-purple-600'
                : 'border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600'
            }`}
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          disabled={loading}
          className={`px-3 py-1 rounded-md border ${
            currentPage === page
              ? 'bg-purple-600 text-white border-purple-600'
              : 'border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <button
            onClick={() => handlePageClick(totalPages)}
            disabled={loading}
            className={`px-3 py-1 rounded-md border ${
              currentPage === totalPages
                ? 'bg-purple-600 text-white border-purple-600'
                : 'border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={loading || currentPage === totalPages}
        className={`p-2 rounded-md border ${
          currentPage === totalPages || loading
            ? 'border-gray-300 text-gray-300 cursor-not-allowed'
            : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
        }`}
      >
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
