import React, { FC } from 'react';
import { AddToCartButtonProps } from '../types';
import './AddToCartButton.css';

export const AddToCartButton: FC<AddToCartButtonProps> = ({ count, onIncrease, onDecrease, onAdd }) => {
  if (count === 0) {
    return (
      <button className="picklematch-add-to-cart-button" onClick={onAdd} type="button">
        Add to Cart
      </button>
    );
  }

  return (
    <div className="picklematch-cart-counter">
      <button
        className="picklematch-cart-counter-button decrease"
        onClick={onDecrease}
        type="button"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="picklematch-cart-counter-value">{count}</span>
      <button
        className="picklematch-cart-counter-button increase"
        onClick={onIncrease}
        type="button"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};
