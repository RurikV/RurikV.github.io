/**
 * Здесь код с ошибками типов. Нужно их устранить
 * */

// Мы это не проходили, но по тексту ошибки можно понять, как это починить
export const getFakeApi = async (): Promise<void> => {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => response.json());
  console.log(result);
};

// Мы это не проходили, но по тексту ошибки можно понять, как это починить
export class SomeClass {
  set: Set<number>;
  channel: BroadcastChannel;

  constructor() {
    this.set = new Set([1]);
    this.channel = new BroadcastChannel('test-broadcast-channel');
  }
}

export type Money = {
  type: 'Money';
  currency: string;
  amount: number;
};

export type Percent = {
  type: 'Percent';
  percent: number;
};

export type Data = Money | Percent;

// Здесь, возможно, нужно использовать as, возможно в switch передавать немного по-другому
export const getDataAmount = (data: Data): number => {
  switch (data.type) {
    case 'Money':
      return data.amount;

    case 'Percent':
      return data.percent;

    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const unhandled: never = data; // здесь, возможно, нужно использовать нечто другое. :never должен остаться
      throw new Error('unknown type');
    }
  }
};
