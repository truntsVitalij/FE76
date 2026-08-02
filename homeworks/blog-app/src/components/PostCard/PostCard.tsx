import type { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  setPreviewImage,
  toggleFavorite,
  likePost,
  dislikePost,
} from "../../store/actions";
import Button from "../../shared/ui/Button";
import Title from "../../shared/ui/Title";
import styles from "./PostCard.module.css";
import type { IPost } from "../../types/post";
import { ThumbsUp, ThumbsDown, Star, MoreHorizontal } from "lucide-react";

type TPostCardVariant = "large" | "medium" | "small" | "full";

interface IPostCardProps {
  post: IPost;
  variant: TPostCardVariant;
}

const PostCard: FC<PropsWithChildren<IPostCardProps>> = ({ post, variant, children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

   const likes = useAppSelector((state) => state.likes);
  const postLikes = likes[post.id]?.likes || 0;
  const postDislikes = likes[post.id]?.dislikes || 0;

   const favoriteIds = useAppSelector((state) => state.favorites.ids);
  const isFavorite = favoriteIds.includes(post.id);

  const isFullPage = variant === "full";

  const handleCardClick = () => !isFullPage && navigate(`/post/${post.id}`);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post.image) {
      dispatch(setPreviewImage(post.image));
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(post.id, isFavorite));
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(likePost(post.id));
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(dislikePost(post.id));
  };

  const cardClassName = `${styles.card} ${styles[variant]}`;

  return (
    <article
      className={cardClassName}
      onClick={handleCardClick}
      style={{ cursor: isFullPage ? "default" : "pointer" }}
    >
      {children && <div className={styles.breadcrumbs}>{children}</div>}

      <div className={styles.imgWrapper}>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className={styles.image}
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>

      <div className={styles.content}>
        <p className={styles.date}>{post.date}</p>
        <Title level={2} className={styles.title}>
          {post.title}
        </Title>
        <p className={styles.text}>{post.text}</p>
      </div>

      <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
        <div className={styles.actionsLeft}>
            <Button variant="icon" className={styles.button} onClick={handleLike}>
            <ThumbsUp className={styles.icon} size={22} />
            <span className={styles.count}>{postLikes}</span>
          </Button>
           <Button
            variant="icon"
            className={styles.button}
            onClick={handleDislike}
          >
            <ThumbsDown className={styles.icon} size={22} />
            <span className={styles.count}>{postDislikes}</span>
          </Button>
        </div>
        <div className={styles.actionsRight}>
           <Button
            variant="icon"
            className={`${styles.button} ${isFavorite ? styles.favoriteActive : ""}`}
            onClick={handleToggleFavorite}
          >
            <Star
              className={styles.iconFavorite}
              size={20}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </Button>
          <Button variant="icon" className={styles.button} disabled>
            <MoreHorizontal className={styles.icon} size={20} />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;