import { type FC } from 'react';
import { PostCard } from '../../../../components/PostCard';
import styles from './PostList.module.css';
import type { Post } from '../../../../pages/blog/types';

interface PostListProps {
  posts: Post[];
  size: 's' | 'm' | 'l';
  className?: string;
}

export const PostList: FC<PostListProps> = ({ posts, size, className }) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className={className || styles.list}>
      {posts.map(post => (
        <PostCard key={post.id} post={post} size={size} />
      ))}
    </div>
  );
};