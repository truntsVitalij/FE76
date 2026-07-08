import { useNavigate } from "react-router-dom";
import styles from "./blogCard.module.css";

function BlogCard({ post }) {

    const navigate = useNavigate();

    return (

        <div
            className={styles.card}
            onClick={() => navigate(`/blog/${post.id}`)}
        >

            <h2>{post.title}</h2>

            <p>{post.text}</p>

        </div>

    );

}

export default BlogCard;