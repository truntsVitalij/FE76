import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CardActions } from "../../components/CardActions";
import { posts } from "../../data/Posts";
import styles from "./ArticlePage.module.css";
import type { RootState } from "../../store";
import { likePost, dislikePost, toggleFavorite } from "../../store/actions/postsAction";

// type ArticlePageProps = {
//   post: Post;
// };

// export const ArticlePage = ({ post }: ArticlePageProps) => {
//   const currentIndex = posts.findIndex((p) => p.id === post.id);

//   const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
//   const nextPost =
//     currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

export const ArticlePage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <p> Article not found </p>;
  }

  const liked = useSelector(
    (state: RootState) => state.posts.liked.includes(post.id)
  );

   const disliked = useSelector(
    (state: RootState) => state.posts.disliked.includes(post.id)
  );

  const favorite = useSelector(
    (state: RootState) => state.posts.favorites.includes(post.id)
  );

  const likesCount = liked ? post.likes + 1: post.likes;
  
  const currentIndex = posts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <>
      <Link to="/" className={styles.backLink}>Back to home</Link>
      <article className={styles.articleContainer}>
        <p className={styles.date}> {post.date} </p>
        <h1 className={styles.articleTitle}> {post.title} </h1>
        <img
          src={post.image}
          alt={post.title}
          className={styles.activePage__image}
        />
        {/* <p className={styles.activePage__content}>{post.content}</p> */}
        {/* </>берет массив строк (абзацев) и превращает его в HTML-теги <p> для отображения на странице в React */}

        {post.content.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}

        <CardActions 
        likes={likesCount}
        liked={liked}
        disliked={disliked}
        favorite={favorite}
        onLike={() => dispatch(likePost(post.id))} 
        onDislike={() => dispatch(dislikePost(post.id))}
        onFavorite={() => dispatch(toggleFavorite(post.id))}/>
      </article>

      <div className={styles.navigation}>
        {prevPost && <Link to={`/article/${prevPost.id}`}> Prev </Link>}
        {nextPost && <Link to={`/article/${nextPost.id}`}> Next </Link>}
      </div>
    </>
  );
};

// // import { useEffect } from 'react';
// import styles from './Blog.module.css';

// export const Blog = () => {
//     // useEffect(() => {
//     //     window.location.replace('/blog')       //меняем +URL +добавить useEffect in App.tsx
//     // }, [] )

//     return(
//         <div className={styles.blogContainer}> Blog </div>
//     )
// }
