import type { FC } from "react";

import styles from './BlogCard.module.css';
import { Link } from "react-router";
import { useDispatch } from "react-redux";

interface IBlogCardProps {
    title: string;
    id: number;
    description: string;
    onClick?: () => void;
    className?: string;
}

export const BlogCard: FC<IBlogCardProps> = ({ title, id, description, onClick, className }) => {
    const dispatch = useDispatch();
    const post = useGetCardById(id);
    const isFavorite = useIsFavoritePost(post.id)

    const handleLikeClick = () => {
        dispatch(likeBlog(id))
    }

    const handleDislikeClick = () => {
        dispatch(dislikeBlog(id))
    }

    const handleToggleFavorite = (postId: number) => {
        if (!post) return;

        if (isFavorite) {
            dispatch(removeToFavorite(postId));
        } else {
            dispatch(addToFavorite(post))
        }
    }

    return (
        <div className={`${styles.blogCard} ${className}`}>
            <h2>{title}</h2>
            <p>{description}</p>
            <Link to={`/blog/${id}`} onClick={onClick}>Read more</Link>
        </div>
    )
}