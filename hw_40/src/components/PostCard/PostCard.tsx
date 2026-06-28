import { type FC } from 'react';
import { ThumbsUp, ThumbsDown, Bookmark, MoreHorizontal } from 'lucide-react';
import styles from './PostCard.module.css';
import type { Post } from '../../pages/blog/types';

interface PostCardProps {
  post: Post;
  size?: 'l' | 'm' | 's';
}

export const PostCard: FC<PostCardProps> = ({ post, size = 'm' }) => {
  return (
    <article className={`${styles.card} ${styles[size]}`}>
      <div className={styles.wrapper}>
        <div className={styles.textBlock}>
          <div className={styles.meta}>{post.date}</div>
          <h3 className={styles.cardTitle}>{post.title}</h3>
          <div className={styles.actions}>
            <div className={styles.actionIcons}>
              <ThumbsUp size={16} />
              <ThumbsDown size={16} />
            </div>
            <div className={styles.rightIcons}>
              <Bookmark size={16} />
              <MoreHorizontal size={16} />
            </div>
          </div>
        </div>
        <img src={post.image} alt="Blog post" className={styles.image} />
      </div>
    </article>
  );
};