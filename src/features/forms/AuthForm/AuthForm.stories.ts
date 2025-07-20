import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AuthForm } from './AuthForm';

const meta: Meta<typeof AuthForm> = {
  title: 'PickleMatch/Forms/AuthForm',
  component: AuthForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive authentication form that handles both login and registration with email/password validation, password strength checking, and console output.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'radio' },
      options: ['login', 'register'],
      description: 'Initial form mode (login or register)',
    },
    onLoginSubmit: {
      action: 'login-submitted',
      description: 'Callback function called when login form is submitted',
    },
    onRegisterSubmit: {
      action: 'register-submitted',
      description: 'Callback function called when registration form is submitted',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginMode: Story = {
  args: {
    mode: 'login',
    onLoginSubmit: action('login-submitted'),
    onRegisterSubmit: action('register-submitted'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in login mode. Users can switch to registration mode using the toggle.',
      },
    },
  },
};

export const RegisterMode: Story = {
  args: {
    mode: 'register',
    onLoginSubmit: action('login-submitted'),
    onRegisterSubmit: action('register-submitted'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in registration mode with password strength indicator and confirmation field.',
      },
    },
  },
};

export const InteractiveLogin: Story = {
  args: {
    mode: 'login',
    onLoginSubmit: (values) => {
      action('login-submitted')(values);
      console.log('[DEBUG_LOG] Login form submitted in Storybook:', values);
    },
    onRegisterSubmit: (values) => {
      action('register-submitted')(values);
      console.log('[DEBUG_LOG] Registration form submitted in Storybook:', values);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive login form that logs to console. Open browser console to see the output when submitting. Try invalid email formats to test validation.',
      },
    },
  },
};

export const InteractiveRegister: Story = {
  args: {
    mode: 'register',
    onLoginSubmit: (values) => {
      action('login-submitted')(values);
      console.log('[DEBUG_LOG] Login form submitted in Storybook:', values);
    },
    onRegisterSubmit: (values) => {
      action('register-submitted')(values);
      console.log('[DEBUG_LOG] Registration form submitted in Storybook:', values);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive registration form with console logging. Test password strength by entering different passwords. Try mismatched passwords to see validation.',
      },
    },
  },
};

export const ValidationTesting: Story = {
  args: {
    mode: 'register',
    onLoginSubmit: action('login-submitted'),
    onRegisterSubmit: action('register-submitted'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Form for testing validation scenarios. Try submitting empty fields, invalid emails, weak passwords, and mismatched password confirmations.',
      },
    },
  },
};

export const PasswordStrengthDemo: Story = {
  args: {
    mode: 'register',
    onLoginSubmit: action('login-submitted'),
    onRegisterSubmit: action('register-submitted'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates password strength indicator. Try different passwords: "weak", "Better123", "Strong123!", "VeryStrong123!@#"',
      },
    },
  },
};

export const ModeToggleDemo: Story = {
  args: {
    mode: 'login',
    onLoginSubmit: action('login-submitted'),
    onRegisterSubmit: action('register-submitted'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates mode switching between login and registration. Notice how form fields and validation change.',
      },
    },
  },
};

export const EmailValidationDemo: Story = {
  args: {
    mode: 'login',
    onLoginSubmit: action('login-submitted'),
    onRegisterSubmit: action('register-submitted'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Test email validation with various formats: "invalid", "test@", "test@domain", "valid@domain.com"',
      },
    },
  },
};
