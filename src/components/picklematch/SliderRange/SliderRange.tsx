import React, { FC, useMemo } from 'react';
import { SliderRangeInput } from './SliderRangeInput';
import { getValueByCursor, getValueInRange } from './helpers';
import './SliderRange.css';

export type SliderRangeProps = {
  className?: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
};

export const SliderRange: FC<SliderRangeProps> = ({ className, value, onChange, min, max }) => {
  const range = max - min;

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    onChange(getValueByCursor({ max, min, rootWidth: rect.width, cursorClientX: e.clientX, rootClientX: rect.x }));
  };

  const { onStart } = useMemo(() => {
    let rect: DOMRect;

    const mousemove = (e: MouseEvent) => {
      onChange(getValueByCursor({ max, min, rootWidth: rect.width, cursorClientX: e.clientX, rootClientX: rect.x }));
    };

    const touchmove = (e: TouchEvent) => {
      onChange(
        getValueByCursor({ max, min, rootWidth: rect.width, cursorClientX: e.touches[0].clientX, rootClientX: rect.x })
      );
    };

    const end = () => {
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('touchmove', touchmove);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchend', end);
    };

    return {
      onStart: (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();
        rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        window.addEventListener('mousemove', mousemove);
        window.addEventListener('touchmove', touchmove);
        window.addEventListener('mouseup', end);
        window.addEventListener('touchend', end);
      },
    };
  }, [max, min, onChange]);

  const _value = getValueInRange(value, { min, max });
  const rootClasses = ['picklematch-slider-range', className].filter(Boolean).join(' ');

  return (
    <div className={rootClasses}>
      <div onMouseDown={onStart} onTouchStart={onStart} className="picklematch-slider-range-field" onClick={onClick}>
        <div className="picklematch-slider-range-track" />
        <div className="picklematch-slider-range-runner" style={{ left: ((_value - min) / range) * 100 + '%' }} />
      </div>
      <SliderRangeInput value={value} onChange={onChange} min={min} max={max} />
    </div>
  );
};
