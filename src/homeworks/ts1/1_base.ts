/**
 * Нужно превратить файл в ts и указать типы аргументов и типы возвращаемого значения
 * */

// String manipulation functions
export const removePlus = (string: string): string => string.replace(/^\+/, '');

export const addPlus = (string: string): string => `+${string}`;

export const removeFirstZeros = (value: string): string => value.replace(/^(-)?[0]+(-?\d+.*)$/, '$1$2');

// Number formatting functions
export const getBeautifulNumber = (value: number | string | null | undefined, separator = ' '): string | undefined =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

export const round = (value: number, accuracy = 2): number => {
  const d = 10 ** accuracy;
  return Math.round(value * d) / d;
};

// CSS transform parsing
const transformRegexp =
  /(matrix\(-?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, )(-?\d+(\.\d+)?), (-?\d+(\.\d+)?)\)/;

interface Transform {
  x: number;
  y: number;
}

export const getTransformFromCss = (transformCssString: string): Transform => {
  const data = transformCssString.match(transformRegexp);
  if (!data) return { x: 0, y: 0 };
  return {
    x: parseInt(data[6], 10),
    y: parseInt(data[8], 10),
  };
};

// Color processing functions
type RGBTuple = [number, number, number];

export const getColorContrastValue = ([red, green, blue]: RGBTuple): number =>
  // http://www.w3.org/TR/AERT#color-contrast
  Math.round((red * 299 + green * 587 + blue * 114) / 1000);

export const getContrastType = (contrastValue: number): 'black' | 'white' => (contrastValue > 125 ? 'black' : 'white');

export const shortColorRegExp = /^#[0-9a-f]{3}$/i;
export const longColorRegExp = /^#[0-9a-f]{6}$/i;

export const checkColor = (color: string): void => {
  if (!longColorRegExp.test(color) && !shortColorRegExp.test(color)) throw new Error(`invalid hex color: ${color}`);
};

export const hex2rgb = (color: string): RGBTuple => {
  checkColor(color);
  if (shortColorRegExp.test(color)) {
    const red = parseInt(color.substring(1, 2), 16);
    const green = parseInt(color.substring(2, 3), 16);
    const blue = parseInt(color.substring(3, 4), 16);
    return [red, green, blue];
  }
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 7), 16);
  return [red, green, blue];
};

// Array transformation functions
interface NumberedItem<T> {
  value: T;
  number: number;
}

export const getNumberedArray = <T>(arr: T[]): NumberedItem<T>[] => arr.map((value, number) => ({ value, number }));

export const toStringArray = <T>(arr: NumberedItem<T>[]): string[] =>
  arr.map(({ value, number }) => `${value}_${number}`);

// Customer transformation
interface Customer {
  id: number;
  name: string;
  age: number;
  isSubscribed: boolean;
}

interface CustomerData {
  name: string;
  age: number;
  isSubscribed: boolean;
}

type CustomersMap = Record<number, CustomerData>;

export const transformCustomers = (customers: Customer[]): CustomersMap => {
  return customers.reduce((acc: CustomersMap, customer) => {
    acc[customer.id] = { name: customer.name, age: customer.age, isSubscribed: customer.isSubscribed };
    return acc;
  }, {});
};
