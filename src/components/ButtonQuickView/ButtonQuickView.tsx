import Button from "../Button/Button";

type ButtonQuickViewProps = {
  onClick: (e: React.MouseEvent) => void;
};

function ButtonQuickView({ onClick }: ButtonQuickViewProps) {
  return (
    <Button onClick={onClick} className="quick-view-btn">
      Быстрый просмотр
    </Button>
  );
}

export default ButtonQuickView;
