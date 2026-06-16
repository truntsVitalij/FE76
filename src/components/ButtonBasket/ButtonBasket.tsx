import "./ButtonBasket.css";
import Button from "../Button/Button";

type ButtonBasketProps = {
  onClick: (e: React.MouseEvent) => void;
};

function ButtonBasket({ onClick }: ButtonBasketProps) {
  return (
    <Button onClick={onClick} className="add-to-cart-btn">
      🛒 Добавить в корзину
    </Button>
  );
}

export default ButtonBasket;
