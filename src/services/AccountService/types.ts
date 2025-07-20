// User types as specified in requirements
export enum UserType {
  STANDARD = 'Standard',
  PREMIUM = 'Premium',
  GOLD = 'Gold',
  FREE = 'Free',
}

// Product types as specified in requirements
export enum ProductType {
  CAR = 'Car',
  TOY = 'Toy',
  FOOD = 'Food',
}

// User entity
export interface User {
  id: string;
  name: string;
  type: UserType;
}

// Product entity
export interface Product {
  id: string;
  name: string;
  type: ProductType;
  price: number;
}

// General discount for user types (stored in database)
export interface UserDiscount {
  userType: UserType;
  discountPercentage: number;
}

// Specific discount for product type and user type combination
export interface ProductUserDiscount {
  userType: UserType;
  productType: ProductType;
  discountPercentage: number;
}

// Discount calculation result
export interface DiscountResult {
  originalPrice: number;
  userDiscount: number;
  productDiscount: number;
  totalDiscount: number;
  finalPrice: number;
}

// Database interface for mocking
export interface IDiscountDatabase {
  // User discount operations
  getUserDiscount(userType: UserType): Promise<UserDiscount | null>;
  setUserDiscount(userType: UserType, discountPercentage: number): Promise<void>;

  // Product-specific discount operations
  getProductUserDiscount(userType: UserType, productType: ProductType): Promise<ProductUserDiscount | null>;
  setProductUserDiscount(userType: UserType, productType: ProductType, discountPercentage: number): Promise<void>;

  // User operations
  getUser(userId: string): Promise<User | null>;
  createUser(user: Omit<User, 'id'>): Promise<User>;

  // Product operations
  getProduct(productId: string): Promise<Product | null>;
  createProduct(product: Omit<Product, 'id'>): Promise<Product>;
}

// AccountService interface
export interface IAccountService {
  // Discount calculation
  calculateDiscount(userId: string, productId: string): Promise<DiscountResult>;

  // User management
  createUser(name: string, type: UserType): Promise<User>;
  getUser(userId: string): Promise<User | null>;

  // Product management
  createProduct(name: string, type: ProductType, price: number): Promise<Product>;
  getProduct(productId: string): Promise<Product | null>;

  // Discount management
  setUserDiscount(userType: UserType, discountPercentage: number): Promise<void>;
  setProductUserDiscount(userType: UserType, productType: ProductType, discountPercentage: number): Promise<void>;
  getUserDiscount(userType: UserType): Promise<number>;
  getProductUserDiscount(userType: UserType, productType: ProductType): Promise<number>;
}
