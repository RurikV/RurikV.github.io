import React from 'react';
import { styled } from 'styled-components';
import type { Operation } from '../../homeworks/ts1/3_write';

export interface OperationItemProps {
  operation: Operation;
  className?: string;
  onClick?: () => void;
}

const OperationItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colorBorder};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: ${(props) => props.theme.colorBgPrimary};
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const OperationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const OperationName = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colorTextPrimary};
  font-size: 18px;
  font-weight: 600;
`;

const OperationAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const OperationAmount = styled.span<{ $isProfit: boolean }>`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => (props.$isProfit ? '#28a745' : '#dc3545')};
`;

const OperationType = styled.span<{ $isProfit: boolean }>`
  font-size: 12px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 8px;
  background-color: ${(props) => (props.$isProfit ? '#28a745' : '#dc3545')};
  color: white;
  margin-bottom: 4px;
`;

const OperationDescription = styled.p`
  color: ${(props) => props.theme.colorTextSecondary};
  font-size: 14px;
  line-height: 1.4;
  margin: 8px 0;
`;

const OperationMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${(props) => props.theme.colorBorder};
`;

const OperationCategory = styled.span`
  background-color: ${(props) => props.theme.colorPrimary};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

const OperationDate = styled.span`
  color: ${(props) => props.theme.colorTextSecondary};
  font-size: 12px;
`;

export const OperationItem: React.FC<OperationItemProps> = ({ operation, className, onClick }) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const isProfit = operation.type === 'Profit';
  const amountPrefix = isProfit ? '+' : '-';

  return (
    <OperationItemContainer className={className} onClick={onClick}>
      <OperationHeader>
        <OperationName>{operation.name}</OperationName>
        <OperationAmountContainer>
          <OperationType $isProfit={isProfit}>{operation.type}</OperationType>
          <OperationAmount $isProfit={isProfit}>
            {amountPrefix}${operation.amount}
          </OperationAmount>
        </OperationAmountContainer>
      </OperationHeader>

      {operation.desc && <OperationDescription>{operation.desc}</OperationDescription>}

      <OperationMeta>
        <OperationCategory>{operation.category.name}</OperationCategory>
        <OperationDate>{formatDate(operation.createdAt)}</OperationDate>
      </OperationMeta>
    </OperationItemContainer>
  );
};
