/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

// Type definitions
export type Category = {
  id: string;
  name: string;
  photo?: string;
};

export type Product = {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};

export type Cost = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Cost';
};

export type Profit = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Profit';
};

export type Operation = Cost | Profit;

// Helper function to generate random ID
const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Helper function to get random element from array
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Sample data for random generation
const categoryNames = ['Electronics', 'Clothing', 'Food', 'Books', 'Sports', 'Home', 'Beauty', 'Toys'];
const productNames = [
  'Smartphone',
  'Laptop',
  'T-Shirt',
  'Jeans',
  'Pizza',
  'Burger',
  'Novel',
  'Textbook',
  'Football',
  'Basketball',
];
const operationNames = [
  'Salary',
  'Bonus',
  'Investment',
  'Groceries',
  'Rent',
  'Utilities',
  'Entertainment',
  'Transport',
];
const photoUrls = [
  'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Product1',
  'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Product2',
  'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Product3',
  'https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=Product4',
  'https://via.placeholder.com/300x200/FFEAA7/000000?text=Product5',
];

// Helper function to create random category
const createRandomCategory = (): Category => {
  return {
    id: generateRandomId(),
    name: getRandomElement(categoryNames),
    photo: Math.random() > 0.5 ? getRandomElement(photoUrls) : undefined,
  };
};

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string): Product => {
  const price = Math.floor(Math.random() * 1000) + 10;
  const hasOldPrice = Math.random() > 0.6;

  return {
    id: generateRandomId(),
    name: getRandomElement(productNames),
    photo: getRandomElement(photoUrls),
    desc: Math.random() > 0.4 ? `Description for ${getRandomElement(productNames)}` : undefined,
    createdAt,
    oldPrice: hasOldPrice ? price + Math.floor(Math.random() * 200) + 50 : undefined,
    price,
    category: createRandomCategory(),
  };
};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
  const isProfit = Math.random() > 0.5;
  const amount = Math.floor(Math.random() * 5000) + 100;
  const name = getRandomElement(operationNames);

  const baseOperation = {
    id: generateRandomId(),
    name,
    desc: Math.random() > 0.5 ? `Description for ${name}` : undefined,
    createdAt,
    amount,
    category: createRandomCategory(),
  };

  if (isProfit) {
    return {
      ...baseOperation,
      type: 'Profit' as const,
    };
  } else {
    return {
      ...baseOperation,
      type: 'Cost' as const,
    };
  }
};
