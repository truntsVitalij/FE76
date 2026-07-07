import styles from "./productRaating.module.css";

export default function ProductRating({
    rating,
    reviews,
}) {
    return (
        <div className={styles.rating}>
            <span>⭐ {rating}</span>
            <span>{reviews} отзывов</span>
        </div>
    );
}