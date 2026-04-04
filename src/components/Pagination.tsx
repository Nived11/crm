import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
  isLoading,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-6 mt-8 pb-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious || isLoading}
        className="p-2 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-brand/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex flex-col items-center">
        <span className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold mb-0.5">
          Page
        </span>
        <span className="text-sm font-black text-white tabular-nums">
          {currentPage} <span className="text-zinc-700 mx-1">of</span>{" "}
          {totalPages}
        </span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext || isLoading}
        className="p-2 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-brand/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
