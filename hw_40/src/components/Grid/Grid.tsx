import { type FC } from 'react';
import { PostCard } from '../PostCard';
import styles from './Grid.module.css';
import type { Post } from '../../pages/blog/types';

interface GridProps {
  posts: Post[];
  favoriteIds: number[];
  likedIds: number[];
  dislikedIds: number[];
  onToggleFavorite: (postId: number) => void;
  onToggleLike: (postId: number) => void;
  onToggleDislike: (postId: number) => void;
}

export const Grid: FC<GridProps> = ({ 
  posts, 
  favoriteIds, 
  likedIds, 
  dislikedIds,
  onToggleFavorite,
  onToggleLike,
  onToggleDislike 
}) => {
  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        Нет постов для отображения
      </div>
    );
  }

  const renderPostCard = (post: Post, size: 'l' | 'm' | 's') => (
    <PostCard 
      key={post.id}
      post={post} 
      size={size}
      isFavorite={favoriteIds.includes(post.id)}
      isLiked={likedIds.includes(post.id)}
      isDisliked={dislikedIds.includes(post.id)}
      onToggleFavorite={onToggleFavorite}
      onToggleLike={onToggleLike}
      onToggleDislike={onToggleDislike}
    />
  );

  if (posts.length === 1) {
    return (
      <div className={styles.grid}>
        <div className={styles.bigBlock}>
          {renderPostCard(posts[0], 'l')}
        </div>
      </div>
    );
  }

  if (posts.length <= 3) {
    return (
      <div className={styles.grid}>
        <div className={styles.bigBlock}>
          {renderPostCard(posts[0], 'l')}
        </div>
        <div className={styles.sideColumn}>
          {posts.slice(1).map(post => renderPostCard(post, 's'))}
        </div>
      </div>
    );
  }

  const bigPost = posts[0];
  const mediumPosts = posts.slice(3, 5).filter(Boolean);
  const smallPosts = posts.slice(1, 3).concat(posts.slice(5)).filter(Boolean);

  return (
    <div className={styles.grid}>
      <div className={styles.bigBlock}>
        {bigPost && renderPostCard(bigPost, 'l')}
      </div>
      
      <div className={styles.mediumRow}>
        {mediumPosts.map(post => post && renderPostCard(post, 'm'))}
      </div>
      
      <div className={styles.sideColumn}>
        {smallPosts.map(post => post && renderPostCard(post, 's'))}
      </div>
    </div>
  );
};