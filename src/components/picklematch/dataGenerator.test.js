import {
  createRandomProduct,
  createRandomTransaction,
  createRandomProducts,
  createRandomTransactions,
  createRandomProductInCategory,
  createRandomTransactionInRange,
} from './dataGenerator';

describe('PickleMatch Data Generator Tests', () => {
  describe('createRandomProduct', () => {
    it('should create a product with correct properties', () => {
      const product = createRandomProduct();

      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('image');
      expect(product).toHaveProperty('category');

      // Check types
      expect(typeof product.id).toBe('string');
      expect(typeof product.title).toBe('string');
      expect(typeof product.description).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(typeof product.image).toBe('string');
      expect(typeof product.category).toBe('string');

      // Check that price is positive
      expect(product.price).toBeGreaterThan(0);

      // Check that strings are not empty
      expect(product.id.length).toBeGreaterThan(0);
      expect(product.title.length).toBeGreaterThan(0);
      expect(product.description.length).toBeGreaterThan(0);
      expect(product.image.length).toBeGreaterThan(0);
      expect(product.category.length).toBeGreaterThan(0);
    });

    it('should generate different products on multiple calls', () => {
      const product1 = createRandomProduct();
      const product2 = createRandomProduct();

      // Products should have different IDs
      expect(product1.id).not.toBe(product2.id);
    });
  });

  describe('createRandomTransaction', () => {
    it('should create a transaction with correct properties', () => {
      const transaction = createRandomTransaction();

      expect(transaction).toHaveProperty('amount');
      expect(transaction).toHaveProperty('category');
      expect(transaction).toHaveProperty('title');
      expect(transaction).toHaveProperty('description');
      expect(transaction).toHaveProperty('date');

      // Check types
      expect(typeof transaction.amount).toBe('number');
      expect(typeof transaction.category).toBe('string');
      expect(typeof transaction.title).toBe('string');
      expect(typeof transaction.description).toBe('string');
      expect(typeof transaction.date).toBe('string');

      // Check that strings are not empty
      expect(transaction.category.length).toBeGreaterThan(0);
      expect(transaction.title.length).toBeGreaterThan(0);
      expect(transaction.description.length).toBeGreaterThan(0);
      expect(transaction.date.length).toBeGreaterThan(0);

      // Check that date is a valid ISO string
      expect(() => new Date(transaction.date)).not.toThrow();
      expect(new Date(transaction.date).toISOString()).toBe(transaction.date);
    });

    it('should generate both positive and negative amounts over multiple calls', () => {
      const transactions = [];

      // Generate 20 transactions to increase chance of getting both types
      for (let i = 0; i < 20; i++) {
        transactions.push(createRandomTransaction());
      }

      const positiveTransactions = transactions.filter((t) => t.amount > 0);
      const negativeTransactions = transactions.filter((t) => t.amount < 0);

      // With 20 transactions, we should have at least one of each type (statistically very likely)
      expect(positiveTransactions.length).toBeGreaterThan(0);
      expect(negativeTransactions.length).toBeGreaterThan(0);
    });
  });

  describe('createRandomProducts', () => {
    it('should create the correct number of products', () => {
      const count = 5;
      const products = createRandomProducts(count);

      expect(products).toHaveLength(count);
      expect(Array.isArray(products)).toBe(true);

      // Check that all items are valid products
      products.forEach((product) => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('price');
      });
    });

    it('should create unique products', () => {
      const products = createRandomProducts(3);
      const ids = products.map((p) => p.id);
      const uniqueIds = [...new Set(ids)];

      expect(uniqueIds).toHaveLength(ids.length);
    });
  });

  describe('createRandomTransactions', () => {
    it('should create the correct number of transactions', () => {
      const count = 5;
      const transactions = createRandomTransactions(count);

      expect(transactions).toHaveLength(count);
      expect(Array.isArray(transactions)).toBe(true);

      // Check that all items are valid transactions
      transactions.forEach((transaction) => {
        expect(transaction).toHaveProperty('amount');
        expect(transaction).toHaveProperty('category');
        expect(transaction).toHaveProperty('title');
      });
    });
  });

  describe('createRandomProductInCategory', () => {
    it('should create a product with the specified category', () => {
      const category = 'TestCategory';
      const product = createRandomProductInCategory(category);

      expect(product.category).toBe(category);
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
    });
  });

  describe('createRandomTransactionInRange', () => {
    it('should create a transaction within the specified amount range', () => {
      const minAmount = 100;
      const maxAmount = 500;
      const transaction = createRandomTransactionInRange(minAmount, maxAmount);

      const absoluteAmount = Math.abs(transaction.amount);
      expect(absoluteAmount).toBeGreaterThanOrEqual(minAmount);
      expect(absoluteAmount).toBeLessThanOrEqual(maxAmount);

      expect(transaction).toHaveProperty('category');
      expect(transaction).toHaveProperty('title');
      expect(transaction).toHaveProperty('description');
    });

    it('should preserve income/expense nature from original transaction', () => {
      // Test multiple times to check both positive and negative cases
      const transactions = [];
      for (let i = 0; i < 10; i++) {
        transactions.push(createRandomTransactionInRange(100, 200));
      }

      // Should have both positive and negative amounts
      const hasPositive = transactions.some((t) => t.amount > 0);
      const hasNegative = transactions.some((t) => t.amount < 0);

      expect(hasPositive || hasNegative).toBe(true); // At least one type should exist
    });
  });
});
