import React from 'react';
import ProductCard from '../productCard';
import type { IProductListProps } from './types';
import styles from './ProductList.module.css';

const ProductList: React.FC<IProductListProps> = ({ list }) => {
  return (
    <div className={styles.productsGrid}>
      {list.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;