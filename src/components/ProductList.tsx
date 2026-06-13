import ProductCard from "./ProductCard/ProductCard";
import img1 from "../assets/img-1.webp";
import img2 from "../assets/img-2.jpeg";
import img3 from "../assets/img-3.webp";
import img4 from "../assets/img-4.webp";
import img5 from "../assets/img-5.jpeg";
import img6 from "../assets/img-6.webp";
import img7 from "../assets/img-7.jpeg";
import img8 from "../assets/img-8.webp";
import img9 from "../assets/img-9.webp";
import img10 from "../assets/img-10.webp";

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

const products: Product[] = [
  {
    id: 1,
    brand: "NISHMAN",
    name: "успокаивающий одеколон после бритья с пряным ароматом",
    price: "30,40",
    oldPrice: "44,03",
    discount: 30,
    type: "Одеколон после бритья 12 Sp...",
    rating: 5.0,
    reviewsCount: 34,
    image: img1,
  },
  {
    id: 2,
    brand: "NISHMAN",
    name: "освежающий лосьон после бритья с цитрусовым ароматом",
    price: "28,90",
    oldPrice: "41,50",
    discount: 30,
    type: "Лосьон после бритья 10 Sp...",
    rating: 4.8,
    reviewsCount: 27,
    image: img2,
  },
  {
    id: 3,
    brand: "LANCOME",
    name: "увлажняющий крем для лица с экстрактом розы",
    price: "125,00",
    oldPrice: "189,90",
    discount: 34,
    type: "Крем для лица 50 ml",
    rating: 4.9,
    reviewsCount: 156,
    image: img3,
  },
  {
    id: 4,
    brand: "YVES ROCHER",
    name: "питательный шампунь для сухих волос",
    price: "12,50",
    oldPrice: "18,90",
    discount: 34,
    type: "Шампунь 300 ml",
    rating: 4.6,
    reviewsCount: 89,
    image: img4,
  },
  {
    id: 5,
    brand: "L'OREAL",
    name: "стойкая краска для волос с кератином",
    price: "42,30",
    oldPrice: "59,90",
    discount: 29,
    type: "Краска для волос 1 шт",
    rating: 4.7,
    reviewsCount: 203,
    image: img5,
  },
  {
    id: 6,
    brand: "NISHMAN",
    name: "увлажняющий бальзам после бритья с алоэ вера",
    price: "32,20",
    oldPrice: "46,80",
    discount: 31,
    type: "Бальзам после бритья 15 Sp...",
    rating: 4.9,
    reviewsCount: 42,
    image: img6,
  },
  {
    id: 7,
    brand: "CHANEL",
    name: "классическая туалетная вода с древесным ароматом",
    price: "345,00",
    oldPrice: null,
    discount: null,
    type: "Туалетная вода 50 ml",
    rating: 5.0,
    reviewsCount: 412,
    image: img7,
  },
  {
    id: 8,
    brand: "BIOTHERM",
    name: "очищающая пенка для лица для чувствительной кожи",
    price: "56,70",
    oldPrice: "79,90",
    discount: 29,
    type: "Пенка для умывания 150 ml",
    rating: 4.5,
    reviewsCount: 78,
    image: img8,
  },
  {
    id: 9,
    brand: "NISHMAN",
    name: "успокаивающий гель после бритья с экстрактом ромашки",
    price: "29,90",
    oldPrice: "42,30",
    discount: 29,
    type: "Гель после бритья 10 Sp...",
    rating: 4.7,
    reviewsCount: 23,
    image: img9,
  },
  {
    id: 10,
    brand: "VICHY",
    name: "минеральная термальная вода для увлажнения кожи",
    price: "18,40",
    oldPrice: "25,60",
    discount: 28,
    type: "Термальная вода 150 ml",
    rating: 4.8,
    reviewsCount: 167,
    image: img10,
  },
];

function ProductList() {
  const handleQuickView = (product: Product) => {
    console.log(`Быстрый просмотр: ${product.brand} ${product.name}`);
  };

  const handleAddToCart = (product: Product) => {
    console.log(
      `Добавлен в корзину: ${product.brand} ${product.name} за ${product.price} Br`,
    );
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
