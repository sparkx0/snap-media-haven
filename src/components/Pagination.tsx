
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || isLoading) return;
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to show
  const generatePageNumbers = () => {
    const pages = [];
    
    // Always show the first page
    pages.push(1);
    
    // Calculate visible page range
    let rangeStart = Math.max(2, currentPage - 1);
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    // Ensure we show 3 pages when possible
    if (rangeEnd - rangeStart < 2) {
      if (currentPage < totalPages / 2) {
        rangeEnd = Math.min(totalPages - 1, rangeStart + 2);
      } else {
        rangeStart = Math.max(2, rangeEnd - 2);
      }
    }
    
    // Add ellipsis before range if needed
    if (rangeStart > 2) {
      pages.push('ellipsis-start');
    }
    
    // Add range pages
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis after range if needed
    if (rangeEnd < totalPages - 1) {
      pages.push('ellipsis-end');
    }
    
    // Always show the last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-4 py-4 sm:px-6 border-t">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
      </div>
      
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        {/* First page */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1 || isLoading}
          className={cn(
            "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0",
            (currentPage === 1 || isLoading) 
              ? "cursor-not-allowed bg-gray-50" 
              : "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          )}
          aria-label="Go to first page"
        >
          <ChevronsLeft size={16} />
        </button>
        
        {/* Previous page */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className={cn(
            "relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0",
            (currentPage === 1 || isLoading) 
              ? "cursor-not-allowed bg-gray-50" 
              : "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          )}
          aria-label="Go to previous page"
        >
          <ChevronLeft size={16} />
        </button>
        
        {/* Page numbers */}
        {generatePageNumbers().map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
              >
                ...
              </span>
            );
          }
          
          return (
            <button
              key={index}
              onClick={() => handlePageChange(page as number)}
              disabled={isLoading}
              className={cn(
                "relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20",
                currentPage === page
                  ? "z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              )}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
        
        {/* Next page */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className={cn(
            "relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0",
            (currentPage === totalPages || isLoading)
              ? "cursor-not-allowed bg-gray-50"
              : "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          )}
          aria-label="Go to next page"
        >
          <ChevronRight size={16} />
        </button>
        
        {/* Last page */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages || isLoading}
          className={cn(
            "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0",
            (currentPage === totalPages || isLoading)
              ? "cursor-not-allowed bg-gray-50"
              : "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          )}
          aria-label="Go to last page"
        >
          <ChevronsRight size={16} />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
