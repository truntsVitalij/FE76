import React, { useState } from 'react';
import type { IProductCardProps } from './types/product.types';
import './ProductCard.css';

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleQuickView = (): void => {
    console.log(`Быстрый просмотр товара: ${product.brand} ${product.title}`);
  };

  const handleAddToCart = (): void => {
    console.log(`Добавлен в корзину: ${product.brand} ${product.title}`);
  };

  const handleLike = (): void => {
    setIsLiked(!isLiked);
    console.log(`Избранное: ${product.brand} ${product.title}`);
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString('ru-RU');
  };

  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-wrapper">
        <img 
          className="product-image" 
          src={product.image} 
          alt={product.title}
          loading="lazy"
        />
        
        <button className="like-btn" onClick={handleLike}>
          <svg 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill={isLiked ? "#ff5252" : "none"}
            stroke={isLiked ? "#ff5252" : "#333"}
            strokeWidth="2"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>

        {discount > 0 && (
          <div className="discount-badge">{discount}%</div>
        )}

        {isHovered && (
          <button className="quick-view-btn" onClick={handleQuickView}>
            Быстрый просмотр
          </button>
        )}
      </div>

      <div className="product-info">
        <div className="product-prices">
          <span className="wallet-icon">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#ff5252" 
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 6.5H2M22 6.5L20 3H4L2 6.5M22 6.5V17.5C22 18.6 21.1 19.5 20 19.5H4C2.9 19.5 2 18.6 2 17.5V6.5"/>
              <path d="M19 11.5H16C14.9 11.5 14 12.4 14 13.5C14 14.6 14.9 15.5 16 15.5H19"/>
              <circle cx="16.5" cy="13.5" r="1" fill="#ff5252"/>
            </svg>
          </span>
          <span className="current-price discount-price">{formatPrice(product.price)} ₽</span>
          {product.oldPrice && (
            <span className="old-price">{formatPrice(product.oldPrice)} ₽</span>
          )}
        </div>

        <div className="product-title">{product.title}</div>

        <div className="product-rating">
          <span className="star-icon">★</span>
          <span className="rating-value">{product.rating}</span>
          <span className="reviews-count">· {product.reviews} оценок</span>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;