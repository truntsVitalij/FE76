import styles from "./quickViewButton.module.css";

export default function QuickViewButton() {
    const handleClick = () => {
        console.log("Быстрый просмотр");
    };

    return (
        <button
            className={styles.button}
            onClick={handleClick}
        >
            Быстрый просмотр
        </button>
    );
}