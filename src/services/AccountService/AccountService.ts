import { IAccountService, IDiscountDatabase, User, Product, UserType, ProductType, DiscountResult } from './types';

export class AccountService implements IAccountService {
  constructor(private database: IDiscountDatabase) {}

  // User management
  async createUser(name: string, type: UserType): Promise<User> {
    return this.database.createUser({ name, type });
  }

  async getUser(userId: string): Promise<User | null> {
    return this.database.getUser(userId);
  }

  // Product management
  async createProduct(name: string, type: ProductType, price: number): Promise<Product> {
    return this.database.createProduct({ name, type, price });
  }

  async getProduct(productId: string): Promise<Product | null> {
    return this.database.getProduct(productId);
  }

  // Discount management
  async setUserDiscount(userType: UserType, discountPercentage: number): Promise<void> {
    // Normalize discount percentage (handle negative values and cap at 100%)
    const normalizedDiscount = Math.max(0, Math.min(100, discountPercentage));
    await this.database.setUserDiscount(userType, normalizedDiscount);
  }

  async setProductUserDiscount(
    userType: UserType,
    productType: ProductType,
    discountPercentage: number
  ): Promise<void> {
    // Normalize discount percentage (handle negative values and cap at 100%)
    const normalizedDiscount = Math.max(0, Math.min(100, discountPercentage));
    await this.database.setProductUserDiscount(userType, productType, normalizedDiscount);
  }

  async getUserDiscount(userType: UserType): Promise<number> {
    const userDiscount = await this.database.getUserDiscount(userType);
    return userDiscount ? userDiscount.discountPercentage : 0;
  }

  async getProductUserDiscount(userType: UserType, productType: ProductType): Promise<number> {
    const productUserDiscount = await this.database.getProductUserDiscount(userType, productType);
    return productUserDiscount ? productUserDiscount.discountPercentage : 0;
  }

  // Discount calculation
  async calculateDiscount(userId: string, productId: string): Promise<DiscountResult> {
    // Get user and product
    const user = await this.database.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const product = await this.database.getProduct(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Get discounts
    const userDiscount = await this.getUserDiscount(user.type);
    const productDiscount = await this.getProductUserDiscount(user.type, product.type);

    // Calculate total discount (cap at 100%)
    const totalDiscount = Math.min(100, userDiscount + productDiscount);

    // Calculate final price
    const discountAmount = (product.price * totalDiscount) / 100;
    const finalPrice = product.price - discountAmount;

    return {
      originalPrice: product.price,
      userDiscount,
      productDiscount,
      totalDiscount,
      finalPrice: Math.max(0, finalPrice), // Ensure final price is not negative
    };
  }
}
