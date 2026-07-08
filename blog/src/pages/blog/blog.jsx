import { useEffect, useState } from "react";
import blogsData from "../../data/blog";
import Tabs from "../../components/tabs/tabs";
import BlogCard from "../../components/blogCard/blogCard";

function Blog() {
  const [posts, setPosts] = useState(null);
  const [tab, setTab] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(blogsData);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (posts === null) {
    return <h2>Загрузка постов...</h2>;
  }

  const filteredPosts =
    tab === "All"
      ? posts
      : posts.filter((post) => post.category === tab);

  return (
    <>
      <Tabs current={tab} onChange={setTab} />

      {filteredPosts.map((post) => (
        <BlogCard
          key={post.id}
          title={post.title}
          text={post.text}
        />
      ))}
    </>
  );
}

export default Blog;