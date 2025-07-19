import type { Meta, StoryObj } from '@storybook/react';
import { FullTransaction } from './FullTransaction';

const meta: Meta<typeof FullTransaction> = {
  title: 'PickleMatch/Transaction/FullTransaction',
  component: FullTransaction,
  tags: ['autodocs'],
  argTypes: {
    transaction: {
      control: 'object',
      description: 'Transaction data object with date',
    },
    onEdit: {
      action: 'edit clicked',
      description: 'Callback when edit button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FullTransaction>;

export const PositiveTransaction: Story = {
  args: {
    transaction: {
      amount: 1500.5,
      category: 'Income',
      title: 'Court Booking Payment',
      description:
        'Payment received for tennis court booking at Central Park location for 2 hours on weekend. Customer paid for premium court with professional lighting and equipment rental.',
      date: '2024-01-15',
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
        'Professional tennis racket purchased from SportsMart for tournament preparation and training sessions. High-quality carbon fiber racket with custom grip.',
      date: '2024-01-10',
    },
  },
};

export const WithoutDate: Story = {
  args: {
    transaction: {
      amount: 75.25,
      category: 'Maintenance',
      title: 'Court Cleaning',
      description: 'Weekly court maintenance including surface cleaning, line marking touch-up, and net adjustment.',
    },
  },
};

export const RecentTransaction: Story = {
  args: {
    transaction: {
      amount: -1200,
      category: 'Infrastructure',
      title: 'Court Renovation',
      description:
        'Complete renovation of tennis court surface including new synthetic grass installation, line marking, net replacement, and lighting system upgrade to LED fixtures for better visibility during evening matches and training sessions.',
      date: '2024-01-20',
    },
  },
};
