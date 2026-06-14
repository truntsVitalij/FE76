import React from 'react';
import type { IProductBadgeProps } from './types';
import styles from './ProductBadge.module.css';

const ProductBadge: React.FC<IProductBadgeProps> = ({ badge }) => {
  if (!badge) return null;
  return <div className={styles.productBadge}>{badge}</div>;
};

export default ProductBadge;