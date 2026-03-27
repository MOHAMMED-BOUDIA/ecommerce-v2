import React from 'react';
import Badge from './Badge';

/**
 * Premium Reusable ProductBadge Component
 * 特化用于商品列表，带有色彩逻辑
 */
const ProductBadge = ({ status, className = '' }) => {
  if (!status) return null;

  const getStyle = (s) => {
    switch (s.toLowerCase()) {
      case 'new':
      case 'new arrival':
        return { variant: 'primary', label: 'New Arrival' };
      case 'sale':
      case 'discount':
        return { variant: 'danger', label: 'Offer' };
      case 'hot':
      case 'best seller':
        return { variant: 'warning', label: 'Best Seller' };
      case 'trending':
        return { variant: 'success', label: 'Trending' };
      default:
        return { variant: 'neutral', label: s };
    }
  };

  const { variant, label } = getStyle(status);

  return (
    <Badge 
      variant={variant} 
      className={className}
      pill
      size="sm"
    >
      {label}
    </Badge>
  );
};

export default ProductBadge;
