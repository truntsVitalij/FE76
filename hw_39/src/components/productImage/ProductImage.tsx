import React from 'react';
import type { IProductImageProps } from './types';
import styles from './ProductImage.module.css';

const ProductImage: React.FC<IProductImageProps> = ({ src, alt }) => {
  return (
    <img
      className={styles.productImage}
      src={src}
      alt={alt}
      loading="lazy"
    />
  );
};

export default ProductImage;