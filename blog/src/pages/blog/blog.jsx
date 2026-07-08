import { useState } from "react";
import blogs from "../../data/blog";
import Tabs from "../../components/Tabs/Tabs";
import BlogCard from "../../components/BlogCard/BlogCard";

function Blog(){

    const [tab,setTab]=useState("All");

    const filtered =
        tab==="All"
        ? blogs
        : blogs.filter(blog=>blog.category===tab);

    return(

        <>

            <Tabs
                current={tab}
                onChange={setTab}
            />

            {
                filtered.map(blog=>

                    <BlogCard
                        key={blog.id}
                        title={blog.title}
                        text={blog.text}
                    />

                )
            }

        </>

    )

}

export default Blog;