import { useCallback, useEffect } from 'react';

interface Props {
    enabled?: boolean;
    message?: string;
}

export function useConfirmBrowserRefresh({ enabled = true, message = '' }: Props) {
    const handleBeforeUnload = useCallback(
        (event: BeforeUnloadEvent) => {
            if (!enabled) {
                return;
            }
            event.preventDefault();
            event.returnValue = message;
            return message;
        },
        [enabled, message]
    );

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [handleBeforeUnload]);
}
