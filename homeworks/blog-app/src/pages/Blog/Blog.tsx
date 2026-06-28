import { useState } from "react";
import PostList from "../../components/PostList";
import Tabs from "../../components/Tabs";
import type { IPost } from "../../types/post";
import styles from "./Blog.module.css";

type TabType = "All" | "My favorites" | "Popular";

interface BlogProps {
  posts: IPost[];
  title: string;
}

const Blog = ({ posts, title }: BlogProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("All");
  const BLOG_TABS = [
    { id: "All", label: "All" },
    { id: "My favorites", label: "My favorites" },
    { id: "Popular", label: "Popular" },
  ] as const;

  return (
    <section className={styles.blogContainer}>
      <h1 className={styles.title}>{title}</h1>
      <Tabs items={BLOG_TABS} activeTab={activeTab} onChange={setActiveTab} />
      <PostList posts={posts} />
    </section>
  );
};

export default Blog;