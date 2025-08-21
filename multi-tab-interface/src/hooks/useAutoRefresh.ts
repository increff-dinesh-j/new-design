import { useEffect, useRef, useState } from 'react';

interface UseAutoRefreshOptions {
  interval: number; // in milliseconds
  enabled: boolean;
  onRefresh: () => void | Promise<void>;
  onError?: (error: Error) => void;
}

export const useAutoRefresh = ({
  interval,
  enabled,
  onRefresh,
  onError,
}: UseAutoRefreshOptions) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const startAutoRefresh = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (enabled && interval > 0) {
      intervalRef.current = setInterval(async () => {
        if (!isMountedRef.current) return;

        try {
          setIsRefreshing(true);
          await onRefresh();
          setLastRefresh(new Date());
        } catch (error) {
          if (onError && error instanceof Error) {
            onError(error);
          }
        } finally {
          if (isMountedRef.current) {
            setIsRefreshing(false);
          }
        }
      }, interval);
    }
  };

  const stopAutoRefresh = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const manualRefresh = async () => {
    try {
      setIsRefreshing(true);
      await onRefresh();
      setLastRefresh(new Date());
    } catch (error) {
      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      startAutoRefresh();
    } else {
      stopAutoRefresh();
    }

    return () => {
      stopAutoRefresh();
    };
  }, [enabled, interval, onRefresh]);

  return {
    isRefreshing,
    lastRefresh,
    manualRefresh,
    startAutoRefresh,
    stopAutoRefresh,
  };
};
