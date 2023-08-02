import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({ currentPage, totalPages, onPageChange, darkMode = false }) {
    const previousPage = () => onPageChange(Math.max(0, currentPage - 1));
    const nextPage = () => onPageChange(Math.min(totalPages - 1, currentPage + 1));
  
    return (
      <nav className={`isolate inline-flex -space-x-px rounded-md shadow-sm ${darkMode ? "bg-neutral-800" :"bg-neutral-100/50"}`} aria-label="Pagination">
        <button onClick={previousPage} disabled={currentPage === 0} className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${darkMode ? "text-neutral-200 hover:bg-neutral-800 focus-dark":"text-neutral-400 hover:bg-neutral-300 focus-light border-neutral-300"} disabled:hover:bg-inherit disabled:cursor-not-allowed focus:z-20 `}>
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <p className={`px-4 py-2 text-sm font-semibold border-y  ${darkMode ? "border-neutral-700" :"border-neutral-300"}`}>Page {currentPage + 1} de {totalPages}</p>
        <button onClick={nextPage} disabled={currentPage === totalPages - 1} className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${darkMode ? "text-neutral-200 hover:bg-neutral-800 focus-dark":"text-neutral-400 hover:bg-neutral-300 focus-light border-neutral-300"} disabled:hover:bg-inherit disabled:cursor-not-allowed focus:z-20`}>
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    );
  }
  