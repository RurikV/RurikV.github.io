import React from 'react';
import './SliderRangeInput.css';

export type SliderRangeInputProps = {
  className?: string;
  onChange: (value: number) => void;
  value: number;
  min: number;
  max: number;
};

export const SliderRangeInput = ({ className, value, onChange, min, max }: SliderRangeInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _value = Number(e.target.value.replace(/[^\d-]/g, ''));
    onChange(_value);
  };

  const inputClasses = ['picklematch-slider-range-input', className].filter(Boolean).join(' ');

  return <input type="number" min={min} max={max} className={inputClasses} value={value} onChange={handleChange} />;
};
