import React, { useState } from 'react';
import { styled } from 'styled-components';
import type { Product, Operation } from '../../homeworks/ts1/3_write';
import { createRandomProduct, createRandomOperation } from '../../homeworks/ts1/3_write';
import { ItemsList } from '../ItemsList/ItemsList';
import { PortalModal } from '../PortalModal/PortalModal';
import { ProductItem } from '../ProductItem/ProductItem';
import { OperationItem } from '../OperationItem/OperationItem';

export interface HomeworkDemoProps {
  className?: string;
}

const HomeworkDemoContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  background-color: ${(props) => props.theme.colorBgPrimary};
`;

const HomeworkDemoHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const HomeworkDemoTitle = styled.h1`
  color: ${(props) => props.theme.colorTextPrimary};
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px 0;
`;

const HomeworkDemoDescription = styled.p`
  color: ${(props) => props.theme.colorTextSecondary};
  font-size: 16px;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const DemoControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const DemoButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colorPrimary};
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colorPrimaryHover};
  }

  &:active {
    background-color: ${(props) => props.theme.colorPrimaryActive};
  }
`;

const ModalContent = styled.div`
  max-width: 500px;
  width: 100%;
`;

const ModalTitle = styled.h2`
  color: ${(props) => props.theme.colorTextPrimary};
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 20px 0;
  padding-right: 40px; // Space for close button
`;

const ClickableItemsList = styled(ItemsList)`
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const HomeworkDemo: React.FC<HomeworkDemoProps> = ({ className }) => {
  const [selectedItem, setSelectedItem] = useState<{ type: 'product' | 'operation'; data: Product | Operation } | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [initialOperations, setInitialOperations] = useState<Operation[]>([]);

  const generateInitialData = () => {
    const now = new Date().toISOString();
    const products: Product[] = [];
    const operations: Operation[] = [];

    // Generate 3 initial products and operations
    for (let i = 0; i < 3; i++) {
      products.push(createRandomProduct(now));
      operations.push(createRandomOperation(now));
    }

    setInitialProducts(products);
    setInitialOperations(operations);
  };

  const handleItemClick = (type: 'product' | 'operation', data: Product | Operation) => {
    setSelectedItem({ type, data });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const showProductModal = () => {
    const product = createRandomProduct(new Date().toISOString());
    setSelectedItem({ type: 'product', data: product });
    setIsModalOpen(true);
  };

  const showOperationModal = () => {
    const operation = createRandomOperation(new Date().toISOString());
    setSelectedItem({ type: 'operation', data: operation });
    setIsModalOpen(true);
  };

  return (
    <HomeworkDemoContainer className={className}>
      <HomeworkDemoHeader>
        <HomeworkDemoTitle>Homework Demo</HomeworkDemoTitle>
        <HomeworkDemoDescription>
          This demo showcases a dynamic list of products and operations with modal functionality. The list supports both
          &quot;Show more&quot; button and IntersectionObserver for infinite scrolling. Click on any item to view it in
          a modal window that uses React portals.
        </HomeworkDemoDescription>
      </HomeworkDemoHeader>

      <DemoControls>
        <DemoButton onClick={generateInitialData}>Generate Initial Data</DemoButton>
        <DemoButton onClick={showProductModal}>Show Product Modal</DemoButton>
        <DemoButton onClick={showOperationModal}>Show Operation Modal</DemoButton>
      </DemoControls>

      <ClickableItemsList
        initialProducts={initialProducts}
        initialOperations={initialOperations}
        useIntersectionObserver={true}
        itemsPerLoad={3}
        onItemClick={handleItemClick}
      />

      <PortalModal visible={isModalOpen} onClose={handleCloseModal}>
        <ModalContent>
          {selectedItem && (
            <>
              <ModalTitle>{selectedItem.type === 'product' ? 'Product Details' : 'Operation Details'}</ModalTitle>
              {selectedItem.type === 'product' ? (
                <ProductItem product={selectedItem.data as Product} />
              ) : (
                <OperationItem operation={selectedItem.data as Operation} />
              )}
            </>
          )}
        </ModalContent>
      </PortalModal>
    </HomeworkDemoContainer>
  );
};
