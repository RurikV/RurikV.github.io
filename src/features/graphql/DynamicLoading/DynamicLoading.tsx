import React, { useState, useEffect, useRef, useCallback } from 'react';
import styledComponents from 'styled-components';
import { handleGraphQLErrors } from '../types/errors';

const Container = styledComponents.div`
  background: #ffffff;
  border-radius: 0 0 8px 8px;
  padding: 20px;
`;

const Title = styledComponents.h3`
  color: #2c3e50;
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
`;

const Controls = styledComponents.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Button = styledComponents.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  
  &:disabled {
    background: #bdc3c7;
  }
  
  &.active {
    background: #2980b9;
  }
`;

const ItemsList = styledComponents.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
`;

const Item = styledComponents.div`
  padding: 12px;
  border-bottom: 1px solid #f1f2f6;
  display: flex;
  justify-content: between;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styledComponents.div`
  flex: 1;
`;

const ItemName = styledComponents.div`
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
`;

const ItemDetails = styledComponents.div`
  color: #7f8c8d;
  font-size: 12px;
  margin-top: 4px;
`;

const LoadingIndicator = styledComponents.div`
  text-align: center;
  padding: 16px;
  color: #7f8c8d;
  font-size: 14px;
`;

const ErrorMessage = styledComponents.div`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
  text-align: center;
  padding: 8px;
`;

const LoadMoreTrigger = styledComponents.div`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Stats = styledComponents.div`
  background: #f8f9fa;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  padding: 8px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #7f8c8d;
`;

type DataType = 'products' | 'operations';

interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  createdAt: string;
}

interface Operation {
  id: string;
  name: string;
  amount: number;
  type: 'Cost' | 'Profit';
  date: string;
}

type Item = Product | Operation;

const isProduct = (item: Item): item is Product => {
  return 'price' in item;
};

export const DynamicLoading: React.FC = () => {
  const [dataType, setDataType] = useState<DataType>('products');
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadData = useCallback(
    async (pageNum: number, reset = false) => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setError('Please login first to load data');
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        console.log(`[DEBUG_LOG] Loading ${dataType} page ${pageNum}`);

        const GRAPHQL_ENDPOINT = 'http://cea3c11a3f62.vps.myjino.ru/graphql';
        const pageSize = 10;

        let query: string;
        let variables: {
          pagination: {
            pageNumber: number;
            pageSize: number;
          };
          sorting: {
            field: string;
            type: string;
          };
        };

        if (dataType === 'products') {
          query = `
            query GetProducts($pagination: Pagination, $sorting: Sorting) {
              products(pagination: $pagination, sorting: $sorting) {
                id
                name
                price
                oldPrice
                desc
                photo
                createdAt
                updatedAt
                category {
                  id
                  name
                }
              }
            }
          `;
          variables = {
            pagination: {
              pageNumber: pageNum,
              pageSize: pageSize,
            },
            sorting: {
              field: 'createdAt',
              type: 'DESC',
            },
          };
        } else {
          query = `
            query GetOperations($pagination: Pagination, $sorting: Sorting) {
              operations(pagination: $pagination, sorting: $sorting) {
                id
                name
                desc
                amount
                type
                date
                createdAt
                updatedAt
                category {
                  id
                  name
                }
              }
            }
          `;
          variables = {
            pagination: {
              pageNumber: pageNum,
              pageSize: pageSize,
            },
            sorting: {
              field: 'date',
              type: 'DESC',
            },
          };
        }

        const response = await fetch(GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        });

        const result = await response.json();
        console.log(`[DEBUG_LOG] GraphQL response:`, result);

        if (result.errors) {
          setError(`Failed to load ${dataType}: ${handleGraphQLErrors(result.errors)}`);
          return;
        }

        const newItems = dataType === 'products' ? result.data.products : result.data.operations;

        if (reset) {
          setItems(newItems || []);
        } else {
          setItems((prev) => [...prev, ...(newItems || [])]);
        }

        // Check if we have more data (if we got less than pageSize, we're at the end)
        setHasMore((newItems || []).length === pageSize);

        console.log(`[DEBUG_LOG] Loaded ${(newItems || []).length} ${dataType} items for page ${pageNum}`);
      } catch (err) {
        console.error(`[DEBUG_LOG] Error loading ${dataType}:`, err);
        setError(`Failed to load ${dataType}`);
      } finally {
        setIsLoading(false);
      }
    },
    [dataType]
  );

  const handleDataTypeChange = (newType: DataType) => {
    if (newType === dataType) return;

    setDataType(newType);
    setItems([]);
    setPage(1);
    setHasMore(true);
    setError('');
  };

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading) {
          console.log('[DEBUG_LOG] IntersectionObserver triggered - loading more data');
          const nextPage = page + 1;
          setPage(nextPage);
          loadData(nextPage);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, isLoading, page, loadData]);

  // Load initial data
  useEffect(() => {
    loadData(1, true);
  }, [dataType, loadData]);

  const renderItem = (item: Item) => {
    if (isProduct(item)) {
      return (
        <Item key={item.id}>
          <ItemInfo>
            <ItemName>{item.name}</ItemName>
            <ItemDetails>
              Price: ${item.price} | Category: {item.category} | Created:{' '}
              {new Date(item.createdAt).toLocaleDateString()}
            </ItemDetails>
          </ItemInfo>
        </Item>
      );
    } else {
      return (
        <Item key={item.id}>
          <ItemInfo>
            <ItemName>{item.name}</ItemName>
            <ItemDetails>
              Amount: ${item.amount} | Type: {item.type} | Date: {new Date(item.date).toLocaleDateString()}
            </ItemDetails>
          </ItemInfo>
        </Item>
      );
    }
  };

  return (
    <Container>
      <Title>Dynamic Loading</Title>

      <Controls>
        <Button className={dataType === 'products' ? 'active' : ''} onClick={() => handleDataTypeChange('products')}>
          Products
        </Button>
        <Button
          className={dataType === 'operations' ? 'active' : ''}
          onClick={() => handleDataTypeChange('operations')}
        >
          Operations
        </Button>
      </Controls>

      <Stats>
        Loaded: {items.length} {dataType} | Page: {page} | Has More: {hasMore ? 'Yes' : 'No'}
      </Stats>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ItemsList>
        {items.map(renderItem)}

        {hasMore && (
          <LoadMoreTrigger ref={loadMoreRef}>
            {isLoading ? (
              <LoadingIndicator>Loading more {dataType}...</LoadingIndicator>
            ) : (
              <LoadingIndicator>Scroll to load more</LoadingIndicator>
            )}
          </LoadMoreTrigger>
        )}

        {!hasMore && items.length > 0 && <LoadingIndicator>No more {dataType} to load</LoadingIndicator>}
      </ItemsList>
    </Container>
  );
};
