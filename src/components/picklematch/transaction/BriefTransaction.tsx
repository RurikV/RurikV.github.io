import React, { FC } from 'react';
import { BriefTransactionProps } from '../types';
import './BriefTransaction.css';

export const BriefTransaction: FC<BriefTransactionProps> = ({ transaction }) => {
  const { amount, category, title, description } = transaction;

  const truncateDescription = (text: string, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatAmount = (amount: number) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}${amount.toFixed(2)} ₽`;
  };

  return (
    <div className="picklematch-brief-transaction">
      <div className="picklematch-brief-transaction-header">
        <span className={`picklematch-brief-transaction-amount ${amount >= 0 ? 'positive' : 'negative'}`}>
          {formatAmount(amount)}
        </span>
        <span className="picklematch-brief-transaction-category">{category}</span>
      </div>
      <h3 className="picklematch-brief-transaction-title">{title}</h3>
      <p className="picklematch-brief-transaction-description">{truncateDescription(description)}</p>
    </div>
  );
};
