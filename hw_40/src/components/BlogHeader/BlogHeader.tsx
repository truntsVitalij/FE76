import { type FC } from 'react';
import styles from './BlogHeader.module.css';

interface BlogHeaderProps {
  count: number;
}

export const BlogHeader: FC<BlogHeaderProps> = ({ count }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Blog</h1>
      <span className={styles.count}>Показано: {count} постов</span>
    </div>
  );
};