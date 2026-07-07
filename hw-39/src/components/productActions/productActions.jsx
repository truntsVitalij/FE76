import styles from "./productActions.module.css";

export default function ProductActions() {
    const handleClick = () => {
        console.log("Добавить в корзину");
    };

    return (
        <button
            className={styles.button}
            onClick={handleClick}
        >
            В корзину
        </button>
    );
}