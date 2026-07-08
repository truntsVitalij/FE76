import { useEffect, useState } from "react";
import Tabs from "../../components/tabs/tabs";
import BlogCard from "../../components/blogCard/blogCard";
import blogsData from "../../data/blog";

function BlogList() {

    const [posts, setPosts] = useState(null);
    const [tab, setTab] = useState("All");
    const [search, setSearch] = useState("");

    useEffect(() => {

        setTimeout(() => {
            setPosts(blogsData);
        }, 1000);

    }, []);

    if (!posts) {
        return <h2>Loading...</h2>;
    }

    const filtered = posts.filter(post => {

        const tabFilter =
            tab === "All"
                ? true
                : post.category === tab;

        const searchFilter =
            post.title
                .toLowerCase()
                .includes(search.toLowerCase());

        return tabFilter && searchFilter;

    });

    return (
        <>

            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Tabs
                current={tab}
                onChange={setTab}
            />

            {filtered.map(post => (
                <BlogCard
                    key={post.id}
                    post={post}
                />
            ))}

        </>
    );

}

export default BlogList;