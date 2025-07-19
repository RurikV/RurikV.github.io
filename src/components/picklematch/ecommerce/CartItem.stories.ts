import type { Meta, StoryObj } from '@storybook/react';
import { CartItem } from './CartItem';

const meta: Meta<typeof CartItem> = {
  title: 'PickleMatch/E-commerce/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  argTypes: {
    product: {
      control: 'object',
      description: 'Product data object',
    },
    count: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Quantity in cart',
    },
    onRemove: {
      action: 'removed from cart',
      description: 'Callback when item is removed from cart',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CartItem>;

export const TennisRacket: Story = {
  args: {
    product: {
      id: '1',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=80&h=80&fit=crop',
      title: 'Professional Tennis Racket',
      description: 'High-quality carbon fiber tennis racket',
    },
    count: 1,
  },
};

export const MultipleItems: Story = {
  args: {
    product: {
      id: '2',
      price: 12.5,
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=80&h=80&fit=crop',
      title: 'Tennis Ball Set',
      description: 'Professional tournament-grade tennis balls',
    },
    count: 5,
  },
};

export const ExpensiveItem: Story = {
  args: {
    product: {
      id: '3',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80&h=80&fit=crop',
      title: 'Premium Tennis Equipment Set',
      description: 'Complete professional tennis equipment',
    },
    count: 2,
  },
};

export const NoImage: Story = {
  args: {
    product: {
      id: '4',
      price: 45,
      image: 'invalid-image-url',
      title: 'Tennis Grip Tape',
      description: 'Premium grip tape for tennis rackets',
    },
    count: 3,
  },
};
