import { useEffect, useRef } from 'react';

export const useScrollPosition = (tabId: string) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const saveScrollPosition = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const scrollLeft = scrollRef.current.scrollLeft;
      localStorage.setItem(`scroll-${tabId}`, JSON.stringify({ scrollTop, scrollLeft }));
    }
  };

  const restoreScrollPosition = () => {
    if (scrollRef.current) {
      const saved = localStorage.getItem(`scroll-${tabId}`);
      if (saved) {
        try {
          const { scrollTop, scrollLeft } = JSON.parse(saved);
          scrollRef.current.scrollTop = scrollTop;
          scrollRef.current.scrollLeft = scrollLeft;
        } catch (error) {
          console.warn('Failed to restore scroll position:', error);
        }
      }
    }
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.addEventListener('scroll', saveScrollPosition);
      return () => {
        element.removeEventListener('scroll', saveScrollPosition);
      };
    }
  }, [tabId]);

  useEffect(() => {
    // Restore scroll position after a short delay to ensure content is rendered
    const timer = setTimeout(restoreScrollPosition, 100);
    return () => clearTimeout(timer);
  }, [tabId]);

  return scrollRef;
};
