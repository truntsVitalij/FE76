import React from 'react';
import type { IProductRatingProps } from './types';
import styles from './ProductRating.module.css';

const ProductRating: React.FC<IProductRatingProps> = ({ rating, reviews }) => {
  const renderStars = (): React.JSX.Element[] => {
    const stars: React.JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className={styles.starFilled}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half-star" className={styles.starHalf}>★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className={styles.starEmpty}>★</span>);
    }
    
    return stars;
  };

  return (
    <div className={styles.productRating}>
      <div className={styles.stars}>{renderStars()}</div>
      <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
      <span className={styles.reviewsCount}>· {reviews} оценок</span>
    </div>
  );
};

export default ProductRating;