# AccountService Implementation

### Product Requirements
- ✅ **4 User Types**: Standard, Premium, Gold, Free
- ✅ **3 Product Types**: Car, Toy, Food
- ✅ **General User Discounts**: Each user type can have a general discount stored in database
- ✅ **Product-Specific Discounts**: Specific discounts for user-product type combinations
- ✅ **Discount Summation**: When both user and product discounts exist, they are summed together
- ✅ **Discount Capping**: Total discounts are capped at 100% maximum

### Technical Implementation

#### File Structure
```
src/services/AccountService/
├── types.ts                    # TypeScript interfaces and enums
├── MockDiscountDatabase.ts     # Mock database implementation for testing
├── AccountService.ts           # Main service implementation
├── AccountService.test.ts      # Comprehensive test suite (26 tests)
├── demo.ts                     # Demonstration script
└── README.md                   # This documentation
```

#### Key Components

**1. Types and Interfaces (`types.ts`)**
- `UserType` enum: Standard, Premium, Gold, Free
- `ProductType` enum: Car, Toy, Food
- `User`, `Product` interfaces for entities
- `UserDiscount`, `ProductUserDiscount` for discount storage
- `DiscountResult` for calculation results
- `IDiscountDatabase` interface for database abstraction
- `IAccountService` interface for service contract

**2. Mock Database (`MockDiscountDatabase.ts`)**
- In-memory implementation of `IDiscountDatabase`
- Uses Maps for efficient storage and retrieval
- Supports all CRUD operations for users, products, and discounts
- Includes helper methods for testing

**3. Account Service (`AccountService.ts`)**
- Implements `IAccountService` interface
- Handles user and product management
- Manages discount settings with validation
- Calculates final discounts with proper summation and capping
- Includes comprehensive error handling

## Features

### User Management
- Create users with name and type
- Retrieve users by ID
- Support for all 4 user types (Standard, Premium, Gold, Free)

### Product Management
- Create products with name, type, and price
- Retrieve products by ID
- Support for all 3 product types (Car, Toy, Food)

### Discount Management
- Set general discounts for user types
- Set product-specific discounts for user-product combinations
- Retrieve discount values
- Automatic validation (negative values → 0, values > 100% → 100%)

### Discount Calculation
- Calculate final price with applied discounts
- Sum user and product discounts when both exist
- Cap total discount at 100% maximum
- Return detailed breakdown of discount calculation
- Handle edge cases (non-existent users/products)

## Test Coverage

The implementation includes 26 comprehensive tests covering:

### User Management Tests (3 tests)
- User creation with correct properties
- User retrieval by ID
- Handling non-existent users

### Product Management Tests (3 tests)
- Product creation with correct properties
- Product retrieval by ID
- Handling non-existent products

### General User Discounts Tests (5 tests)
- Setting and getting discounts for all user types
- Default behavior (0% for unset discounts)

### Product-Specific Discounts Tests (4 tests)
- Setting and getting product-specific discounts
- Different user-product combinations
- Default behavior for unset combinations

### Discount Calculation Tests (6 tests)
- User-only discounts
- Product-only discounts
- Combined discount summation
- No discount scenarios
- Different user type handling
- Different product type handling

### Edge Cases and Error Handling Tests (5 tests)
- Non-existent user error handling
- Non-existent product error handling
- Negative discount value handling
- Discount values over 100% handling
- Combined discounts over 100% handling

## Usage Example

```typescript
import { AccountService } from './AccountService';
import { MockDiscountDatabase } from './MockDiscountDatabase';
import { UserType, ProductType } from './types';

// Initialize service
const database = new MockDiscountDatabase();
const accountService = new AccountService(database);

// Create users and products
const premiumUser = await accountService.createUser('John Doe', UserType.PREMIUM);
const car = await accountService.createProduct('Tesla Model 3', ProductType.CAR, 50000);

// Set discounts
await accountService.setUserDiscount(UserType.PREMIUM, 10); // 10% for Premium users
await accountService.setProductUserDiscount(UserType.PREMIUM, ProductType.CAR, 20); // 20% for Premium users on Cars

// Calculate final discount
const result = await accountService.calculateDiscount(premiumUser.id, car.id);
console.log(result);
// Output:
// {
//   originalPrice: 50000,
//   userDiscount: 10,
//   productDiscount: 20,
//   totalDiscount: 30,
//   finalPrice: 35000
// }
```

## Running Tests

```bash
# Run all AccountService tests
npm test -- --testPathPattern="AccountService.test.ts"

# Run demo script
npx ts-node src/services/AccountService/demo.ts
```

## Architecture Benefits

1. **Separation of Concerns**: Clear separation between service logic and data access
2. **Dependency Injection**: Database is injected, allowing for easy testing and different implementations
3. **Type Safety**: Full TypeScript support with comprehensive interfaces
4. **Testability**: Mock database allows for isolated unit testing
5. **Extensibility**: Easy to add new user types, product types, or discount rules
6. **Error Handling**: Comprehensive error handling for edge cases
7. **Validation**: Input validation prevents invalid discount values
