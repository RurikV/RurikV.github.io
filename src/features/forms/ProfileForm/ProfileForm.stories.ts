import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ProfileForm } from './ProfileForm';

const meta: Meta<typeof ProfileForm> = {
  title: 'PickleMatch/Forms/ProfileForm',
  component: ProfileForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form for editing user profile information with validation and console output.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialValues: {
      control: 'object',
      description: 'Initial values for the form fields',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback function called when form is submitted',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: action('form-submitted'),
    initialValues: {
      name: '',
      about: '',
      isAdmin: false,
    },
  },
};

export const WithInitialValues: Story = {
  args: {
    onSubmit: action('form-submitted'),
    initialValues: {
      name: 'John Doe',
      about: 'I am a passionate pickle enthusiast who loves trying different varieties of pickled vegetables.',
      isAdmin: false,
    },
  },
};

export const EmptyForm: Story = {
  args: {
    onSubmit: action('form-submitted'),
    initialValues: {
      name: '',
      about: '',
      isAdmin: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty form to test validation. Try submitting without filling fields to see validation errors.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    onSubmit: (values) => {
      action('form-submitted')(values);
      console.log('[DEBUG_LOG] Profile form submitted in Storybook:', values);
    },
    initialValues: {
      name: '',
      about: '',
      isAdmin: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive form that logs to console. Open browser console to see the output when submitting.',
      },
    },
  },
};
