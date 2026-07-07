import styles from "./productInfo.module.css";

export default function ProductInfo({ brand, title }) {
    return (
        <div className={styles.info}>
            <p className={styles.brand}>{brand}</p>
            <p className={styles.title}>{title}</p>
        </div>
    );
}