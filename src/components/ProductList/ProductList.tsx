import ProductCard from "../ProductCard/ProductCard";

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

type ProductListProps = {
  products: Product[];
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
};

function ProductList({ products, onQuickView, onAddToCart }: ProductListProps) {
  const handleQuickView = (product: Product) => {
    console.log(`Быстрый просмотр: ${product.brand} ${product.name}`);
    onQuickView?.(product);
  };

  const handleAddToCart = (product: Product) => {
    console.log(
      `Добавлен в корзину: ${product.brand} ${product.name} за ${product.price} Br`,
    );
    onAddToCart?.(product);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={handleQuickView}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
