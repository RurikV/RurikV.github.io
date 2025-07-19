import type { Meta, StoryObj } from '@storybook/react';
import { BriefTransaction } from './BriefTransaction';

const meta: Meta<typeof BriefTransaction> = {
  title: 'PickleMatch/Transaction/BriefTransaction',
  component: BriefTransaction,
  tags: ['autodocs'],
  argTypes: {
    transaction: {
      control: 'object',
      description: 'Transaction data object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BriefTransaction>;

export const PositiveTransaction: Story = {
  args: {
    transaction: {
      amount: 1500.5,
      category: 'Income',
      title: 'Court Booking Payment',
      description: 'Payment received for tennis court booking at Central Park location for 2 hours on weekend.',
    },
  },
};

export const NegativeTransaction: Story = {
  args: {
    transaction: {
      amount: -250,
      category: 'Equipment',
      title: 'Tennis Racket Purchase',
      description:
        'Professional tennis racket purchased from SportsMart for tournament preparation and training sessions.',
    },
  },
};

export const ShortDescription: Story = {
  args: {
    transaction: {
      amount: 75.25,
      category: 'Maintenance',
      title: 'Court Cleaning',
      description: 'Weekly court maintenance.',
    },
  },
};

export const LongDescription: Story = {
  args: {
    transaction: {
      amount: -1200,
      category: 'Infrastructure',
      title: 'Court Renovation',
      description:
        'Complete renovation of tennis court surface including new synthetic grass installation, line marking, net replacement, and lighting system upgrade to LED fixtures for better visibility during evening matches and training sessions.',
    },
  },
};
