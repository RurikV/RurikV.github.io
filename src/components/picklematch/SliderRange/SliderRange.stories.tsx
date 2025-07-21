import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SliderRange } from './SliderRange';

const meta: Meta<typeof SliderRange> = {
  title: 'PickleMatch/SliderRange',
  component: SliderRange,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number' },
    },
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories
interface InteractiveSliderProps {
  min?: number;
  max?: number;
  initialValue?: number;
  className?: string;
}

const InteractiveSlider = ({ min = 0, max = 100, initialValue = 50, ...props }: InteractiveSliderProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <div style={{ width: '300px' }}>
      <SliderRange value={value} onChange={setValue} min={min} max={max} {...props} />
      <p style={{ marginTop: '16px', textAlign: 'center' }}>
        Current value: <strong>{value}</strong>
      </p>
    </div>
  );
};

export const Default: Story = {
  render: () => <InteractiveSlider />,
};

export const PriceRange: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h3>Price Filter</h3>
      <InteractiveSlider min={0} max={500} initialValue={150} />
      <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>Perfect for filtering products by price range</p>
    </div>
  ),
};

export const SmallRange: Story = {
  render: () => (
    <div style={{ width: '250px' }}>
      <h4>Rating (1-5)</h4>
      <InteractiveSlider min={1} max={5} initialValue={3} />
    </div>
  ),
};

export const LargeRange: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <h4>Year Range</h4>
      <InteractiveSlider min={1990} max={2024} initialValue={2020} />
    </div>
  ),
};

export const NegativeRange: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <h4>Temperature (°C)</h4>
      <InteractiveSlider min={-20} max={40} initialValue={20} />
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div style={{ width: '350px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <h4>Custom Styled Slider</h4>
      <InteractiveSlider min={0} max={1000} initialValue={250} className="custom-slider" />
      <style>{`
        .custom-slider .picklematch-slider-range-runner {
          background-color: #28a745;
        }
        .custom-slider .picklematch-slider-range-track {
          background-color: #d4edda;
        }
      `}</style>
    </div>
  ),
};
