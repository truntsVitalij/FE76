import "./styles/main.css";

type Product = {
  id: number;
  brand: string;
  name: string;
  price: string;
  oldPrice: string | null;
  discount: number | null;
  type: string;
  rating: number;
  reviewsCount: number;
  image: string;
};

type ProductCardProps = {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

function ProductCard({ product, onQuickView, onAddToCart }: ProductCardProps) {
  const {
    brand,
    name,
    price,
    oldPrice,
    discount,
    type,
    rating,
    reviewsCount,
    image,
  } = product;

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`[Быстрый просмотр] ${brand} ${name}`);
    onQuickView(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`[В корзину] ${brand} ${name} за ${price} Br`);
    onAddToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={image} alt={`${brand} ${name}`} className="product-image" />
        <button className="quick-view-btn" onClick={handleQuickView}>
          Быстрый просмотр
        </button>
      </div>

      <div className="product-info">
        <div className="product-brand">{brand}</div>
        <div className="product-name">{name}</div>

        <div className="product-badges">
          {discount && <span className="badge discount">-{discount}%</span>}
          <span className="badge sale">РАСПРОДАЖА</span>
        </div>

        <div className="product-prices">
          <span className="current-price">{price} Br</span>
          {oldPrice && <span className="old-price">{oldPrice} Br</span>}
        </div>

        <div className="product-details">
          <div className="detail-item">
            <span className="detail-icon"></span>
            <span className="detail-text">{brand}</span>
          </div>
          <div className="detail-item">
            <span className="detail-text">{type}</span>
          </div>
        </div>

        <div className="product-rating">
          <span className="stars">
            {"★".repeat(Math.floor(rating))}
            {rating % 1 >= 0.5 && "½"}
            {"☆".repeat(5 - Math.ceil(rating))}
          </span>
          <span className="rating-value">
            {rating} · {reviewsCount} оценки
          </span>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          🛒 Добавить в корзину
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
