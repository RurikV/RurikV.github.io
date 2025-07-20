/**
 * Data generation utilities for PickleMatch components
 * Functions for creating random products and transactions
 */

import { ProductData, TransactionData } from './types';

// Helper function to generate random ID
const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Helper function to get random element from array
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Sample data for random generation
const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Sports', 'Home', 'Beauty', 'Toys'];

const productTitles = [
  'Smartphone Pro Max',
  'Wireless Headphones',
  'Gaming Laptop',
  'Cotton T-Shirt',
  'Denim Jeans',
  'Running Shoes',
  'Pizza Margherita',
  'Organic Coffee',
  'Mystery Novel',
  'Programming Guide',
  'Football',
  'Yoga Mat',
  'Smart Watch',
  'Bluetooth Speaker',
];

const productDescriptions = [
  'High-quality product with excellent features',
  'Perfect for everyday use and special occasions',
  'Durable and reliable with modern design',
  'Premium materials and craftsmanship',
  'Innovative technology meets style',
  'Comfortable and practical solution',
  'Essential item for your collection',
  'Professional grade quality',
];

const transactionTitles = [
  'Monthly Salary',
  'Freelance Project',
  'Investment Return',
  'Bonus Payment',
  'Grocery Shopping',
  'Rent Payment',
  'Utility Bills',
  'Entertainment',
  'Transportation',
  'Online Purchase',
  'Restaurant Bill',
  'Gas Station',
];

const transactionDescriptions = [
  'Regular monthly income',
  'Additional project work',
  'Investment portfolio return',
  'Performance bonus',
  'Weekly grocery expenses',
  'Monthly rent payment',
  'Electricity and water bills',
  'Movies and entertainment',
  'Public transport costs',
  'Online shopping purchase',
  'Dinner at restaurant',
  'Fuel for vehicle',
];

const imageUrls = [
  'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Product1',
  'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Product2',
  'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Product3',
  'https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=Product4',
  'https://via.placeholder.com/300x200/FFEAA7/000000?text=Product5',
  'https://via.placeholder.com/300x200/DDA0DD/FFFFFF?text=Product6',
  'https://via.placeholder.com/300x200/98D8C8/FFFFFF?text=Product7',
  'https://via.placeholder.com/300x200/F7DC6F/000000?text=Product8',
];

/**
 * Creates a random product that matches PickleMatch ProductData interface
 */
export const createRandomProduct = (): ProductData => {
  const price = Math.floor(Math.random() * 1000) + 10;

  return {
    id: generateRandomId(),
    title: getRandomElement(productTitles),
    description: getRandomElement(productDescriptions),
    price,
    image: getRandomElement(imageUrls),
    category: getRandomElement(categories),
  };
};

/**
 * Creates a random transaction that matches PickleMatch TransactionData interface
 */
export const createRandomTransaction = (): TransactionData => {
  const isIncome = Math.random() > 0.4; // 60% chance of income
  const baseAmount = Math.floor(Math.random() * 5000) + 100;
  const amount = isIncome ? baseAmount : -baseAmount;

  return {
    amount,
    category: getRandomElement(categories),
    title: getRandomElement(transactionTitles),
    description: getRandomElement(transactionDescriptions),
    date: new Date().toISOString(),
  };
};

/**
 * Creates multiple random products
 */
export const createRandomProducts = (count: number): ProductData[] => {
  const products: ProductData[] = [];
  for (let i = 0; i < count; i++) {
    products.push(createRandomProduct());
  }
  return products;
};

/**
 * Creates multiple random transactions
 */
export const createRandomTransactions = (count: number): TransactionData[] => {
  const transactions: TransactionData[] = [];
  for (let i = 0; i < count; i++) {
    transactions.push(createRandomTransaction());
  }
  return transactions;
};

/**
 * Creates a random product with specific category
 */
export const createRandomProductInCategory = (category: string): ProductData => {
  const product = createRandomProduct();
  return {
    ...product,
    category,
  };
};

/**
 * Creates a random transaction with specific amount range
 */
export const createRandomTransactionInRange = (minAmount: number, maxAmount: number): TransactionData => {
  const transaction = createRandomTransaction();
  const isIncome = transaction.amount > 0;
  const amount = Math.floor(Math.random() * (maxAmount - minAmount)) + minAmount;

  return {
    ...transaction,
    amount: isIncome ? amount : -amount,
  };
};
