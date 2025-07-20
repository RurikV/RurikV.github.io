import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '../types';
import './Modal.css';

export const Modal: FC<ModalProps> = ({ visible, children, onClose }) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create or get the modal root element
    let modalContainer = document.getElementById('picklematch-modal-root');

    if (!modalContainer) {
      modalContainer = document.createElement('div');
      modalContainer.id = 'picklematch-modal-root';
      document.body.appendChild(modalContainer);
    }

    setModalRoot(modalContainer);

    // Cleanup function to remove modal root when component unmounts
    return () => {
      const existingContainer = document.getElementById('picklematch-modal-root');
      if (existingContainer && existingContainer.children.length === 0) {
        document.body.removeChild(existingContainer);
      }
    };
  }, []);

  useEffect(() => {
    if (visible) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [visible]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && visible && onClose) {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [visible, onClose]);

  if (!visible || !modalRoot) {
    return null;
  }

  const modalContent = (
    <div className="picklematch-modal-overlay" onClick={onClose}>
      <div className="picklematch-modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="picklematch-modal-close" onClick={onClose} type="button" aria-label="Close modal">
          ×
        </button>
        {children}
      </div>
    </div>
  );

  // Use portal to render modal in body
  return createPortal(modalContent, modalRoot);
};
