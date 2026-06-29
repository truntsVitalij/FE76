//Табы переключают категории.

import { useState } from "react";

import { blogs } from "../data/blogs";
import { BlogCard } from "../components/BlogCard/BlogCard";
import { Tabs } from "../components/Tabs/Tabs";


export const BlogPage =() => {
    const [activeTab, setActiveTab] =  //React будет помнить значение activeTab
    useState("all");

    const filterBlogs =   //Фильтрация статей
    activeTab === "all" ? blogs : blogs.filter (
        (blog) => blog.category.includes(activeTab)
    );

    return (
        <>
        <h2> Blog </h2>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {filterBlogs.map((blog) => (
            <BlogCard key={blog.id} title={blog.title} text={blog.text} />
        ))}
        </>
    )
}