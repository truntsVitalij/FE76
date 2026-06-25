import { type FC } from 'react';
import { PostCard } from '../PostCard';
import styles from './BlogGrid.module.css';
import type { Post } from '../../pages/blog/types';

interface BlogGridProps {
  posts: Post[];
}

export const BlogGrid: FC<BlogGridProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        Нет постов для отображения
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};