import React from 'react';

interface ProductRatingProps {
  rating: number;
  reviews: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({ rating, reviews }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half-star" className="star half">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="product-rating">
      <div className="stars">{renderStars()}</div>
      <span className="rating-value">{rating.toFixed(1)}</span>
      <span className="reviews-count">{reviews} отзывов</span>
    </div>
  );
};

export default ProductRating;