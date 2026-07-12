import { type FC } from 'react';
import { PostCard } from '../../PostCard/PostCard';
import styles from './BigBlock.module.css';
import type { Post } from '../../../pages/blog/types';

interface BigBlockProps {
  post: Post;
}

export const BigBlock: FC<BigBlockProps> = ({ post }) => {
  return (
    <div className={styles.bigBlock}>
      <PostCard post={post} size="l" />
    </div>
  );
};