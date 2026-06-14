import React from 'react';
import type { IProductPriceProps } from './types';
import styles from './ProductPrice.module.css';

const ProductPrice: React.FC<IProductPriceProps> = ({ price, oldPrice }) => {
  const formatPrice = (value: number): string => {
    return value.toLocaleString('ru-RU');
  };

  return (
    <div className={styles.productPrices}>
      <span className={styles.currentPrice}>{formatPrice(price)} ₽</span>
      {oldPrice && (
        <span className={styles.oldPrice}>{formatPrice(oldPrice)} ₽</span>
      )}
    </div>
  );
};

export default ProductPrice;