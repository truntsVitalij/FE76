import styles from "./Card.module.css";
import CardImage from "./CardImage/CardImage";
import CardPrice from "./CardPrice/CardPrice";
import CardTitle from "./CardTitle/CardTitle";
import CardButton from "./CardButton/CardButton";

const Card = ({ image, title, price }) => {
  const handleBuy = (productTitle) => {
    console.log("Купить:", productTitle);
  };

  return (
    <div className={styles.card}>
      <CardImage image={image} title={title} />
      <CardPrice price={price} />
      <CardTitle title={title} />
      <CardButton title={title} onBuy={handleBuy} />
    </div>
  );
};

export default Card;
