import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ModalDemo } from './ModalDemo';
import { LanguageProvider } from '../../contexts/LanguageContext';
import '../../i18n/config';

const meta: Meta<typeof ModalDemo> = {
  title: 'Homework/ModalDemo',
  component: ModalDemo,
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

export const WithCustomClass: Story = {
  args: {
    className: 'custom-modal-demo',
  },
};
