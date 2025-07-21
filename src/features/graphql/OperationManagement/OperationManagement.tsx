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

const Select = styledComponents.select`
  padding: 8px 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
`;

const TextArea = styledComponents.textarea`
  padding: 8px 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  min-height: 60px;
  resize: vertical;
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

type OperationType = 'Cost' | 'Profit';

interface OperationFormData {
  name: string;
  desc: string;
  amount: string;
  type: OperationType;
  date: string;
}

export const OperationManagement: React.FC = () => {
  const [formData, setFormData] = useState<OperationFormData>({
    name: '',
    desc: '',
    amount: '',
    type: 'Cost',
    date: new Date().toISOString().split('T')[0], // Today's date
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (field: keyof OperationFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    setError('');
    setSuccess('');
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

    try {
      console.log('[DEBUG_LOG] Creating operation:', formData);

      const GRAPHQL_ENDPOINT = 'http://cea3c11a3f62.vps.myjino.ru/graphql';
      const CREATE_OPERATION_MUTATION = `
        mutation CreateOperation($input: OperationInput!) {
          createOperation(input: $input) {
            id
            name
            desc
            amount
            type
            date
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
          query: CREATE_OPERATION_MUTATION,
          variables: {
            input: {
              name: formData.name.trim(),
              desc: formData.desc.trim() || undefined,
              amount: parseFloat(formData.amount),
              type: formData.type,
              date: formData.date,
            },
          },
        }),
      });

      const result = await response.json();
      console.log('[DEBUG_LOG] Create operation response:', result);

      if (result.errors) {
        throw new Error(handleGraphQLErrors(result.errors));
      }

      if (result.data?.createOperation) {
        setSuccess(`${result.data.createOperation.type} operation "${result.data.createOperation.name}" created successfully!`);
        setFormData({
          name: '',
          desc: '',
          amount: '',
          type: 'Cost',
          date: new Date().toISOString().split('T')[0],
        });
        console.log('[DEBUG_LOG] Operation created successfully:', result.data.createOperation);
      } else {
        throw new Error('No operation data returned');
      }
    } catch (err) {
      console.error('[DEBUG_LOG] Operation creation error:', err);
      setError(`Failed to create operation: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>Operation Management</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Operation name"
          value={formData.name}
          onChange={handleInputChange('name')}
          required
        />
        
        <TextArea
          placeholder="Description (optional)"
          value={formData.desc}
          onChange={handleInputChange('desc')}
        />
        
        <Input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleInputChange('amount')}
          required
        />
        
        <Select
          value={formData.type}
          onChange={handleInputChange('type')}
          required
        >
          <option value="Cost">Cost (Expense)</option>
          <option value="Profit">Profit (Income)</option>
        </Select>
        
        <Input
          type="date"
          value={formData.date}
          onChange={handleInputChange('date')}
          required
        />
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : `Create ${formData.type}`}
        </Button>
      </Form>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </Container>
  );
};