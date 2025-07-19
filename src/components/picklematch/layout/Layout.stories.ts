import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';

const meta: Meta<typeof Layout> = {
  title: 'PickleMatch/Layout/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display in the main area',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    children: `
      Welcome to PickleMatch!
      
      This is the main content area. The header above contains the logo and navigation links.
      The header will stick to the top when you scroll down.
      
      Try scrolling to see the sticky header behavior in action.
      
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
  },
};

export const WithLongContent: Story = {
  args: {
    children: Array(50).fill(0).map((_, i) => 
      `Paragraph ${i + 1}: This is a long content section to demonstrate the sticky header behavior. When you scroll down, the header should remain fixed at the top of the viewport.`
    ).join('\n\n'),
  },
};