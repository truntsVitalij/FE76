import styles from "./blogCard.module.css";

function BlogCard({title,text}) {
    return (
        <div className={styles.card}>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    )
}

export default BlogCard;