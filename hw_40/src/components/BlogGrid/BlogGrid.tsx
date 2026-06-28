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

  const bigPost = posts[0];
  const mediumPosts = posts.slice(3, 5);
  const smallPosts = posts.slice(1, 3).concat(posts.slice(5));

  return (
    <div className={styles.grid}>
      <div className={styles.bigBlock}>
        <PostCard post={bigPost} size="l" />
      </div>
      
      <div className={styles.mediumRow}>
        {mediumPosts.map(post => (
          <PostCard key={post.id} post={post} size="m" />
        ))}
      </div>
      
      <div className={styles.sideColumn}>
        {smallPosts.map(post => (
          <PostCard key={post.id} post={post} size="s" />
        ))}
      </div>
    </div>
  );
};