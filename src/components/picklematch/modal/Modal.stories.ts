import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'PickleMatch/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Controls modal visibility',
    },
    children: {
      control: 'text',
      description: 'Content to display inside the modal',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when modal is closed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    visible: true,
    children: 'This is modal content. You can put any content here.',
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
    children: 'This modal is hidden',
  },
};

export const WithLongContent: Story = {
  args: {
    visible: true,
    children: `
      This is a modal with longer content to demonstrate scrolling behavior.
      
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    `,
  },
};
