import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import { useEvent } from '../../../hooks/useEvent';
import './CroppedText.css';

export type CroppedTextProps = {
  className?: string;
  children: string;
  opened: boolean;
  rows?: number;
};

const INITIAL_VALUE = 'I';

export const CroppedText: FC<CroppedTextProps> = ({ className, children, opened, rows = 3 }) => {
  const [text, setText] = useState<string>(INITIAL_VALUE);

  const min = useRef<number>(0);
  const max = useRef<number>(0);
  const mid = useRef<number>(0);
  const root = useRef<HTMLDivElement>(null);
  const texts = useRef<string[]>([]);
  const items = useRef<string[]>();
  const height = useRef<number>();
  const lineHeight = useRef<number>();

  const reset = useEvent(() => {
    if (lineHeight.current) {
      height.current = Math.round(lineHeight.current * rows);
    }
    texts.current = [];
    min.current = mid.current = 0;
    max.current = items.current ? items.current.length - 1 : 0;
  });

  useLayoutEffect(() => {
    if (root.current) {
      lineHeight.current = lineHeight.current ?? root.current.getBoundingClientRect()?.height;
    }
    items.current = children?.split(' ') || [];
    reset();
  }, [reset, children]);

  useLayoutEffect(() => {
    let timeout: number;
    let prevWidth: number = root.current?.getBoundingClientRect()?.width || 0;

    const fn = () => {
      cancelAnimationFrame(timeout);
      timeout = window.requestAnimationFrame(() => {
        setText(INITIAL_VALUE);
        reset();
      });
    };

    fn();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (prevWidth !== entry.contentRect.width) {
          prevWidth = entry.contentRect.width;
          fn();
        }
      }
    });

    if (root.current) {
      observer.observe(root.current);
    }

    return () => observer.disconnect();
  }, [reset, rows]);

  useLayoutEffect(() => {
    const checkoutTexts = (callback: () => void) => {
      if (texts.current.length < 3) {
        texts.current.push(text);
        callback();
        return;
      }
      texts.current.splice(0, 1);
      texts.current.push(text);
      if (texts.current[0] === texts.current[2]) {
        reset();
        return;
      }
      callback();
    };

    const getNewText = (count: number): string => {
      if (!items.current) return '';
      if (count >= items.current.length - 1) return items.current.join(' ');
      if (count <= 0) return '';
      return [items.current.slice(0, count).join(' '), '...'].join('');
    };

    checkoutTexts(() => {
      if (root.current && height.current) {
        if (root.current.getBoundingClientRect().height <= height.current) {
          min.current = mid.current;
        } else {
          max.current = mid.current - 1;
        }
        mid.current = Math.round((min.current + max.current) / 2);
        setText(getNewText(mid.current));
      }
    });
  }, [reset, text, children]);

  const rootClasses = ['picklematch-cropped-text', className].filter(Boolean).join(' ');

  return (
    <div ref={root} className={rootClasses}>
      {opened ? children : text}
    </div>
  );
};
