import { posts } from "../../data/Posts";

import { HeroCard } from "../../components/HeroCard/HeroCard";
import { MediumCard } from "../../components/MediumCard/MediumCard";
import { SmallCard } from "../../components/SmallCard/SmallCard";

import styles from "./HomePage.module.css"

export const HomePage = () => {

  const gridPosts = posts.slice (4); // Убираем первые 4 поста, которые уже показаны сверху
  const rows = []; // Разбиваем оставшиеся посты на строки по 3 карточки

  for (let i = 0; i < gridPosts.length; i+=3) {
    rows.push(gridPosts.slice(i, i+3))
  }

  return (
    <main className={styles.homePage}>
      <section className={styles.homePage__firstRow}>
        <HeroCard post={posts[0]} />

        <div className={styles.homePage__rightColumn}>
          <MediumCard post={posts[1]} />

          <SmallCard post={posts[2]} />

          <SmallCard post={posts[3]} />
        </div>
      </section>

      <section className={styles.homePage__rows}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.homePage__row}>
            {row.map((post, index) => 
            index === 2 ? (
              <SmallCard key={post.id} post={post} />
            ) : (
              <MediumCard key={post.id} post={post} />
            )
            )}
          </div>
        ))}
      </section>

      {/* <section className={styles.homePage__grid}>
        {posts.slice(4).map((post) => (
          <MediumCard key={post.id} post={post} />
        ))}
      </section> */}
    </main>
  );
};
