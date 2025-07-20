import type { Meta, StoryObj } from '@storybook/react';
import { TransactionList } from './TransactionList';
import { createRandomTransactions } from '../dataGenerator';

const meta: Meta<typeof TransactionList> = {
  title: 'PickleMatch/Transaction/TransactionList',
  component: TransactionList,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A transaction list component with infinite scroll, balance tracking, and real-time income/expense summaries.',
      },
    },
  },
  argTypes: {
    enableInfiniteScroll: {
      control: 'boolean',
      description: 'Enable infinite scroll with IntersectionObserver',
    },
    itemsPerLoad: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of transactions to load per batch',
    },
    onTransactionClick: {
      action: 'transaction-clicked',
      description: 'Callback when a transaction is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    enableInfiniteScroll: true,
    itemsPerLoad: 8,
  },
};

export const WithShowMoreButton: Story = {
  args: {
    enableInfiniteScroll: false,
    itemsPerLoad: 6,
  },
  parameters: {
    docs: {
      description: {
        story: 'Transaction list with "Show More" button instead of infinite scroll.',
      },
    },
  },
};

export const FastLoading: Story = {
  args: {
    enableInfiniteScroll: true,
    itemsPerLoad: 15,
  },
  parameters: {
    docs: {
      description: {
        story: 'Transaction list that loads more items per batch for faster browsing.',
      },
    },
  },
};

export const WithInitialTransactions: Story = {
  args: {
    initialTransactions: createRandomTransactions(5),
    enableInfiniteScroll: true,
    itemsPerLoad: 8,
  },
  parameters: {
    docs: {
      description: {
        story: 'Transaction list pre-populated with initial transactions showing balance calculations.',
      },
    },
  },
};

export const SlowLoading: Story = {
  args: {
    enableInfiniteScroll: true,
    itemsPerLoad: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Transaction list with smaller batch sizes to demonstrate loading states and balance updates.',
      },
    },
  },
};

export const BalanceTracking: Story = {
  args: {
    enableInfiniteScroll: false,
    itemsPerLoad: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates real-time balance tracking with income and expense summaries.',
      },
    },
  },
};
