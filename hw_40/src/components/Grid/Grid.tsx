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

  const renderPostCard = (post: Post, size: 's' | 'm' | 'l') => (
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

  const firstRowPosts = posts.slice(0, 3);
  const secondRowPosts = posts.slice(3, 7);

  return (
    <div className={styles.container}>
      {firstRowPosts.length > 0 && (
        <div className={styles.firstRow}>
          <div className={styles.largeColumn}>
            {firstRowPosts[0] && renderPostCard(firstRowPosts[0], 'l')}
          </div>
          <div className={styles.smallColumn}>
            {firstRowPosts[1] && renderPostCard(firstRowPosts[1], 's')}
            {firstRowPosts[2] && renderPostCard(firstRowPosts[2], 's')}
          </div>
        </div>
      )}

      {secondRowPosts.length > 0 && (
        <div className={styles.secondRow}>
          <div className={styles.mediumColumn}>
            {secondRowPosts[0] && renderPostCard(secondRowPosts[0], 'm')}
          </div>
          <div className={styles.mediumColumn}>
            {secondRowPosts[1] && renderPostCard(secondRowPosts[1], 'm')}
          </div>
          <div className={styles.smallColumn}>
            {secondRowPosts[2] && renderPostCard(secondRowPosts[2], 's')}
            {secondRowPosts[3] ? (
              renderPostCard(secondRowPosts[3], 's')
            ) : (
              <div className={styles.emptySlot} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};