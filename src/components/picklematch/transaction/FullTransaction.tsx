import React, { FC } from 'react';
import { FullTransactionProps } from '../types';
import './FullTransaction.css';

export const FullTransaction: FC<FullTransactionProps> = ({ transaction, onEdit }) => {
  const { amount, category, title, description, date } = transaction;

  const formatAmount = (amount: number) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}${amount.toFixed(2)} ₽`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="picklematch-full-transaction">
      <div className="picklematch-full-transaction-header">
        <div className="picklematch-full-transaction-main-info">
          <span className={`picklematch-full-transaction-amount ${amount >= 0 ? 'positive' : 'negative'}`}>
            {formatAmount(amount)}
          </span>
          <span className="picklematch-full-transaction-category">{category}</span>
        </div>
        <button className="picklematch-full-transaction-edit" onClick={onEdit} type="button">
          Edit
        </button>
      </div>

      <h2 className="picklematch-full-transaction-title">{title}</h2>

      <p className="picklematch-full-transaction-description">{description}</p>

      <div className="picklematch-full-transaction-date">{formatDate(date)}</div>
    </div>
  );
};
