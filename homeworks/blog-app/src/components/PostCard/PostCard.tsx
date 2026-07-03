import type { IProps } from "../../types/post";
import styles from './PostCard.module.css';
import { useState } from "react";
import Title from '../Title/Title';

interface IPostCardProps extends IProps {
  variant: 'large' | 'medium' | 'small';
}

const PostCard: React.FC<IPostCardProps> = ({ post, variant }) => {

   const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const cardClassName = `${styles.card} ${styles[variant]}`;

  return (
    <article className={cardClassName}>
      <div className={styles.imgWrapper}>
        {post.image && (
          <img src={post.image} alt={post.title} className={styles.image} />
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.date}>{post.date}</p>
        <Title level={2} className={styles.title}>{post.title}</Title>
        <p className={styles.text}>{post.text}</p>
      </div>
       <div className={styles.actions}>
        <div className={styles.actionsLeft}>
          <button className={styles.button} onClick={() => setLikeCount(likeCount + 1)}>
            👍 <span className={styles.count}>{likeCount}</span>
          </button>
          <button className={styles.button} onClick={() => setDislikeCount(dislikeCount + 1)}>
            👎 <span className={styles.count}>{dislikeCount}</span>
          </button>
        </div>
        <div className={styles.actionsRight}>
          <button className={styles.button}>🔖</button>
          <button className={styles.button}>⋯</button>
        </div>
      </div>
    </article>
 
  );
};

export default PostCard;