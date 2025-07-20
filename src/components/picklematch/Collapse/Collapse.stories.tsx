import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Collapse } from './Collapse';

const meta: Meta<typeof Collapse> = {
  title: 'PickleMatch/Collapse',
  component: Collapse,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    opened: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: false,
    children:
      'This is the collapsible content. It can contain any React elements including text, images, forms, or other components.',
  },
};

export const Opened: Story = {
  args: {
    opened: true,
    children: 'This content is initially visible and can be collapsed by changing the opened prop to false.',
  },
};

export const WithComplexContent: Story = {
  args: {
    opened: false,
    children: (
      <div>
        <h3>Complex Content</h3>
        <p>This collapse contains multiple elements:</p>
        <ul>
          <li>Lists</li>
          <li>Paragraphs</li>
          <li>Headers</li>
        </ul>
        <button>Interactive elements work too!</button>
      </div>
    ),
  },
};
