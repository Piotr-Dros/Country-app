import { useState } from 'react';

function useLoadingList<T>() {
  const [items, setItems] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return {
    items,
    setItems,
    isLoading,
    setIsLoading,
    visibleCount,
    loadMore,
  };
}

export default useLoadingList;
