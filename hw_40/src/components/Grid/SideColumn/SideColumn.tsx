import { type FC } from 'react';
import { PostCard } from '../../PostCard/PostCard';
import styles from './SideColumn.module.css';
import type { Post } from '../../../pages/blog/types';

interface SideColumnProps {
  posts: Post[];
}

export const SideColumn: FC<SideColumnProps> = ({ posts }) => {
  return (
    <div className={styles.sideColumn}>
      {posts.map(post => (
        <PostCard key={post.id} post={post} size="s" />
      ))}
    </div>
  );
};