import type { Meta, StoryObj } from '@storybook/react';
import { AddToCartButton } from './AddToCartButton';

const meta: Meta<typeof AddToCartButton> = {
  title: 'PickleMatch/E-commerce/AddToCartButton',
  component: AddToCartButton,
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Current quantity in cart (0 shows button, >0 shows counter)',
    },
    onAdd: {
      action: 'added to cart',
      description: 'Callback when item is added to cart',
    },
    onIncrease: {
      action: 'increased quantity',
      description: 'Callback when quantity is increased',
    },
    onDecrease: {
      action: 'decreased quantity',
      description: 'Callback when quantity is decreased',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddToCartButton>;

export const ButtonState: Story = {
  args: {
    count: 0,
  },
  name: 'Button State (count = 0)',
};

export const CounterState: Story = {
  args: {
    count: 3,
  },
  name: 'Counter State (count > 0)',
};

export const SingleItem: Story = {
  args: {
    count: 1,
  },
  name: 'Single Item',
};

export const MultipleItems: Story = {
  args: {
    count: 5,
  },
  name: 'Multiple Items',
};
