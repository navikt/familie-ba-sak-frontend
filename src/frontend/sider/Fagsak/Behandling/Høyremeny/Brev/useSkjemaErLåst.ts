import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFormContext } from 'react-hook-form';

// Feltene og knappene i brevskjemaet skal være låst både under lesevisning og mens skjemaet sendes inn.
export function useSkjemaErLåst(): boolean {
    const erLesevisning = useErLesevisning();
    const {
        formState: { isSubmitting },
    } = useFormContext();
    return erLesevisning || isSubmitting;
}
