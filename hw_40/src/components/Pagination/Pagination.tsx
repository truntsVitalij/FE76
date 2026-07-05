import { type FC } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

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

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

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
              onClick={() => handlePageClick(page)}
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