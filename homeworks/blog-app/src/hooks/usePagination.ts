import { useState, useMemo } from 'react';

export const usePagination = <T>(items: T[], itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));


  const validatedPage = Math.min(currentPage, totalPages);

  const currentItems = useMemo(() => {
    const startIndex = (validatedPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, validatedPage, itemsPerPage]);

  const goToPage = (page: number) => {
    const newPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(newPage);
  };

  return {
    currentPage: validatedPage,
    totalPages,
    currentItems,
    goToPage,
  };
};
