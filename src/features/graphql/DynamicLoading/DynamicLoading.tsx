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

const RetryButton = styledComponents.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 8px;
  
  &:hover {
    background: #2980b9;
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
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
  category?: {
    id: string;
    name: string;
  };
  createdAt: string;
}

interface Operation {
  id: string;
  name: string;
  amount: number;
  type: 'Cost' | 'Profit';
  date: string;
  category?: {
    id: string;
    name: string;
  };
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
  const [networkError, setNetworkError] = useState(false);
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
      setNetworkError(false);

      try {
        console.log(`[DEBUG_LOG] Loading ${dataType} page ${pageNum}`);

        const GRAPHQL_ENDPOINT = 'http://cea3c11a3f62.vps.myjino.ru/graphql';
        const pageSize = 10;

        let query: string;
        let variables: {
          input: {
            pagination: {
              pageNumber: number;
              pageSize: number;
            };
            sorting: {
              field: string;
              type: string;
            };
          };
        };

        if (dataType === 'products') {
          query = `
            query GetProducts($input: ProductGetManyInput) {
              products {
                getMany(input: $input) {
                  data {
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
                  pagination {
                    pageNumber
                    pageSize
                    total
                  }
                }
              }
            }
          `;
          variables = {
            input: {
              pagination: {
                pageNumber: pageNum,
                pageSize: pageSize,
              },
              sorting: {
                field: 'createdAt',
                type: 'DESC',
              },
            },
          };
        } else {
          query = `
            query GetOperations($input: OperationGetManyInput) {
              operations {
                getMany(input: $input) {
                  data {
                    ... on Cost {
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
                    ... on Profit {
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
                  pagination {
                    pageNumber
                    pageSize
                    total
                  }
                }
              }
            }
          `;
          variables = {
            input: {
              pagination: {
                pageNumber: pageNum,
                pageSize: pageSize,
              },
              sorting: {
                field: 'date',
                type: 'DESC',
              },
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
          const errorMessage = handleGraphQLErrors(result.errors);
          if (errorMessage.includes('User is not authenticated')) {
            setError(
              `Demo Limitation: Cannot load ${dataType} - the server requires valid authentication tokens, but no authentication endpoints are available. This is a server configuration issue.`
            );
          } else {
            setError(`Failed to load ${dataType}: ${errorMessage}`);
          }
          return;
        }

        const responseData =
          dataType === 'products' ? result.data?.products?.getMany : result.data?.operations?.getMany;

        const newItems = responseData?.data || [];
        const paginationInfo = responseData?.pagination;

        if (reset) {
          setItems(newItems);
        } else {
          setItems((prev) => [...prev, ...newItems]);
        }

        // Check if we have more data (if we got less than pageSize, we're at the end)
        setHasMore(newItems.length === pageSize);

        console.log(`[DEBUG_LOG] Loaded ${(newItems || []).length} ${dataType} items for page ${pageNum}`);
      } catch (err) {
        console.error(`[DEBUG_LOG] Error loading ${dataType}:`, err);

        // Handle network errors specifically
        if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
          setError(`Network error: Unable to connect to server. Please check your internet connection and try again.`);
          setNetworkError(true);
          // Stop infinite scroll on network errors
          setHasMore(false);
        } else {
          setError(`Failed to load ${dataType}: ${err instanceof Error ? err.message : 'Unknown error'}`);
          // For other errors, also stop infinite scroll to prevent loops
          setHasMore(false);
        }
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
    setNetworkError(false);
  };

  const handleRetry = () => {
    console.log('[DEBUG_LOG] Retrying data load...');
    setError('');
    setNetworkError(false);
    setHasMore(true);

    // If we have no items, retry from page 1, otherwise retry from current page
    const retryPage = items.length === 0 ? 1 : page;
    loadData(retryPage, items.length === 0);
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

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
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
              Price: ${item.price} | Category: {item.category?.name || 'N/A'} | Created:{' '}
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

      {error && (
        <div>
          <ErrorMessage>{error}</ErrorMessage>
          {networkError && (
            <RetryButton onClick={handleRetry} disabled={isLoading}>
              {isLoading ? 'Retrying...' : 'Retry'}
            </RetryButton>
          )}
        </div>
      )}

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
