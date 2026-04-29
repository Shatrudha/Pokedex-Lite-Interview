type PaginationProps = {
  page: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
};

export function Pagination({
  page,
  canGoNext,
  canGoPrevious,
  onNext,
  onPrevious,
}: PaginationProps) {
  return (
    <div className="pagination">
      <button disabled={!canGoPrevious} onClick={onPrevious}>
        Previous
      </button>

      <span>Page {page}</span>

      <button disabled={!canGoNext} onClick={onNext}>
        Next
      </button>
    </div>
  );
}