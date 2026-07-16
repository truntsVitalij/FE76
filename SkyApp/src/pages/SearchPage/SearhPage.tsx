import { type FC } from "react";
import { useSearchParams } from "react-router-dom";
import { posts } from "../../data/Posts";

import styles from "./SearchPage.module.css";

export const SearchPage: FC = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLowerCase();

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      (post.description ?? "").toLowerCase().includes(query),
  );
  return (
    <main className={styles.searchPage}>
      <h2> Search results {query && `"${query}"`}</h2>
      {filteredPosts.length === 0 ? (
        <p> Nothing found.</p>
      ) : (
        <div className={styles.results}>
          {filteredPosts.map((post) => (
            <article key={post.id} className={styles.result}>
              <img src={post.image} alt={post.title} />
              <div>
                <h3> {post.title} </h3>
                <p> {post.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};
