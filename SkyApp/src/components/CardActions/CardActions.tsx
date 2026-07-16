import {ThumbsUp , ThumbsDown, Bookmark} from "lucide-react";
import styles from "./CardActions.module.css"

type CardActionsProps = {
  likes: number;
};

export const CardActions = ({ likes }: CardActionsProps) => {
  return (
    <>
    <div className={styles.cardActions}>
      <div className={styles.cardActions__left}>
        <button className={styles.cardActions__button}>
          <span>
            <ThumbsUp size={20}/>
            
            {/* {<svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.292 19.15C18.218 19.636 17.794 20 17.292 20H17.28H7V10.212L10.608 2.094C11.415 2.352 12 3.108 12 4V8C12 8.552 12.447 9 13 9H18.674C18.728 9.002 18.78 9.003 18.832 9.011C19.097 9.051 19.33 9.192 19.488 9.407C19.646 9.622 19.712 9.885 19.672 10.148L18.292 19.15ZM5 20H3C2.449 20 2 19.551 2 19V12C2 11.448 2.449 11 3 11H5V20ZM21.099 8.22C20.623 7.575 19.925 7.154 19.132 7.033C18.972 7.009 18.814 7.004 18.66 7H14V4C14 1.794 12.206 0 10 0C9.605 0 9.247 0.233 9.086 0.593L5.35 9H3C1.346 9 0 10.345 0 12V19C0 20.654 1.346 22 3 22H17.269H17.304C18.776 22 20.048 20.909 20.269 19.451L21.648 10.45C21.77 9.657 21.574 8.866 21.099 8.22Z"
                fill="#313037"
              />
            </svg> */}
          </span>
          <span>{likes}</span>
        </button>

        <button className={styles.cardActions__button}>
          <span>
            <ThumbsDown size={20}/>
            {/* <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.6829 10.924C20.5699 11.552 20.0129 12.013 19.3529 12.001H17.6829V3.001H19.3709C20.0129 2.952 20.5689 3.448 20.6829 4.077V10.924ZM15.6829 12.788L12.0749 20.906C11.2679 20.648 10.6829 19.891 10.6829 19.001V15.001C10.6829 14.448 10.2349 14.001 9.68294 14.001H4.01394C3.96794 13.998 3.90694 13.999 3.84994 13.99C3.30494 13.907 2.92894 13.396 3.01094 12.852L4.39194 3.851C4.46594 3.361 4.91794 3.022 5.40294 3.001H15.6829V12.788ZM22.6739 3.866C22.4519 2.223 21.0469 1 19.4109 1C19.3919 1 19.3719 1 19.3529 1.001H5.41394C3.92694 1.011 2.63694 2.081 2.41494 3.549L1.03394 12.551C0.786937 14.186 1.91494 15.718 3.54694 15.966C3.70694 15.991 3.86994 16.003 4.02294 16.001H8.68294V19.001C8.68294 21.207 10.4769 23.001 12.6829 23.001C13.0789 23.001 13.4359 22.768 13.5969 22.407L17.3319 14.001H19.3349C21.0049 14.006 22.4489 12.798 22.6739 11.135C22.6799 11.091 22.6829 11.046 22.6829 11.001V4.001C22.6829 3.956 22.6799 3.911 22.6739 3.866Z"
                fill="#313037"
              />
            </svg> */}
          </span>
        </button>
      </div>

      <div className={styles.cardActions__right}>
        <button className={styles.cardActions__button}>
          <span>
            <Bookmark size={20}/>
            {/* <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 15C12.204 15 12.407 15.062 12.581 15.187L18 19.057V5C18 4.449 17.552 4 17 4H7C6.449 4 6 4.449 6 5V19.057L11.419 15.187C11.593 15.062 11.796 15 12 15ZM19 22C18.795 22 18.592 21.937 18.419 21.813L12 17.229L5.581 21.813C5.277 22.032 4.875 22.062 4.542 21.89C4.209 21.718 4 21.375 4 21V5C4 3.346 5.346 2 7 2H17C18.654 2 20 3.346 20 5V21C20 21.375 19.791 21.718 19.458 21.89C19.313 21.963 19.156 22 19 22Z"
                fill="#313037"
              />
            </svg> */}
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
    </>
  );
};
