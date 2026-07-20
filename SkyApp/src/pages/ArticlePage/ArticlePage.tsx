import { Link, useParams } from "react-router-dom";
import { CardActions } from "../../components/CardActions";
import { posts } from "../../data/Posts";
// import type { Post } from "../../types/Post";
import styles from "./ArticlePage.module.css";

// type ArticlePageProps = {
//   post: Post;
// };

// export const ArticlePage = ({ post }: ArticlePageProps) => {
//   const currentIndex = posts.findIndex((p) => p.id === post.id);

//   const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
//   const nextPost =
//     currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

export const ArticlePage = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <p> Article not found </p>;
  }
  const currentIndex = posts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <>
      <Link to="/" className={styles.backLink}>
        {" "}
        Back to home{" "}
      </Link>
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

        <CardActions likes={post.likes} />
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
