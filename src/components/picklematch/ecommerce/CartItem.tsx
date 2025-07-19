import React, { FC } from 'react';
import { CartItemProps } from '../types';
import './CartItem.css';

export const CartItem: FC<CartItemProps> = ({ product, count, onRemove }) => {
  const { price, image, title } = product;

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ₽`;
  };

  const getTotalPrice = () => {
    return formatPrice(price * count);
  };

  return (
    <div className="picklematch-cart-item">
      <div className="picklematch-cart-item-image-container">
        <img
          src={image}
          alt={title}
          className="picklematch-cart-item-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
          }}
        />
      </div>

      <div className="picklematch-cart-item-content">
        <h3 className="picklematch-cart-item-title">{title}</h3>
        <div className="picklematch-cart-item-details">
          <span className="picklematch-cart-item-price">{formatPrice(price)}</span>
          <span className="picklematch-cart-item-quantity">× {count}</span>
          <span className="picklematch-cart-item-total">{getTotalPrice()}</span>
        </div>
      </div>

      <button
        className="picklematch-cart-item-remove"
        onClick={onRemove}
        type="button"
        aria-label="Remove item from cart"
      >
        ×
      </button>
    </div>
  );
};
