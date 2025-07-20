import { AccountService } from './AccountService';
import { MockDiscountDatabase } from './MockDiscountDatabase';
import { UserType, ProductType, User, Product, DiscountResult } from './types';

describe('AccountService', () => {
  let accountService: AccountService;
  let mockDatabase: MockDiscountDatabase;

  beforeEach(() => {
    mockDatabase = new MockDiscountDatabase();
    accountService = new AccountService(mockDatabase);
  });

  describe('User Management', () => {
    it('should create a user with correct properties', async () => {
      const user = await accountService.createUser('John Doe', UserType.PREMIUM);

      expect(user).toBeDefined();
      expect(user.name).toBe('John Doe');
      expect(user.type).toBe(UserType.PREMIUM);
      expect(user.id).toBeDefined();
    });

    it('should retrieve a user by id', async () => {
      const createdUser = await accountService.createUser('Jane Smith', UserType.GOLD);
      const retrievedUser = await accountService.getUser(createdUser.id);

      expect(retrievedUser).toEqual(createdUser);
    });

    it('should return null for non-existent user', async () => {
      const user = await accountService.getUser('non-existent-id');
      expect(user).toBeNull();
    });
  });

  describe('Product Management', () => {
    it('should create a product with correct properties', async () => {
      const product = await accountService.createProduct('Tesla Model 3', ProductType.CAR, 50000);

      expect(product).toBeDefined();
      expect(product.name).toBe('Tesla Model 3');
      expect(product.type).toBe(ProductType.CAR);
      expect(product.price).toBe(50000);
      expect(product.id).toBeDefined();
    });

    it('should retrieve a product by id', async () => {
      const createdProduct = await accountService.createProduct('Lego Set', ProductType.TOY, 100);
      const retrievedProduct = await accountService.getProduct(createdProduct.id);

      expect(retrievedProduct).toEqual(createdProduct);
    });

    it('should return null for non-existent product', async () => {
      const product = await accountService.getProduct('non-existent-id');
      expect(product).toBeNull();
    });
  });

  describe('General User Discounts', () => {
    it('should set and get user discount for Standard users', async () => {
      await accountService.setUserDiscount(UserType.STANDARD, 5);
      const discount = await accountService.getUserDiscount(UserType.STANDARD);

      expect(discount).toBe(5);
    });

    it('should set and get user discount for Premium users', async () => {
      await accountService.setUserDiscount(UserType.PREMIUM, 10);
      const discount = await accountService.getUserDiscount(UserType.PREMIUM);

      expect(discount).toBe(10);
    });

    it('should set and get user discount for Gold users', async () => {
      await accountService.setUserDiscount(UserType.GOLD, 15);
      const discount = await accountService.getUserDiscount(UserType.GOLD);

      expect(discount).toBe(15);
    });

    it('should set and get user discount for Free users', async () => {
      await accountService.setUserDiscount(UserType.FREE, 0);
      const discount = await accountService.getUserDiscount(UserType.FREE);

      expect(discount).toBe(0);
    });

    it('should return 0 for user types without set discounts', async () => {
      const discount = await accountService.getUserDiscount(UserType.STANDARD);
      expect(discount).toBe(0);
    });
  });

  describe('Product-Specific User Discounts', () => {
    it('should set and get product-specific discount for Premium users on Cars', async () => {
      await accountService.setProductUserDiscount(UserType.PREMIUM, ProductType.CAR, 20);
      const discount = await accountService.getProductUserDiscount(UserType.PREMIUM, ProductType.CAR);

      expect(discount).toBe(20);
    });

    it('should set and get product-specific discount for Gold users on Toys', async () => {
      await accountService.setProductUserDiscount(UserType.GOLD, ProductType.TOY, 25);
      const discount = await accountService.getProductUserDiscount(UserType.GOLD, ProductType.TOY);

      expect(discount).toBe(25);
    });

    it('should set and get product-specific discount for Standard users on Food', async () => {
      await accountService.setProductUserDiscount(UserType.STANDARD, ProductType.FOOD, 3);
      const discount = await accountService.getProductUserDiscount(UserType.STANDARD, ProductType.FOOD);

      expect(discount).toBe(3);
    });

    it('should return 0 for product-user combinations without set discounts', async () => {
      const discount = await accountService.getProductUserDiscount(UserType.FREE, ProductType.CAR);
      expect(discount).toBe(0);
    });
  });

  describe('Discount Calculation', () => {
    let user: User;
    let product: Product;

    beforeEach(async () => {
      user = await accountService.createUser('Test User', UserType.PREMIUM);
      product = await accountService.createProduct('Test Car', ProductType.CAR, 1000);
    });

    it('should calculate discount with only user discount', async () => {
      // Set user discount for Premium users
      await accountService.setUserDiscount(UserType.PREMIUM, 10);

      const result = await accountService.calculateDiscount(user.id, product.id);

      expect(result.originalPrice).toBe(1000);
      expect(result.userDiscount).toBe(10);
      expect(result.productDiscount).toBe(0);
      expect(result.totalDiscount).toBe(10);
      expect(result.finalPrice).toBe(900);
    });

    it('should calculate discount with only product-specific discount', async () => {
      // Set product-specific discount for Premium users on Cars
      await accountService.setProductUserDiscount(UserType.PREMIUM, ProductType.CAR, 15);

      const result = await accountService.calculateDiscount(user.id, product.id);

      expect(result.originalPrice).toBe(1000);
      expect(result.userDiscount).toBe(0);
      expect(result.productDiscount).toBe(15);
      expect(result.totalDiscount).toBe(15);
      expect(result.finalPrice).toBe(850);
    });

    it('should sum user and product discounts when both exist', async () => {
      // Set both user discount and product-specific discount
      await accountService.setUserDiscount(UserType.PREMIUM, 10);
      await accountService.setProductUserDiscount(UserType.PREMIUM, ProductType.CAR, 15);

      const result = await accountService.calculateDiscount(user.id, product.id);

      expect(result.originalPrice).toBe(1000);
      expect(result.userDiscount).toBe(10);
      expect(result.productDiscount).toBe(15);
      expect(result.totalDiscount).toBe(25);
      expect(result.finalPrice).toBe(750);
    });

    it('should calculate no discount when none are set', async () => {
      const result = await accountService.calculateDiscount(user.id, product.id);

      expect(result.originalPrice).toBe(1000);
      expect(result.userDiscount).toBe(0);
      expect(result.productDiscount).toBe(0);
      expect(result.totalDiscount).toBe(0);
      expect(result.finalPrice).toBe(1000);
    });

    it('should handle different user types correctly', async () => {
      const goldUser = await accountService.createUser('Gold User', UserType.GOLD);

      // Set different discounts for different user types
      await accountService.setUserDiscount(UserType.PREMIUM, 10);
      await accountService.setUserDiscount(UserType.GOLD, 20);

      const premiumResult = await accountService.calculateDiscount(user.id, product.id);
      const goldResult = await accountService.calculateDiscount(goldUser.id, product.id);

      expect(premiumResult.userDiscount).toBe(10);
      expect(goldResult.userDiscount).toBe(20);
    });

    it('should handle different product types correctly', async () => {
      const toyProduct = await accountService.createProduct('Test Toy', ProductType.TOY, 500);

      // Set different product-specific discounts
      await accountService.setProductUserDiscount(UserType.PREMIUM, ProductType.CAR, 15);
      await accountService.setProductUserDiscount(UserType.PREMIUM, ProductType.TOY, 5);

      const carResult = await accountService.calculateDiscount(user.id, product.id);
      const toyResult = await accountService.calculateDiscount(user.id, toyProduct.id);

      expect(carResult.productDiscount).toBe(15);
      expect(toyResult.productDiscount).toBe(5);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should throw error when calculating discount for non-existent user', async () => {
      const product = await accountService.createProduct('Test Product', ProductType.CAR, 1000);

      await expect(accountService.calculateDiscount('non-existent-user', product.id)).rejects.toThrow('User not found');
    });

    it('should throw error when calculating discount for non-existent product', async () => {
      const user = await accountService.createUser('Test User', UserType.PREMIUM);

      await expect(accountService.calculateDiscount(user.id, 'non-existent-product')).rejects.toThrow(
        'Product not found'
      );
    });

    it('should handle negative discount values by treating them as 0', async () => {
      const user = await accountService.createUser('Test User', UserType.PREMIUM);
      const product = await accountService.createProduct('Test Product', ProductType.CAR, 1000);

      await accountService.setUserDiscount(UserType.PREMIUM, -5);

      const result = await accountService.calculateDiscount(user.id, product.id);
      expect(result.userDiscount).toBe(0);
      expect(result.totalDiscount).toBe(0);
      expect(result.finalPrice).toBe(1000);
    });

    it('should handle discount values over 100% by capping at 100%', async () => {
      const user = await accountService.createUser('Test User', UserType.PREMIUM);
      const product = await accountService.createProduct('Test Product', ProductType.CAR, 1000);

      await accountService.setUserDiscount(UserType.PREMIUM, 150);

      const result = await accountService.calculateDiscount(user.id, product.id);
      expect(result.userDiscount).toBe(100);
      expect(result.totalDiscount).toBe(100);
      expect(result.finalPrice).toBe(0);
    });

    it('should handle combined discounts over 100% by capping total at 100%', async () => {
      const user = await accountService.createUser('Test User', UserType.PREMIUM);
      const product = await accountService.createProduct('Test Product', ProductType.CAR, 1000);

      await accountService.setUserDiscount(UserType.PREMIUM, 60);
      await accountService.setProductUserDiscount(UserType.PREMIUM, ProductType.CAR, 50);

      const result = await accountService.calculateDiscount(user.id, product.id);
      expect(result.userDiscount).toBe(60);
      expect(result.productDiscount).toBe(50);
      expect(result.totalDiscount).toBe(100); // Capped at 100%
      expect(result.finalPrice).toBe(0);
    });
  });
});
