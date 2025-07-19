import type { Meta, StoryObj } from '@storybook/react';
import { BriefProduct } from './BriefProduct';

const meta: Meta<typeof BriefProduct> = {
  title: 'PickleMatch/E-commerce/BriefProduct',
  component: BriefProduct,
  tags: ['autodocs'],
  argTypes: {
    product: {
      control: 'object',
      description: 'Product data object',
    },
    cartCount: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Current quantity in cart',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BriefProduct>;

export const TennisRacket: Story = {
  args: {
    product: {
      id: '1',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop',
      title: 'Professional Tennis Racket',
      description: 'High-quality carbon fiber tennis racket perfect for competitive play and training sessions.',
    },
    cartCount: 0,
  },
};

export const TennisBalls: Story = {
  args: {
    product: {
      id: '2',
      price: 12.5,
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=300&h=200&fit=crop',
      title: 'Tennis Ball Set',
      description: 'Professional tournament-grade tennis balls. Pack of 4 balls with excellent bounce and durability.',
    },
    cartCount: 2,
  },
};

export const CourtShoes: Story = {
  args: {
    product: {
      id: '3',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop',
      title: 'Tennis Court Shoes',
      description:
        'Lightweight tennis shoes with excellent grip and support for all court surfaces. Available in multiple sizes.',
    },
    cartCount: 1,
  },
};

export const LongDescription: Story = {
  args: {
    product: {
      id: '4',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      title: 'Tennis Training Equipment Set',
      description:
        'Complete training set including practice cones, agility ladder, resistance bands, and training manual. Perfect for improving your tennis skills and fitness level. Suitable for players of all levels from beginner to advanced.',
    },
    cartCount: 0,
  },
};

export const NoImage: Story = {
  args: {
    product: {
      id: '5',
      price: 45,
      image: 'invalid-image-url',
      title: 'Tennis Grip Tape',
      description: 'Premium grip tape for tennis rackets with superior comfort and durability.',
    },
    cartCount: 3,
  },
};
