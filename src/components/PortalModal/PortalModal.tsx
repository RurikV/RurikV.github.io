import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { styled } from 'styled-components';

export interface PortalModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.colorBgPrimary};
  border-radius: 8px;
  padding: 24px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border: 1px solid ${(props) => props.theme.colorBorder};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => props.theme.colorTextSecondary};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colorBgSecondary};
    color: ${(props) => props.theme.colorTextPrimary};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.colorPrimary};
    outline-offset: 2px;
  }
`;

export const PortalModal: React.FC<PortalModalProps> = ({ visible, children, onClose, className }) => {
  const modalRoot = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create modal root element if it doesn't exist
    let existingModalRoot = document.getElementById('modal-root') as HTMLDivElement;
    
    if (!existingModalRoot) {
      existingModalRoot = document.createElement('div');
      existingModalRoot.id = 'modal-root';
      document.body.appendChild(existingModalRoot);
    }
    
    modalRoot.current = existingModalRoot;

    // Cleanup function to remove modal root if no modals are using it
    return () => {
      const modalRootElement = document.getElementById('modal-root');
      if (modalRootElement && modalRootElement.children.length === 0) {
        document.body.removeChild(modalRootElement);
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

  if (!visible || !modalRoot.current) {
    return null;
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  const modalContent = (
    <ModalOverlay onClick={handleOverlayClick} className={className}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {onClose && (
          <CloseButton onClick={onClose} type="button" aria-label="Close modal">
            ×
          </CloseButton>
        )}
        {children}
      </ModalContent>
    </ModalOverlay>
  );

  return createPortal(modalContent, modalRoot.current);
};