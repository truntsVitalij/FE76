import styles from "./productPrice.module.css";

export default function ProductPrice({
    price,
    oldPrice,
    discount,
}) {
    return (
        <div className={styles.priceBlock}>
            <div className={styles.currentPrice}>
                {price.toLocaleString()} $
            </div>

            <div className={styles.additional}>
                <span className={styles.oldPrice}>
                    {oldPrice.toLocaleString()} $
                </span>

                <span className={styles.discount}>
                    -{discount}%
                </span>
            </div>
        </div>
    );
}