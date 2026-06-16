import styles from "../Card.module.css";

const CardPrice = ({ price }) => {
  return <p className={styles.price}>{price} BYN</p>;
};

export default CardPrice;
