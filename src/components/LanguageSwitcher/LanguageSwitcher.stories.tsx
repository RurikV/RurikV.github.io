import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LanguageProvider } from '../../contexts/LanguageContext';
import '../../i18n/config';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Homework/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <LanguageProvider>
        <Story />
      </LanguageProvider>
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
    className: 'language-switcher--compact',
  },
};
