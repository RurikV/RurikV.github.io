import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ThemeContextProvider } from '../../styles/GlobalStyles';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Homework/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <Story />
      </ThemeContextProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Compact: Story = {
  args: {
    className: 'theme-switcher--compact',
  },
};
