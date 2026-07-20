import { Link } from "react-router-dom";
import type { Post } from "../../types/post";
import styles from "./CardHMS.module.css";
import { CardActions } from "../CardActions";
import { useDispatch, useSelector } from "react-redux";
import { openPreview } from "../../store/actions/previewAction";
import type { RootState } from "../../store";
import {
  likePost,
  dislikePost,
  toggleFavorite,
} from "../../store/actions/postsAction";

interface ICardProps {
  post: Post;
  size: "hero" | "medium" | "small";
}

export const Card = ({ post, size }: ICardProps) => {
  const dispatch = useDispatch();

  const liked = useSelector((state:RootState) => state.posts.liked.includes(post.id));
  const likesCount = liked ? post.likes +1 : post.likes;

  const disliked = useSelector((state:RootState) =>
    state.posts.disliked.includes(post.id),
  );

  const favorite = useSelector((state:RootState) =>
    state.posts.favorites.includes(post.id),
  );

  return (
    <article className={`${styles.card} ${styles[size]}`}>
      <Link
        to={`/article/${post.id}`}
        className={`${styles.card__link} ${styles[size]}`}
      >
        <img
          src={post.image}
          alt={post.title}
          className={`${styles[size]} ${styles.card__image} `}
          // onClick={() => dispatch(openPreview(post.id))}
          onClick={(e) => {
            e.preventDefault(); 
            dispatch(openPreview(post.id))
          }}
        />
        <div className={`${styles.card__information} ${styles[size]}`}>
          <p className={`${styles.card__date} ${styles[size]}`}>
            {" "}
            {post.date}{" "}
          </p>
          <h2 className={`${styles.card__title} ${styles[size]}`}>
            {post.title}
          </h2>
          {/* в hero есть description, а в medium, small - его нет */}
          {size === "hero" && (
            <p className={styles.card__text}>{post.description}</p>
          )}
          {/* <p className={`${styles.card__text} ${styles[size]}`}>{post.description}</p> */}
        </div>
      </Link>

      <CardActions
        likes={likesCount}
        liked={liked}
        disliked={disliked}
        favorite={favorite}
        onLike={() => dispatch(likePost(post.id))}
        onDislike={() => dispatch(dislikePost(post.id))}
        onFavorite={() => dispatch(toggleFavorite(post.id))}
      />
    </article>
  );
};
