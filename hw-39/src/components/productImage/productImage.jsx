import styles from "./productImage.module.css";

export default function ProductImage({ image, title }) {
    return (
        <div className={styles.imageWrapper}>
            <img
                src={image}
                alt={title}
                className={styles.image}
            />
        </div>
    );
}