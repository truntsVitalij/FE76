import type { FC } from "react";

import styles from './BlogCard.module.css';
import { Link } from "react-router";

interface IBlogCardProps {
    title: string;
    id: number;
    description: string;
    onClick?: () => void;
    className?: string;
}

export const BlogCard: FC<IBlogCardProps> = ({ title, id, description, onClick, className }) => {
    return (
        <div className={`${styles.blogCard} ${className}`}>
            <h2>{title}</h2>
            <p>{description}</p>
            <Link to={`/blog/${id}`} onClick={onClick}>Read more</Link>
        </div>
    )
}