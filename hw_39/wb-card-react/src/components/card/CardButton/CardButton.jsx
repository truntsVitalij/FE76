import styles from "../Card.module.css";

const CardButton = ({ title, onBuy }) => {
  return (
    <button className={styles.btn} onClick={() => onBuy(title)}>
      Купить
    </button>
  );
};

export default CardButton;
