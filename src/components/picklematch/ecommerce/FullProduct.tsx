import React, { FC } from 'react';
import { FullProductProps } from '../types';
import { AddToCartButton } from './AddToCartButton';
import './FullProduct.css';

export const FullProduct: FC<FullProductProps> = ({ product, cartCount = 0 }) => {
  const { price, image, title, description, category } = product;

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ₽`;
  };

  return (
    <div className="picklematch-full-product">
      <div className="picklematch-full-product-image-container">
        <img
          src={image}
          alt={title}
          className="picklematch-full-product-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
          }}
        />
      </div>

      <div className="picklematch-full-product-content">
        <div className="picklematch-full-product-header">
          <div className="picklematch-full-product-main-info">
            <span className="picklematch-full-product-price">{formatPrice(price)}</span>
            {category && <span className="picklematch-full-product-category">{category}</span>}
          </div>
        </div>

        <h1 className="picklematch-full-product-title">{title}</h1>

        <p className="picklematch-full-product-description">{description}</p>

        <div className="picklematch-full-product-actions">
          <AddToCartButton count={cartCount} />
        </div>
      </div>
    </div>
  );
};
