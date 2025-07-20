import React, { useState, useCallback, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import type { Product, Operation } from '../../homeworks/ts1/3_write';
import { createRandomProduct, createRandomOperation } from '../../homeworks/ts1/3_write';
import { ProductItem } from '../ProductItem/ProductItem';
import { OperationItem } from '../OperationItem/OperationItem';

export interface ItemsListProps {
  initialProducts?: Product[];
  initialOperations?: Operation[];
  className?: string;
  useIntersectionObserver?: boolean;
  itemsPerLoad?: number;
  onItemClick?: (type: 'product' | 'operation', data: Product | Operation) => void;
}

const ItemsListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ItemsListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ItemsListTitle = styled.h2`
  margin: 0;
  color: ${(props) => props.theme.colorTextPrimary};
  font-size: 24px;
  font-weight: 700;
`;

const ItemsListToggle = styled.div`
  display: flex;
  gap: 8px;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${(props) => props.theme.colorBorder};
  border-radius: 4px;
  background-color: ${(props) => (props.$active ? props.theme.colorPrimary : props.theme.colorBgPrimary)};
  color: ${(props) => (props.$active ? 'white' : props.theme.colorTextPrimary)};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: ${(props) => (props.$active ? props.theme.colorPrimaryHover : props.theme.colorBgSecondary)};
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LoadMoreButton = styled.button`
  margin-top: 24px;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colorPrimary};
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: center;

  &:hover {
    background-color: ${(props) => props.theme.colorPrimaryHover};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colorTextSecondary};
    cursor: not-allowed;
  }
`;

const LoadingIndicator = styled.div`
  height: 20px;
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colorTextSecondary};
`;

type ViewMode = 'products' | 'operations' | 'both';

export const ItemsList: React.FC<ItemsListProps> = ({
  initialProducts = [],
  initialOperations = [],
  className,
  useIntersectionObserver = true,
  itemsPerLoad = 5,
  onItemClick,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [operations, setOperations] = useState<Operation[]>(initialOperations);
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [isLoading, setIsLoading] = useState(false);

  const loadingRef = useRef<HTMLDivElement>(null);

  const generateNewItems = useCallback(() => {
    const now = new Date().toISOString();
    const newProducts: Product[] = [];
    const newOperations: Operation[] = [];

    for (let i = 0; i < itemsPerLoad; i++) {
      if (viewMode === 'products' || viewMode === 'both') {
        newProducts.push(createRandomProduct(now));
      }
      if (viewMode === 'operations' || viewMode === 'both') {
        newOperations.push(createRandomOperation(now));
      }
    }

    setProducts((prev) => [...prev, ...newProducts]);
    setOperations((prev) => [...prev, ...newOperations]);
  }, [viewMode, itemsPerLoad]);

  const handleLoadMore = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    generateNewItems();
    setIsLoading(false);
  }, [isLoading, generateNewItems]);

  // IntersectionObserver setup
  useEffect(() => {
    if (!useIntersectionObserver || !loadingRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading) {
          handleLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    observer.observe(loadingRef.current);

    return () => observer.disconnect();
  }, [useIntersectionObserver, isLoading, handleLoadMore]);

  const renderItems = () => {
    const items: Array<{ type: 'product' | 'operation'; data: Product | Operation; key: string }> = [];

    if (viewMode === 'products' || viewMode === 'both') {
      products.forEach((product) => {
        items.push({ type: 'product', data: product, key: `product-${product.id}` });
      });
    }

    if (viewMode === 'operations' || viewMode === 'both') {
      operations.forEach((operation) => {
        items.push({ type: 'operation', data: operation, key: `operation-${operation.id}` });
      });
    }

    // Sort by creation date (newest first)
    items.sort((a, b) => {
      const dateA = new Date(a.data.createdAt).getTime();
      const dateB = new Date(b.data.createdAt).getTime();
      return dateB - dateA;
    });

    return items.map((item) => {
      const handleClick = () => {
        if (onItemClick) {
          onItemClick(item.type, item.data);
        }
      };

      if (item.type === 'product') {
        return <ProductItem key={item.key} product={item.data as Product} onClick={handleClick} />;
      } else {
        return <OperationItem key={item.key} operation={item.data as Operation} onClick={handleClick} />;
      }
    });
  };

  return (
    <ItemsListContainer className={className}>
      <ItemsListHeader>
        <ItemsListTitle>Items List</ItemsListTitle>
        <ItemsListToggle>
          <ToggleButton $active={viewMode === 'products'} onClick={() => setViewMode('products')}>
            Products
          </ToggleButton>
          <ToggleButton $active={viewMode === 'operations'} onClick={() => setViewMode('operations')}>
            Operations
          </ToggleButton>
          <ToggleButton $active={viewMode === 'both'} onClick={() => setViewMode('both')}>
            Both
          </ToggleButton>
        </ItemsListToggle>
      </ItemsListHeader>

      <ItemsContainer>{renderItems()}</ItemsContainer>

      {useIntersectionObserver ? (
        <LoadingIndicator ref={loadingRef}>
          {isLoading ? 'Loading more items...' : 'Scroll to load more'}
        </LoadingIndicator>
      ) : (
        <LoadMoreButton onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Show More'}
        </LoadMoreButton>
      )}
    </ItemsListContainer>
  );
};
