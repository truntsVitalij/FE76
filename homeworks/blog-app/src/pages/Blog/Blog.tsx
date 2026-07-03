import { useState } from "react";
import PostGrid from "../../components/PostGrid";
import Tabs from "../../components/Tabs";
import type { IPost } from "../../types/post";
import styles from "./Blog.module.css";

type TabType = "All" | "My favorites" | "Popular";

interface IBlogProps {
  posts: IPost[];
  title: string;
}

const Blog = ({ posts, title }: IBlogProps) => {
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
      <PostGrid posts={posts} />
    </section>
  );
};

export default Blog;