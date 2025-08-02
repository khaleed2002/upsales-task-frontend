// hooks/useInfiniteScroll.ts
import { useCallback, UIEvent } from "react";

interface UseInfiniteScrollProps {
    loading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    threshold?: number;
}

export const useInfiniteScroll = ({
    loading,
    hasMore,
    onLoadMore,
    threshold = 100,
}: UseInfiniteScrollProps) => {
    const handleScroll = useCallback(
        (e: UIEvent<HTMLDivElement>) => {
            const target = e.currentTarget;
            const { scrollTop, scrollHeight, clientHeight } = target;

            if (
                scrollHeight - scrollTop <= clientHeight + threshold &&
                hasMore &&
                !loading
            ) {
                onLoadMore();
            }
        },
        [hasMore, loading, onLoadMore, threshold]
    );

    return { handleScroll };
};
