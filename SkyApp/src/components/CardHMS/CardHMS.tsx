import { Link } from "react-router-dom";
import type { Post } from "../../types/Post"
import styles from "./CardHMS.module.css"
import { CardActions } from "../CardActions";
import { useDispatch } from "react-redux";
import { openPreview } from "../../store/actions/previewAction";
 
interface ICardProps {
    post: Post
    size: "hero" | "medium" | "small"
}

export const Card = ({ post, size  }: ICardProps) => {
const dispatch = useDispatch();

  return (
    <article className={`${styles.card} ${styles[size]}`}>
      <Link to={`/article/${post.id}`} className={`${styles.card__link} ${styles[size]}`}>
        <img
          src={post.image}
          alt={post.title}
          className={`${styles[size]} ${styles.card__image} `}
          onClick={() => dispatch(openPreview(post.id))}
        />
        <div className={`${styles.card__information} ${styles[size]}`}>
          <p className={`${styles.card__date} ${styles[size]}`}> {post.date} </p>
          <h2 className={`${styles.card__title} ${styles[size]}`}>{post.title}</h2>
          {/* в hero есть description, а в medium, small - его нет */}
          {size === "hero" && (
  <p className={styles.card__text}>{post.description}</p>
)}
          {/* <p className={`${styles.card__text} ${styles[size]}`}>{post.description}</p> */}
        </div>
      </Link>

      <CardActions likes={post.likes} />
    </article>
  );
};