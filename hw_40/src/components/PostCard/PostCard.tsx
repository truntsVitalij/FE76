import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Bookmark, MoreHorizontal } from 'lucide-react';
import styles from './PostCard.module.css';
import type { Post } from '../../pages/blog/types';

interface PostCardProps {
  post: Post;
  size?: 'l' | 'm' | 's';
  isFavorite: boolean;
  isLiked: boolean;
  isDisliked: boolean;
  onToggleFavorite: (postId: number) => void;
  onToggleLike: (postId: number) => void;
  onToggleDislike: (postId: number) => void;
}

export const PostCard: FC<PostCardProps> = ({ 
  post, 
  size = 'm', 
  isFavorite,
  isLiked,
  isDisliked,
  onToggleFavorite,
  onToggleLike,
  onToggleDislike 
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  const handleActionClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    
    switch (action) {
      case 'like':
        onToggleLike(post.id);
        break;
      case 'dislike':
        onToggleDislike(post.id);
        break;
      case 'bookmark':
        onToggleFavorite(post.id);
        break;
    }
  };

  return (
    <article className={`${styles.card} ${styles[size]}`}>
      <div className={styles.wrapper}>
        <div className={styles.textBlock} onClick={handleCardClick}>
          <div className={styles.meta}>{post.date}</div>
          <h3 className={styles.cardTitle}>{post.title}</h3>
          {post.description && (
            <p className={styles.description}>{post.description}</p>
          )}
        </div>
        <img 
          src={post.image} 
          alt="Blog post" 
          className={styles.image} 
          onClick={handleCardClick}
        />
      </div>
      <div className={styles.actions}>
        <div className={styles.actionIcons}>
          <ThumbsUp 
            size={16} 
            onClick={(e) => handleActionClick(e, 'like')}
            className={`${styles.iconBtn} ${isLiked ? styles.likeActive : ''}`}
            fill={isLiked ? '#2563eb' : 'none'}
            color={isLiked ? '#2563eb' : '#6b7280'}
          />
          <ThumbsDown 
            size={16} 
            onClick={(e) => handleActionClick(e, 'dislike')}
            className={`${styles.iconBtn} ${isDisliked ? styles.dislikeActive : ''}`}
            fill={isDisliked ? '#dc2626' : 'none'}
            color={isDisliked ? '#dc2626' : '#6b7280'}
          />
        </div>
        <div className={styles.rightIcons}>
          <Bookmark 
            size={16} 
            onClick={(e) => handleActionClick(e, 'bookmark')}
            className={`${styles.iconBtn} ${isFavorite ? styles.favoriteActive : ''}`}
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