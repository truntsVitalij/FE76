import React from 'react';

interface ProductBadgeProps {
  badge: string | null;
}

const ProductBadge: React.FC<ProductBadgeProps> = ({ badge }) => {
  if (!badge) return null;
  
  return (
    <div className="product-badge">
      {badge}
    </div>
  );
};

export default ProductBadge;