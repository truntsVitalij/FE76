import { type FC } from 'react';
import { PostCard } from '../../PostCard/PostCard';
import styles from './MediumRow.module.css';
import type { Post } from '../../../pages/blog/types';

interface MediumRowProps {
  posts: Post[];
}

export const MediumRow: FC<MediumRowProps> = ({ posts }) => {
  return (
    <div className={styles.mediumRow}>
      {posts.map(post => (
        <PostCard key={post.id} post={post} size="m" />
      ))}
    </div>
  );
};