import { type FC } from 'react';
import { Input } from '../../components/Input/Input';
import styles from './BlogHeader.module.css';

interface BlogHeaderProps {
  count: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const BlogHeader: FC<BlogHeaderProps> = ({ count, searchQuery, onSearchChange }) => {
  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <h1 className={styles.title}>Blog</h1>
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
          noWrapper
        />
      </div>
      <span className={styles.count}>Показано: {count} постов</span>
    </div>
  );
};