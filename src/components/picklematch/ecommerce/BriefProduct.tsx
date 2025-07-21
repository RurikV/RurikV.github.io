import React, { FC } from 'react';
import { BriefProductProps } from '../types';
import { AddToCartButton } from './AddToCartButton';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addToCart, removeFromCart, updateQuantity } from '../../../store/slices/cartSlice';
import './BriefProduct.css';

export const BriefProduct: FC<BriefProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  // Get current cart count for this product
  const cartItem = cartItems.find((item: any) => item.id === product.id);
  const cartCount = cartItem ? cartItem.quantity : 0;
  const { price, image, title, description } = product;

  const truncateDescription = (text: string, maxLength = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ₽`;
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
      })
    );
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="picklematch-brief-product">
      <div className="picklematch-brief-product-image-container">
        <img
          src={image}
          alt={title}
          className="picklematch-brief-product-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
          }}
        />
      </div>

      <div className="picklematch-brief-product-content">
        <div className="picklematch-brief-product-header">
          <span className="picklematch-brief-product-price">{formatPrice(price)}</span>
        </div>

        <h3 className="picklematch-brief-product-title">{title}</h3>

        <p className="picklematch-brief-product-description">{truncateDescription(description)}</p>

        <div className="picklematch-brief-product-actions">
          <AddToCartButton value={cartCount} onChange={handleUpdateQuantity} onAdd={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};
