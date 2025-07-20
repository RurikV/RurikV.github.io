import { AccountService } from './AccountService';
import { MockDiscountDatabase } from './MockDiscountDatabase';
import { UserType, ProductType } from './types';

// Demo script to showcase AccountService functionality
async function demonstrateAccountService() {
  console.log('=== AccountService Demo ===\n');

  // Initialize the service with mock database
  const database = new MockDiscountDatabase();
  const accountService = new AccountService(database);

  // 1. Create users of different types
  console.log('1. Creating users...');
  const standardUser = await accountService.createUser('John Standard', UserType.STANDARD);
  const premiumUser = await accountService.createUser('Jane Premium', UserType.PREMIUM);
  const goldUser = await accountService.createUser('Bob Gold', UserType.GOLD);
  const freeUser = await accountService.createUser('Alice Free', UserType.FREE);

  console.log(`Created users:
  - ${standardUser.name} (${standardUser.type}): ${standardUser.id}
  - ${premiumUser.name} (${premiumUser.type}): ${premiumUser.id}
  - ${goldUser.name} (${goldUser.type}): ${goldUser.id}
  - ${freeUser.name} (${freeUser.type}): ${freeUser.id}\n`);

  // 2. Create products of different types
  console.log('2. Creating products...');
  const car = await accountService.createProduct('Tesla Model 3', ProductType.CAR, 50000);
  const toy = await accountService.createProduct('Lego Castle', ProductType.TOY, 200);
  const food = await accountService.createProduct('Premium Steak', ProductType.FOOD, 50);

  console.log(`Created products:
  - ${car.name} (${car.type}): $${car.price}
  - ${toy.name} (${toy.type}): $${toy.price}
  - ${food.name} (${food.type}): $${food.price}\n`);

  // 3. Set general user discounts
  console.log('3. Setting general user discounts...');
  await accountService.setUserDiscount(UserType.STANDARD, 5);
  await accountService.setUserDiscount(UserType.PREMIUM, 10);
  await accountService.setUserDiscount(UserType.GOLD, 15);
  await accountService.setUserDiscount(UserType.FREE, 0);

  console.log(`General discounts set:
  - Standard: 5%
  - Premium: 10%
  - Gold: 15%
  - Free: 0%\n`);

  // 4. Set product-specific discounts
  console.log('4. Setting product-specific discounts...');
  await accountService.setProductUserDiscount(UserType.PREMIUM, ProductType.CAR, 20);
  await accountService.setProductUserDiscount(UserType.GOLD, ProductType.CAR, 25);
  await accountService.setProductUserDiscount(UserType.GOLD, ProductType.TOY, 10);
  await accountService.setProductUserDiscount(UserType.STANDARD, ProductType.FOOD, 3);

  console.log(`Product-specific discounts set:
  - Premium users on Cars: 20%
  - Gold users on Cars: 25%
  - Gold users on Toys: 10%
  - Standard users on Food: 3%\n`);

  // 5. Calculate discounts for different scenarios
  console.log('5. Calculating discounts...\n');

  // Scenario 1: Premium user buying a car (has both general and product-specific discount)
  const premiumCarDiscount = await accountService.calculateDiscount(premiumUser.id, car.id);
  console.log(`Premium user buying Tesla Model 3:
  - Original price: $${premiumCarDiscount.originalPrice}
  - User discount: ${premiumCarDiscount.userDiscount}%
  - Product discount: ${premiumCarDiscount.productDiscount}%
  - Total discount: ${premiumCarDiscount.totalDiscount}%
  - Final price: $${premiumCarDiscount.finalPrice}\n`);

  // Scenario 2: Gold user buying a toy (has both discounts)
  const goldToyDiscount = await accountService.calculateDiscount(goldUser.id, toy.id);
  console.log(`Gold user buying Lego Castle:
  - Original price: $${goldToyDiscount.originalPrice}
  - User discount: ${goldToyDiscount.userDiscount}%
  - Product discount: ${goldToyDiscount.productDiscount}%
  - Total discount: ${goldToyDiscount.totalDiscount}%
  - Final price: $${goldToyDiscount.finalPrice}\n`);

  // Scenario 3: Standard user buying food (has both discounts)
  const standardFoodDiscount = await accountService.calculateDiscount(standardUser.id, food.id);
  console.log(`Standard user buying Premium Steak:
  - Original price: $${standardFoodDiscount.originalPrice}
  - User discount: ${standardFoodDiscount.userDiscount}%
  - Product discount: ${standardFoodDiscount.productDiscount}%
  - Total discount: ${standardFoodDiscount.totalDiscount}%
  - Final price: $${standardFoodDiscount.finalPrice}\n`);

  // Scenario 4: Free user buying a car (no discounts)
  const freeCarDiscount = await accountService.calculateDiscount(freeUser.id, car.id);
  console.log(`Free user buying Tesla Model 3:
  - Original price: $${freeCarDiscount.originalPrice}
  - User discount: ${freeCarDiscount.userDiscount}%
  - Product discount: ${freeCarDiscount.productDiscount}%
  - Total discount: ${freeCarDiscount.totalDiscount}%
  - Final price: $${freeCarDiscount.finalPrice}\n`);

  console.log('=== Demo Complete ===');
}

// Run the demo
if (require.main === module) {
  demonstrateAccountService().catch(console.error);
}

export { demonstrateAccountService };
