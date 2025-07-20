import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ProductForm } from './ProductForm';

const meta: Meta<typeof ProductForm> = {
  title: 'PickleMatch/Forms/ProductForm',
  component: ProductForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form for adding/editing pickle products with validation, image preview, and console output.',
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
    onSubmit: action('product-form-submitted'),
    initialValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      image: '',
    },
  },
};

export const WithInitialValues: Story = {
  args: {
    onSubmit: action('product-form-submitted'),
    initialValues: {
      title: 'Premium Dill Pickles',
      description:
        'Crispy and tangy dill pickles made with fresh cucumbers and traditional spices. Perfect for sandwiches and snacking.',
      price: 8.99,
      category: 'Cucumber Pickles',
      image: 'https://images.unsplash.com/photo-1589621316382-008455b857cd?w=400&h=300&fit=crop',
    },
  },
};

export const EditMode: Story = {
  args: {
    onSubmit: action('product-form-submitted'),
    initialValues: {
      title: 'Spicy Pickle Mix',
      description:
        'A fiery blend of pickled vegetables including jalapeños, carrots, and cauliflower with a kick of heat.',
      price: 12.5,
      category: 'Vegetable Pickles',
      image: 'https://images.unsplash.com/photo-1571197119282-7c4e99e6e3d6?w=400&h=300&fit=crop',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Form pre-filled with existing product data for editing mode.',
      },
    },
  },
};

export const EmptyForm: Story = {
  args: {
    onSubmit: action('product-form-submitted'),
    initialValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      image: '',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Empty form to test validation. Try submitting without filling required fields to see validation errors.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    onSubmit: (values) => {
      action('product-form-submitted')(values);
      console.log('[DEBUG_LOG] Product form submitted in Storybook:', values);
    },
    initialValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      image: '',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive form that logs to console. Open browser console to see the output when submitting. Try entering a valid image URL to see the preview.',
      },
    },
  },
};

export const WithImagePreview: Story = {
  args: {
    onSubmit: action('product-form-submitted'),
    initialValues: {
      title: 'Gourmet Pickle Assortment',
      description:
        'A carefully curated selection of artisanal pickles featuring unique flavors and premium ingredients.',
      price: 24.99,
      category: 'Specialty Pickles',
      image: 'https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?w=400&h=300&fit=crop',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with a valid image URL to demonstrate the image preview functionality.',
      },
    },
  },
};
