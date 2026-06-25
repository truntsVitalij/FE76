import { type FC } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './BlogPagination.module.css';

export const BlogPagination: FC = () => {
  return (
    <div className={styles.pagination}>
      <button className={styles.navBtn}>
        <ArrowLeft size={14} /> Prev
      </button>
      <div className={styles.paginationNumbers}>
        <span className={styles.active}>1</span>
        <span>2</span>
        <span>3</span>
        <span>...</span>
        <span>8</span>
      </div>
      <button className={styles.navBtn}>
        Next <ArrowRight size={14} />
      </button>
    </div>
  );
};