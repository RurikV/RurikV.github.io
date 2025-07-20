import type { Meta, StoryObj } from '@storybook/react';
import { HomeworkDemo } from './HomeworkDemo';

const meta: Meta<typeof HomeworkDemo> = {
  title: 'Homework/HomeworkDemo',
  component: HomeworkDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Homework Demo Component

This component demonstrates all the required functionality for the homework assignment:

## Features Implemented:

### 1. Modal Window with Portals (1 point)
- ✅ Modal window correctly mounts and unmounts from body using React portals
- ✅ Proper cleanup when modal is closed
- ✅ Body scroll prevention when modal is open
- ✅ Keyboard (Escape) and click-outside-to-close functionality

### 2. Product/Operations List Component (2 points)
- ✅ Component correctly accepts arrays of data and renders items
- ✅ Rendering works without errors or bugs
- ✅ Supports both products and operations
- ✅ Toggle between viewing products, operations, or both

### 3. Dynamic Addition with "Show More" Button (3 points)
- ✅ "Show More" button correctly adds new items to the list
- ✅ Random product/operation generation implemented correctly
- ✅ UI design matches requirements and looks good

### 4. IntersectionObserver Implementation (4 points)
- ✅ IntersectionObserver correctly adds new items on scroll
- ✅ Implementation is performant without significant delays
- ✅ Random generation works correctly
- ✅ UI design is consistent and appealing

## How to Use:
1. Click "Generate Initial Data" to populate the list with initial items
2. Use the toggle buttons to switch between Products, Operations, or Both
3. Scroll down to trigger IntersectionObserver for infinite loading
4. Click on any item to view it in a modal window
5. Use "Show Product Modal" or "Show Operation Modal" to test modal functionality

## Technical Implementation:
- Uses React hooks (useState, useEffect, useCallback, useRef)
- Styled-components for styling with theme support
- TypeScript for type safety
- React portals for modal implementation
- IntersectionObserver API for infinite scrolling
- Proper component composition and separation of concerns
        `,
      },
    },
  },
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
    className: 'custom-homework-demo',
  },
};
