import { IDiscountDatabase, User, Product, UserDiscount, ProductUserDiscount, UserType, ProductType } from './types';

export class MockDiscountDatabase implements IDiscountDatabase {
  private users: Map<string, User> = new Map();
  private products: Map<string, Product> = new Map();
  private userDiscounts: Map<UserType, UserDiscount> = new Map();
  private productUserDiscounts: Map<string, ProductUserDiscount> = new Map();
  private idCounter = 1;

  // User discount operations
  async getUserDiscount(userType: UserType): Promise<UserDiscount | null> {
    return this.userDiscounts.get(userType) || null;
  }

  async setUserDiscount(userType: UserType, discountPercentage: number): Promise<void> {
    this.userDiscounts.set(userType, {
      userType,
      discountPercentage,
    });
  }

  // Product-specific discount operations
  async getProductUserDiscount(userType: UserType, productType: ProductType): Promise<ProductUserDiscount | null> {
    const key = `${userType}-${productType}`;
    return this.productUserDiscounts.get(key) || null;
  }

  async setProductUserDiscount(
    userType: UserType,
    productType: ProductType,
    discountPercentage: number
  ): Promise<void> {
    const key = `${userType}-${productType}`;
    this.productUserDiscounts.set(key, {
      userType,
      productType,
      discountPercentage,
    });
  }

  // User operations
  async getUser(userId: string): Promise<User | null> {
    return this.users.get(userId) || null;
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: this.generateId(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  // Product operations
  async getProduct(productId: string): Promise<Product | null> {
    return this.products.get(productId) || null;
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: this.generateId(),
    };
    this.products.set(newProduct.id, newProduct);
    return newProduct;
  }

  // Helper method to generate unique IDs
  private generateId(): string {
    return `id-${this.idCounter++}`;
  }

  // Helper methods for testing
  clear(): void {
    this.users.clear();
    this.products.clear();
    this.userDiscounts.clear();
    this.productUserDiscounts.clear();
    this.idCounter = 1;
  }

  getUsersCount(): number {
    return this.users.size;
  }

  getProductsCount(): number {
    return this.products.size;
  }
}
