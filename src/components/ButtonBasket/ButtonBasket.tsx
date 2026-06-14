import Button from "../ButtonQuickView/ButtonQuickView";

type ButtonBasketProps = {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
};

function ButtonBasket({ onClick, className = "" }: ButtonBasketProps) {
  return (
    <Button onClick={onClick} className={`add-to-cart-btn ${className}`}>
      🛒 Добавить в корзину
    </Button>
  );
}

export default ButtonBasket;
