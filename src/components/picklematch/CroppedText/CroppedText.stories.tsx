import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CroppedText } from './CroppedText';

const meta: Meta<typeof CroppedText> = {
  title: 'PickleMatch/CroppedText',
  component: CroppedText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    opened: {
      control: 'boolean',
    },
    rows: {
      control: { type: 'number', min: 1, max: 10 },
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;

const productDescription = `This premium pickle jar features a unique blend of cucumbers, spices, and our secret brine recipe that has been perfected over generations. Each pickle is carefully selected for optimal crunch and flavor. The jar contains approximately 15-20 pickles depending on size, and is perfect for sandwiches, burgers, or enjoying straight from the jar. Our pickles are made with no artificial preservatives and are naturally fermented for the best taste experience.`;

export const Default: Story = {
  args: {
    opened: false,
    rows: 3,
    children: longText,
  },
};

export const Opened: Story = {
  args: {
    opened: true,
    rows: 3,
    children: longText,
  },
};

export const SingleRow: Story = {
  args: {
    opened: false,
    rows: 1,
    children: longText,
  },
};

export const FiveRows: Story = {
  args: {
    opened: false,
    rows: 5,
    children: longText,
  },
};

export const ProductDescription: Story = {
  args: {
    opened: false,
    rows: 2,
    children: productDescription,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', border: '1px solid #ccc', padding: '16px' }}>
        <h3>Premium Pickle Jar</h3>
        <Story />
      </div>
    ),
  ],
};

export const ShortText: Story = {
  args: {
    opened: false,
    rows: 3,
    children: 'This is a short text that should not be truncated.',
  },
};
