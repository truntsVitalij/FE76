import styles from './Pagination.module.css';

interface IPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ totalPages, currentPage, onPageChange }: IPaginationProps) => {
    const handlePreviousClick = () => {
        onPageChange(currentPage - 1)
    }

    const handleNextClick = () => {
        onPageChange(currentPage + 1)
    }

    return (
        <div className={styles.pagination}>
            {currentPage > 1 && <button onClick={handlePreviousClick}>Previous</button>}
            <span>{currentPage} of {totalPages}</span>
            {currentPage < totalPages && <button onClick={handleNextClick}>Next</button>}
        </div>
    )
}