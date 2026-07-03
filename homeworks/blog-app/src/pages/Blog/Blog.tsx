import { useState } from "react";
import PostGrid from "../../components/PostGrid";
import Tabs from "../../components/Tabs";
import type { IPost } from "../../types/post";
import styles from "./Blog.module.css";
import Title from '../../components/Title/Title'

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
      <Title level={2} className={styles.title}>{title}</Title>
      <Tabs items={BLOG_TABS} activeTab={activeTab} onChange={setActiveTab} />
      <PostGrid posts={posts} />
    </section>
  );
};

export default Blog;