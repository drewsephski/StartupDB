import { useState, useEffect, useCallback, useRef, RefObject } from 'react';

interface UseInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll({
  loading,
  hasMore,
  onLoadMore,
  threshold = 0.1,
  rootMargin = '20px',
}: UseInfiniteScrollProps): { loadMoreRef: RefObject<HTMLDivElement | null> } {
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const isFetchingRef = useRef(isFetching);

  // Keep refs in sync with state
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    isFetchingRef.current = isFetching;
  }, [isFetching]);

  const handleLoadMore = useCallback(async () => {
    if (isFetchingRef.current || !hasMoreRef.current || loadingRef.current) {
      return;
    }

    try {
      setIsFetching(true);
      await onLoadMore();
    } catch (error) {
      console.error('Error in onLoadMore:', error);
    } finally {
      setIsFetching(false);
    }
  }, [onLoadMore]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        handleLoadMore();
      }
    },
    [handleLoadMore]
  );

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    
    if (currentRef) {
      const observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin,
        threshold,
      };

      const observerInstance = new IntersectionObserver(handleObserver, observerOptions);
      observer.current = observerInstance;
      observerInstance.observe(currentRef);

      return () => {
        if (currentRef) {
          observerInstance.unobserve(currentRef);
        }
      };
    }
  }, [handleObserver, rootMargin, threshold]);

  useEffect(() => {
    if (!loading && isFetching) {
      setIsFetching(false);
    }
  }, [loading, isFetching]);

  return { loadMoreRef };
}
