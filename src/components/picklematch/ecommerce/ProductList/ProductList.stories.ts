import type { Meta, StoryObj } from '@storybook/react';
import { ProductList } from './ProductList';
import { createRandomProducts } from '../../dataGenerator';

const meta: Meta<typeof ProductList> = {
  title: 'PickleMatch/E-commerce/ProductList',
  component: ProductList,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A product list component with infinite scroll using IntersectionObserver for performance optimization.',
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
      description: 'Number of items to load per batch',
    },
    onProductClick: {
      action: 'product-clicked',
      description: 'Callback when a product is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    enableInfiniteScroll: true,
    itemsPerLoad: 6,
  },
};

export const WithShowMoreButton: Story = {
  args: {
    enableInfiniteScroll: false,
    itemsPerLoad: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Product list with "Show More" button instead of infinite scroll.',
      },
    },
  },
};

export const FastLoading: Story = {
  args: {
    enableInfiniteScroll: true,
    itemsPerLoad: 12,
  },
  parameters: {
    docs: {
      description: {
        story: 'Product list that loads more items per batch for faster browsing.',
      },
    },
  },
};

export const WithInitialProducts: Story = {
  args: {
    initialProducts: createRandomProducts(3),
    enableInfiniteScroll: true,
    itemsPerLoad: 6,
  },
  parameters: {
    docs: {
      description: {
        story: 'Product list pre-populated with initial products.',
      },
    },
  },
};

export const SlowLoading: Story = {
  args: {
    enableInfiniteScroll: true,
    itemsPerLoad: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Product list with smaller batch sizes to demonstrate loading states.',
      },
    },
  },
};
