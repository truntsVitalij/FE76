import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Bookmark, MoreHorizontal } from 'lucide-react';
import styles from './PostCard.module.css';
import type { Post } from '../../pages/blog/types';

interface PostCardProps {
  post: Post;
  size: 's' | 'm' | 'l' | 'full';
  isFavorite?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
  onToggleFavorite?: (id: number) => void;
  onToggleLike?: (id: number) => void;
  onToggleDislike?: (id: number) => void;
}

export const PostCard: FC<PostCardProps> = ({
  post,
  size,
  isFavorite = false,
  isLiked = false,
  isDisliked = false,
  onToggleFavorite,
  onToggleLike,
  onToggleDislike
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLike?.(post.id);
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleDislike?.(post.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(post.id);
  };

  return (
    <article className={`${styles.card} ${styles[size]}`}>
      <div className={styles.wrapper}>
        {size === 'm' && (
          <img 
            src={post.image} 
            alt={post.title} 
            className={styles.image} 
            onClick={handleCardClick}
          />
        )}
        <div className={styles.textBlock} onClick={handleCardClick}>
          <div className={styles.meta}>{post.date}</div>
          <h3 className={styles.cardTitle}>{post.title}</h3>
          {post.description && (
            <p className={styles.description}>{post.description}</p>
          )}
        </div>
        {size !== 'm' && (
          <img 
            src={post.image} 
            alt={post.title} 
            className={styles.image} 
            onClick={handleCardClick}
          />
        )}
      </div>
      <div className={styles.actions}>
        <div className={styles.actionIcons}>
          <ThumbsUp 
            size={16} 
            onClick={handleLike}
            className={styles.iconBtn}
            fill={isLiked ? '#2563eb' : 'none'}
            color={isLiked ? '#2563eb' : '#6b7280'}
          />
          <ThumbsDown 
            size={16} 
            onClick={handleDislike}
            className={styles.iconBtn}
            fill={isDisliked ? '#dc2626' : 'none'}
            color={isDisliked ? '#dc2626' : '#6b7280'}
          />
        </div>
        <div className={styles.rightIcons}>
          <Bookmark 
            size={16} 
            onClick={handleBookmark}
            className={styles.iconBtn}
            fill={isFavorite ? '#1a237e' : 'none'}
            color={isFavorite ? '#1a237e' : '#9ca3af'}
          />
          <MoreHorizontal 
            size={16} 
            onClick={(e) => e.stopPropagation()}
            className={styles.iconBtn}
          />
        </div>
      </div>
    </article>
  );
};