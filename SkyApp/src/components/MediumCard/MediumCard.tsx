// import type { Post } from "../../types/Post";
// import { posts } from "../../data/Posts";
// import { CardActions } from "../CardActions";
// import styles from "./MediumCard.module.css";
// import { Link } from "react-router-dom";

// type MediumCardProps = {
//   post: Post;
// };

// export const MediumCard = ({ post }: MediumCardProps) => {
//   return (
//     <article className={styles.mediumCard}>
//       <Link to={`/article/${post.id}`} className={styles.mediumCard__link}>
//         <img
//           src={post.image}
//           alt={post.title}
//           className={styles.mediumCard__image}
//         />
//         <div className={styles.mediumCard_information}>
//           <p className={styles.mediumCard__date}> {post.date} </p>
//           <h3 className={styles.mediumCard__title}>{post.title}</h3>
//           {/* <p className={styles.mediumCard__text}>{post.description}</p> */}
//         </div>
//       </Link>
//       <CardActions likes={post.likes} />
//     </article>
//   );
// };
