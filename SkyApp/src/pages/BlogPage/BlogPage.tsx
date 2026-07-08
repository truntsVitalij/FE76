import { posts } from "../../data/Posts";

import { MediumCard } from "../../components/MediumCard/MediumCard";
import { SmallCard } from "../../components/SmallCard/SmallCard";

import styles from "./BlogPage.module.css";

const latestPosts = posts.slice(0, 3);
const blogPosts = posts;

export const BlogPage = () => {
  return (
    <main className={styles.blogPage}>
      <section className={styles.blogPage__left}>
        {blogPosts.map((post) => (
          <MediumCard key={post.id} post={post} />
        ))}
      </section>

      <aside className={styles.blogPage__right}>
        {latestPosts.map((post) => (
          <SmallCard key={post.id} post={post} />
        ))}
      </aside>
    </main>
  );
};
