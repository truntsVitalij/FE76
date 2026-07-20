import { ThumbsUp, ThumbsDown, Bookmark } from "lucide-react";
import styles from "./CardActions.module.css";

type CardActionsProps = {
  likes: number;
  liked: boolean;
  disliked: boolean;
  favorite: boolean;

  onLike: () => void;
  onDislike: () => void;
  onFavorite: () => void;
};

export const CardActions = ({
  likes,
  liked,
  disliked,
  favorite,
  onLike,
  onDislike,
  onFavorite,
}: CardActionsProps) => {
  return (
    <div className={styles.cardActions}>
      <div className={styles.cardActions__left}>
        <button className={styles.cardActions__button} onClick={onLike}>
          <span>
            <ThumbsUp size={20}
            color={liked ? "#912EF2" : "#313037"} />
          </span>
          <span>{likes}</span>
        </button>

        <button className={styles.cardActions__button} onClick={onDislike}>
          <span>
            <ThumbsDown size={20}
            color={disliked ? "#912EF2" : "#313037"}
            fill={favorite ? "#912EF2" : "none"} />
          </span>
        </button>
      </div>

      <div className={styles.cardActions__right}>
        <button className={styles.cardActions__button} onClick={onFavorite}>
          <span>
            <Bookmark size={20} />
          </span>
        </button>

        <button className={styles.cardActions__button}>
          <span>
            <svg
              width="20"
              height="4"
              viewBox="0 0 20 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 2C0 3.10267 0.897333 4 2 4C3.10267 4 4 3.10267 4 2C4 0.897333 3.10267 0 2 0C0.897333 0 0 0.897333 0 2ZM10 4C8.89733 4 8 3.10267 8 2C8 0.897333 8.89733 0 10 0C11.1027 0 12 0.897333 12 2C12 3.10267 11.1027 4 10 4ZM18 4C16.8973 4 16 3.10267 16 2C16 0.897333 16.8973 0 18 0C19.1027 0 20 0.897333 20 2C20 3.10267 19.1027 4 18 4Z"
                fill="#313037"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};
