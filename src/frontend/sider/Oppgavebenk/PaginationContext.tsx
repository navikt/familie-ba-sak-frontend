import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { type NavigateOptions, useSearchParams } from 'react-router';

interface PaginationContextValue {
    page: number;
    setPage: (page: number) => void;
}

const PAGE_SEARCH_PARAM = 'side';

const PaginationContext = createContext<PaginationContextValue | undefined>(undefined);

interface PaginationProviderProps extends PropsWithChildren {
    totalPages?: number;
}

export function PaginationProvider({ children, totalPages }: PaginationProviderProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageParam = Number(searchParams.get(PAGE_SEARCH_PARAM));
    const requestedPage = Number.isSafeInteger(pageParam) && pageParam > 0 ? pageParam : 1;
    const page = totalPages === undefined ? requestedPage : Math.min(requestedPage, Math.max(1, totalPages));

    const setPage = useCallback(
        (page: number, options?: NavigateOptions) => {
            setSearchParams(previousParams => {
                const nextParams = new URLSearchParams(previousParams);
                if (page === 1) {
                    nextParams.delete(PAGE_SEARCH_PARAM);
                } else {
                    nextParams.set(PAGE_SEARCH_PARAM, String(page));
                }
                return nextParams;
            }, options);
        },
        [setSearchParams]
    );

    useEffect(() => {
        if (page !== requestedPage) {
            setPage(page, { replace: true });
        }
    }, [page, requestedPage, setPage]);

    const value = useMemo(() => ({ page, setPage }), [page, setPage]);

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}

export function usePaginationContext() {
    const context = useContext(PaginationContext);
    if (context === undefined) {
        throw new Error('usePaginationContext må brukes innenfor en PaginationProvider');
    }
    return context;
}
