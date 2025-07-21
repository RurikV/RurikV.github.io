import React, { useState } from 'react';
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

const Form = styledComponents.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ProductRow = styledComponents.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  background: #f8f9fa;
`;

const Input = styledComponents.input`
  padding: 8px 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  flex: 1;
`;

const QuantityInput = styledComponents.input`
  padding: 8px 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  width: 80px;
`;

const Button = styledComponents.button`
  background: #27ae60;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  
  &:disabled {
    background: #bdc3c7;
  }
`;

const RemoveButton = styledComponents.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
`;

const AddButton = styledComponents.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  margin-bottom: 12px;
`;

const ErrorMessage = styledComponents.div`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;

const SuccessMessage = styledComponents.div`
  color: #27ae60;
  font-size: 12px;
  margin-top: 4px;
`;

const OrderSummary = styledComponents.div`
  background: #f8f9fa;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
`;

interface OrderProduct {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

export const OrderCreation: React.FC = () => {
  const [products, setProducts] = useState<OrderProduct[]>([{ id: '', productName: '', quantity: 1, price: 0 }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const addProduct = () => {
    setProducts((prev) => [...prev, { id: '', productName: '', quantity: 1, price: 0 }]);
  };

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: keyof OrderProduct, value: string | number) => {
    setProducts((prev) => prev.map((product, i) => (i === index ? { ...product, [field]: value } : product)));
    setError('');
    setSuccess('');
  };

  const calculateTotal = () => {
    return products
      .reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError('Please login first');
      setIsLoading(false);
      return;
    }

    // Validate products - check for product IDs and quantity
    const validProducts = products.filter((p) => p.id.trim() && p.quantity > 0);
    if (validProducts.length === 0) {
      setError('Please add at least one product with valid ID and quantity');
      setIsLoading(false);
      return;
    }

    try {
      console.log('[DEBUG_LOG] Creating order with products:', validProducts);

      const GRAPHQL_ENDPOINT = 'http://cea3c11a3f62.vps.myjino.ru/graphql';
      const CREATE_ORDER_MUTATION = `
        mutation CreateOrder($input: OrderAddInput!) {
          orders {
            add(input: $input) {
              id
              status
              createdAt
              products {
                _id
                quantity
                product {
                  id
                  name
                  price
                }
              }
            }
          }
        }
      `;

      // Transform products for GraphQL input - use correct ProductInput structure
      const orderProducts = validProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      }));

      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: CREATE_ORDER_MUTATION,
          variables: {
            input: {
              products: orderProducts,
            },
          },
        }),
      });

      const result = await response.json();
      console.log('[DEBUG_LOG] Create order response:', result);

      if (result.errors) {
        const errorMessage = handleGraphQLErrors(result.errors);
        if (errorMessage.includes('User is not authenticated')) {
          setError(
            'Demo Limitation: The server requires valid authentication tokens, but no authentication endpoints are available. This is a server configuration issue - in a real application, you would have working login endpoints.'
          );
        } else {
          setError(`Failed to create order: ${errorMessage}`);
        }
        return;
      }

      if (result.data?.orders?.add) {
        const order = result.data.orders.add;
        setSuccess(
          `Order #${order.id} created successfully with ${order.products.length} products! Status: ${order.status}`
        );
        setProducts([{ id: '', productName: '', quantity: 1, price: 0 }]);
        console.log('[DEBUG_LOG] Order created successfully:', order);
      } else {
        setError('Failed to create order: No order data returned');
      }
    } catch (err) {
      console.error('[DEBUG_LOG] Order creation error:', err);
      setError(`Failed to create order: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>Order Creation</Title>

      <Form onSubmit={handleSubmit}>
        <div>
          <AddButton type="button" onClick={addProduct}>
            + Add Product
          </AddButton>
        </div>

        {products.map((product, index) => (
          <ProductRow key={index}>
            <Input
              type="text"
              placeholder="Product ID"
              value={product.id}
              onChange={(e) => updateProduct(index, 'id', e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Product name (display only)"
              value={product.productName}
              onChange={(e) => updateProduct(index, 'productName', e.target.value)}
            />
            <Input
              type="number"
              step="0.01"
              placeholder="Price (display only)"
              value={product.price || ''}
              onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value) || 0)}
            />
            <QuantityInput
              type="number"
              min="1"
              placeholder="Qty"
              value={product.quantity}
              onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value) || 1)}
              required
            />
            {products.length > 1 && (
              <RemoveButton type="button" onClick={() => removeProduct(index)}>
                Remove
              </RemoveButton>
            )}
          </ProductRow>
        ))}

        <OrderSummary>
          <strong>Order Summary:</strong>
          <br />
          Products: {products.filter((p) => p.id.trim()).length}
          <br />
          Total Amount: ${calculateTotal()}
        </OrderSummary>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Order...' : 'Create Order'}
        </Button>
      </Form>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </Container>
  );
};
