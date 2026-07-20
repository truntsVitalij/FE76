import { CardActions } from "../CardActions";
import type { Post } from "../../types/Post";
import styles from "./HeroCard.module.css";
import { Link } from "react-router-dom";

type HeroCardProps = {
  post: Post;
};

export const HeroCard = ({ post }: HeroCardProps) => {
  return (
    <article className={styles.heroCard}>
      <Link to={`/article/${post.id}`} className={styles.heroCard__link}>
        <img
          src={post.image}
          alt={post.title}
          className={styles.heroCard__image}
        />
        <div className={styles.heroCard_information}>
          <p className={styles.heroCard__date}> {post.date} </p>
          <h2 className={styles.heroCard__title}>{post.title}</h2>
          <p className={styles.heroCard__text}>{post.description}</p>
        </div>
      </Link>

      <CardActions likes={post.likes} />
    </article>
  );
};
