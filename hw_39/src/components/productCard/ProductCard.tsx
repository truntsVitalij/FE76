import React, { useState } from 'react';
import ProductImage from '../productImage';
import ProductBadge from '../productBadge';
import ProductRating from '../productRating';
import ProductPrice from '../productPrice';
import QuickViewButton from '../QuickViewButton';
import type { IProductCardProps } from './types';
import styles from './ProductCard.module.css';

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

  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.productImageWrapper}>
        <ProductImage src={product.image} alt={product.title} />
        <ProductBadge badge={product.badge} />
        
        <button className={styles.likeBtn} onClick={handleLike}>
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
          <div className={styles.discountBadge}>{discount}%</div>
        )}

        {isHovered && (
          <QuickViewButton onClick={handleQuickView} />
        )}
      </div>

      <div className={styles.productInfo}>
        <ProductPrice price={product.price} oldPrice={product.oldPrice} />

        <div className={styles.productTitle}>{product.title}</div>

        <ProductRating rating={product.rating} reviews={product.reviews} />

        <button className={styles.addToCartBtn} onClick={handleAddToCart}>
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;