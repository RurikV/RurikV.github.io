import React, { FC } from 'react';
import { ModalProps } from '../types';
import './Modal.css';

export const Modal: FC<ModalProps> = ({ visible, children, onClose }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="picklematch-modal-overlay" onClick={onClose}>
      <div className="picklematch-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="picklematch-modal-close" onClick={onClose} type="button" aria-label="Close modal">
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
