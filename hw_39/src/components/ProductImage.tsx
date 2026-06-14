import React from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return (
    <img
      className="product-image"
      src={src}
      alt={alt}
      loading="lazy"
    />
  );
};

export default ProductImage;