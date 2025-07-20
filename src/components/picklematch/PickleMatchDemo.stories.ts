import type { Meta, StoryObj } from '@storybook/react';
import { PickleMatchDemo } from './PickleMatchDemo';

const meta: Meta<typeof PickleMatchDemo> = {
  title: 'PickleMatch/Demo/PickleMatchDemo',
  component: PickleMatchDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Comprehensive demonstration of PickleMatch components including enhanced modals with portals, infinite scroll lists with IntersectionObserver, and dynamic data generation.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo showcasing all PickleMatch features: enhanced modals, infinite scroll lists, transaction management, and product catalog.',
      },
    },
  },
};

export const FullFeatureDemo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Complete feature demonstration including:\n\n' +
          '• **Enhanced Modal Component**: React portals, escape key handling, body scroll prevention, accessibility features\n' +
          '• **Infinite Scroll Lists**: IntersectionObserver for performance, dynamic data generation, loading states\n' +
          '• **Transaction Management**: Real-time balance calculation, income/expense tracking, transaction summaries\n' +
          '• **Product Catalog**: Grid-based display, hover effects, product detail modals, cart integration ready\n' +
          '• **Data Generation**: Random product and transaction generation with realistic data\n' +
          '• **Responsive Design**: Mobile-friendly layouts and interactions',
      },
    },
  },
};
