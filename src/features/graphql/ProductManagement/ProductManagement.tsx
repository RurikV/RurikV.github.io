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

const Input = styledComponents.input`
  padding: 8px 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
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

export const ProductManagement: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

    try {
      console.log('[DEBUG_LOG] Creating product:', { name, price });

      const GRAPHQL_ENDPOINT = 'http://cea3c11a3f62.vps.myjino.ru/graphql';
      const CREATE_PRODUCT_MUTATION = `
        mutation CreateProduct($input: ProductInput!) {
          createProduct(input: $input) {
            id
            name
            price
            createdAt
          }
        }
      `;

      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            input: {
              name: name.trim(),
              price: parseFloat(price),
            },
          },
        }),
      });

      const result = await response.json();
      console.log('[DEBUG_LOG] Create product response:', result);

      if (result.errors) {
        throw new Error(handleGraphQLErrors(result.errors));
      }

      if (result.data?.createProduct) {
        setSuccess(`Product "${result.data.createProduct.name}" created successfully!`);
        setName('');
        setPrice('');
        console.log('[DEBUG_LOG] Product created successfully:', result.data.createProduct);
      } else {
        throw new Error('No product data returned');
      }
    } catch (err) {
      console.error('[DEBUG_LOG] Product creation error:', err);
      setError(`Failed to create product: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>Product Management</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Product'}
        </Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </Container>
  );
};