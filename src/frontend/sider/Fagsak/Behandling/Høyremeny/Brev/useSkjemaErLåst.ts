import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFormContext } from 'react-hook-form';

export function useSkjemaErLåst(): boolean {
    const erLesevisning = useErLesevisning();
    const {
        formState: { isSubmitting },
    } = useFormContext();
    return erLesevisning || isSubmitting;
}
