
import { type FC } from 'react';
import PostCard from '../PostCard';
import type { IPost } from '../../types/post';
import styles from './PostList.module.css';

interface IPostListProps {
  posts: IPost[];
  variant?: 'large' | 'medium' | 'small'; 
}

const PostList: FC<IPostListProps> = ({ posts, variant = 'medium' }) => {
  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} variant={variant} />
      ))}
    </div>
  );
};

export default PostList;