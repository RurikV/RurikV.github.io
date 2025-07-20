import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import { TransactionData } from '../types';
import { createRandomTransaction } from '../dataGenerator';
import { BriefTransaction } from './BriefTransaction';
import './TransactionList.css';

export interface TransactionListProps {
  initialTransactions?: TransactionData[];
  enableInfiniteScroll?: boolean;
  itemsPerLoad?: number;
  onTransactionClick?: (transaction: TransactionData) => void;
}

export const TransactionList: FC<TransactionListProps> = ({
  initialTransactions = [],
  enableInfiniteScroll = true,
  itemsPerLoad = 8,
  onTransactionClick,
}) => {
  const [transactions, setTransactions] = useState<TransactionData[]>(initialTransactions);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const generateNewTransactions = useCallback((count: number): TransactionData[] => {
    const newTransactions: TransactionData[] = [];
    for (let i = 0; i < count; i++) {
      newTransactions.push(createRandomTransaction());
    }
    return newTransactions;
  }, []);

  const loadMoreTransactions = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newTransactions = generateNewTransactions(itemsPerLoad);
    setTransactions((prevTransactions) => [...prevTransactions, ...newTransactions]);

    // Simulate reaching end of data after 80 transactions
    if (transactions.length + newTransactions.length >= 80) {
      setHasMore(false);
    }

    setLoading(false);
  }, [loading, hasMore, generateNewTransactions, itemsPerLoad, transactions.length]);

  const handleShowMore = () => {
    loadMoreTransactions();
  };

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!enableInfiniteScroll || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hasMore) {
          loadMoreTransactions();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [enableInfiniteScroll, loading, hasMore, loadMoreTransactions]);

  // Initialize with some transactions if empty
  useEffect(() => {
    if (transactions.length === 0) {
      const initialTransactionsToLoad = generateNewTransactions(itemsPerLoad);
      setTransactions(initialTransactionsToLoad);
    }
  }, [transactions.length, generateNewTransactions, itemsPerLoad]);

  const handleTransactionClick = (transaction: TransactionData) => {
    if (onTransactionClick) {
      onTransactionClick(transaction);
    }
  };

  // Calculate totals
  const totalIncome = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="picklematch-transaction-list">
      <div className="picklematch-transaction-list-header">
        <h2 className="picklematch-transaction-list-title">Transactions</h2>
        <div className="picklematch-transaction-list-stats">
          <span className="picklematch-transaction-count">{transactions.length} transactions</span>
          <div className="picklematch-transaction-summary">
            <span className="picklematch-balance positive">Balance: +{balance.toFixed(2)} ₽</span>
            <span className="picklematch-income">Income: +{totalIncome.toFixed(2)} ₽</span>
            <span className="picklematch-expenses">Expenses: -{totalExpenses.toFixed(2)} ₽</span>
          </div>
        </div>
      </div>

      <div className="picklematch-transaction-list-content">
        {transactions.map((transaction, index) => (
          <div
            key={`${transaction.title}-${index}`}
            className="picklematch-transaction-list-item"
            onClick={() => handleTransactionClick(transaction)}
          >
            <BriefTransaction transaction={transaction} />
          </div>
        ))}
      </div>

      {loading && (
        <div className="picklematch-transaction-list-loading">
          <div className="picklematch-loading-spinner"></div>
          <span>Loading more transactions...</span>
        </div>
      )}

      {!enableInfiniteScroll && hasMore && !loading && (
        <div className="picklematch-transaction-list-actions">
          <button className="picklematch-show-more-button" onClick={handleShowMore} disabled={loading}>
            Show More Transactions
          </button>
        </div>
      )}

      {!hasMore && (
        <div className="picklematch-transaction-list-end">
          <span>All transactions loaded</span>
        </div>
      )}

      {/* Intersection observer target */}
      {enableInfiniteScroll && hasMore && <div ref={observerRef} className="picklematch-intersection-target" />}
    </div>
  );
};
