import { type FC } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const getPageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  const pages: (number | string)[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  if (currentPage > 3) {
    pages.push('...');
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push('...');
  }

  pages.push(totalPages);

  return pages;
};

export const Pagination: FC<PaginationProps> = ({ 
  totalPages, 
  currentPage, 
  onPageChange 
}) => {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <button 
        className={styles.navBtn}
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      >
        <ArrowLeft size={14} /> Prev
      </button>

      <div className={styles.paginationNumbers}>
        {pageNumbers.map((page, index) => (
          typeof page === 'number' ? (
            <span
              key={index}
              className={currentPage === page ? styles.active : ''}
              onClick={() => onPageChange(page)}
            >
              {page}
            </span>
          ) : (
            <span key={index}>{page}</span>
          )
        ))}
      </div>

      <button 
        className={styles.navBtn}
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next <ArrowRight size={14} />
      </button>
    </div>
  );
};