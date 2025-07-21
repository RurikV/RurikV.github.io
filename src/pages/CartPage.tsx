import React, { FC, useState } from 'react';
import { styled } from 'styled-components';
import { Court } from '../components/picklematch/CourtBookingApp';
import { CroppedText } from '../components/picklematch/CroppedText';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  color: ${(props) => props.theme.colorTextPrimary};
  margin-bottom: 20px;
  text-align: center;
`;

const CartSection = styled.div`
  background: ${(props) => props.theme.colorBgSecondary};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const CartGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CartItem = styled.div`
  background: ${(props) => props.theme.colorBgPrimary};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadow};
`;

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemName = styled.h3`
  color: ${(props) => props.theme.colorTextPrimary};
  margin-bottom: 4px;
  font-size: 18px;
`;

const CartItemLocation = styled.p`
  color: ${(props) => props.theme.colorTextSecondary};
  margin-bottom: 8px;
  font-size: 14px;
`;

const CartItemDetails = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 8px;
`;

const GameTags = styled.div`
  display: flex;
  gap: 4px;
`;

const GameTag = styled.span`
  background: ${(props) => props.theme.colorPrimary};
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
`;

const CartItemPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const PriceText = styled.span`
  color: ${(props) => props.theme.colorTextPrimary};
  font-weight: 600;
  font-size: 16px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colorBorder};
  background: ${(props) => props.theme.colorBgSecondary};
  color: ${(props) => props.theme.colorTextPrimary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  &:hover {
    background: ${(props) => props.theme.colorPrimary};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityText = styled.span`
  color: ${(props) => props.theme.colorTextPrimary};
  font-weight: 600;
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s ease;

  &:hover {
    background: #c82333;
  }
`;

const CartSummary = styled.div`
  background: ${(props) => props.theme.colorBgSecondary};
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  color: ${(props) => props.theme.colorTextPrimary};
`;

const TotalRow = styled(SummaryRow)`
  font-weight: 600;
  font-size: 18px;
  border-top: 1px solid ${(props) => props.theme.colorBorder};
  padding-top: 12px;
  margin-top: 16px;
  margin-bottom: 0;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${(props) => props.theme.colorPrimary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  margin-top: 20px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 40px;
  color: ${(props) => props.theme.colorTextSecondary};
`;

interface CartItemData extends Court {
  quantity: number;
  selectedTime: string;
}

// Sample cart data
const initialCartItems: CartItemData[] = [
  {
    id: 'koorti-tennis-1',
    name: 'Tennis Court A',
    location: 'Koorti',
    games: ['tennis'],
    pricePerHour: 25,
    rating: 4.5,
    description: 'Professional tennis court with high-quality surface and excellent lighting.',
    amenities: ['Lighting', 'Seating', 'Equipment rental', 'Changing rooms'],
    coordinates: { lat: 59.437, lng: 24.7536 },
    image: 'https://via.placeholder.com/300x200/4CAF50/ffffff?text=Tennis+Court',
    availability: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '18:00', '19:00'],
    quantity: 2,
    selectedTime: '14:00',
  },
  {
    id: 'koorti-pickleball-1',
    name: 'Pickleball Court Premium',
    location: 'Koorti',
    games: ['pickleball'],
    pricePerHour: 20,
    rating: 4.8,
    description: 'State-of-the-art pickleball court designed for both beginners and advanced players.',
    amenities: ['Professional net', 'Court lines', 'Equipment rental', 'Storage'],
    coordinates: { lat: 59.4371, lng: 24.7537 },
    image: 'https://via.placeholder.com/300x200/2196F3/ffffff?text=Pickleball+Court',
    availability: ['08:00', '09:00', '12:00', '13:00', '17:00', '18:00', '20:00'],
    quantity: 1,
    selectedTime: '17:00',
  },
];

const CartPage: FC = () => {
  const [cartItems, setCartItems] = useState<CartItemData[]>(initialCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.pricePerHour * item.quantity, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.1; // 10% tax
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const handleCheckout = () => {
    console.log('[DEBUG_LOG] Checkout initiated with items:', cartItems);
    alert(`Checkout initiated for ${getTotalItems()} items. Total: €${getTotal().toFixed(2)}`);
  };

  if (cartItems.length === 0) {
    return (
      <PageContainer>
        <PageTitle>Cart</PageTitle>
        <EmptyCart>
          <h3>Your cart is empty</h3>
          <p>Add some courts to your cart to get started!</p>
        </EmptyCart>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>Cart ({getTotalItems()} items)</PageTitle>

      <CartSection>
        <h2>Your Bookings</h2>
        <CartGrid>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <CartItemImage src={item.image} alt={item.name} />
              <CartItemInfo>
                <CartItemName>{item.name}</CartItemName>
                <CartItemLocation>{item.location}</CartItemLocation>
                <CartItemDetails>
                  <GameTags>
                    {item.games.map((game) => (
                      <GameTag key={game}>{game}</GameTag>
                    ))}
                  </GameTags>
                  <span>★ {item.rating}</span>
                  <span>Time: {item.selectedTime}</span>
                </CartItemDetails>
                <div style={{ marginTop: '8px' }}>
                  <CroppedText opened={false} rows={1}>
                    {item.description}
                  </CroppedText>
                </div>
              </CartItemInfo>
              <CartItemPrice>
                <PriceText>€{item.pricePerHour}/hour</PriceText>
                <QuantityControls>
                  <QuantityButton
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </QuantityButton>
                  <QuantityText>{item.quantity}</QuantityText>
                  <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</QuantityButton>
                </QuantityControls>
                <RemoveButton onClick={() => removeItem(item.id)}>Remove</RemoveButton>
              </CartItemPrice>
            </CartItem>
          ))}
        </CartGrid>
      </CartSection>

      <CartSummary>
        <h3>Order Summary</h3>
        <SummaryRow>
          <span>Subtotal ({getTotalItems()} items):</span>
          <span>€{getSubtotal().toFixed(2)}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Tax (10%):</span>
          <span>€{getTax().toFixed(2)}</span>
        </SummaryRow>
        <TotalRow>
          <span>Total:</span>
          <span>€{getTotal().toFixed(2)}</span>
        </TotalRow>
        <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
      </CartSummary>
    </PageContainer>
  );
};

export default CartPage;
