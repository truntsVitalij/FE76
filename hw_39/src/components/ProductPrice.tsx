import React from 'react';

interface ProductPriceProps {
  price: number;
  oldPrice?: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ price, oldPrice }) => {
  const formatPrice = (value: number): string => {
    return value.toLocaleString('ru-RU');
  };

  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

  return (
    <div className="product-prices">
      <div className="current-price">{formatPrice(price)} ₽</div>
      {oldPrice && (
        <>
          <div className="old-price">{formatPrice(oldPrice)} ₽</div>
          <div className="discount-badge">-{discount}%</div>
        </>
      )}
    </div>
  );
};

export default ProductPrice;