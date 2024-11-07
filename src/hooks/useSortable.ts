import { useState } from 'react';

export function useSortable<T>(initialItems: T[]) {
  const [items, setItems] = useState<T[]>(initialItems);

  const moveItem = (fromIndex: number, toIndex: number) => {
    setItems((prevItems) => {
      const result = Array.from(prevItems);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  };

  return { items, setItems, moveItem };
}
