// import type { Post } from "../../types/Post";
// import { posts } from "../../data/Posts";
// import { CardActions } from "../CardActions";
// import styles from "./SmallCard.module.css";
// import { Link } from "react-router-dom";

// type SmallCardProps = {
//   post: Post;
// };

// export const SmallCard = ({ post }: SmallCardProps) => {
//   return (
//     <article className={styles.smallCard}>
//       <Link to={`/article/${post.id}`} className={styles.smallCard__link}>
//         <div className={styles.smallCard__content}>
//           <div className={styles.smallCard_information}>
//             <p className={styles.smallCard__date}> {post.date} </p>
//             <h3 className={styles.smallCard__title}>{post.title}</h3>
//             {/* <p className={styles.smallCard__text}>{post.description}</p> */}
//           </div>
//           <img
//             src={post.image}
//             alt={post.title}
//             className={styles.smallCard__image}
//           />
//         </div>
//       </Link>
//       <CardActions likes={post.likes} />
//     </article>
//   );
// };
