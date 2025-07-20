import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tip } from './Tip';

const meta: Meta<typeof Tip> = {
  title: 'PickleMatch/Tip',
  component: Tip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
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
    title: 'This is a helpful tooltip!',
    children: <button>Hover me</button>,
  },
};

export const WithLongText: Story = {
  args: {
    title: 'This is a much longer tooltip text that demonstrates how the component handles longer content with proper word wrapping.',
    children: <button>Hover for long tooltip</button>,
  },
};

export const OnSpan: Story = {
  args: {
    title: 'Tooltips work on any element',
    children: <span style={{ textDecoration: 'underline', cursor: 'help' }}>Hover this text</span>,
  },
};

export const WithComplexContent: Story = {
  args: {
    title: (
      <div>
        <strong>Rich Content</strong>
        <br />
        Tooltips can contain HTML elements!
      </div>
    ),
    children: <button style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px' }}>Styled Button</button>,
  },
};

export const OnImage: Story = {
  args: {
    title: 'This tooltip appears on an image',
    children: (
      <img 
        src="https://via.placeholder.com/100x100/007bff/ffffff?text=Image" 
        alt="Placeholder" 
        style={{ cursor: 'pointer' }}
      />
    ),
  },
};