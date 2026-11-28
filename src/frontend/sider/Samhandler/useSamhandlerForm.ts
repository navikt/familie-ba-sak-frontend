import { hentSamhandler } from '@api/hentSamhandler';
import { queryKeys } from '@hooks/keys/queryKeys';
import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import { useQueryClient } from '@tanstack/react-query';
import type { ISamhandlerInfo } from '@typer/samhandler';
import { useForm } from 'react-hook-form';

interface Props {
    settSamhandler: (samhandler: ISamhandlerInfo) => void;
}

export interface SamhandlerFormValues {
    [SamhandlerFeltnavn.ORGNR]: string;
}

export enum SamhandlerFeltnavn {
    ORGNR = 'orgnr',
}

export function useSamhandlerForm({ settSamhandler }: Props) {
    const queryClient = useQueryClient();

    const form = useForm<SamhandlerFormValues>({
        defaultValues: {
            [SamhandlerFeltnavn.ORGNR]: '',
        },
    });

    const { control, setError, reset } = form;

    useOnFormSubmitSuccessful(control, () => reset());

    async function onSubmit(values: SamhandlerFormValues) {
        return await queryClient
            .fetchQuery({
                queryKey: queryKeys.samhandler(values.orgnr),
                queryFn: () => hentSamhandler(values.orgnr),
            })
            .then(settSamhandler)
            .catch(error => {
                const message = (error as Error)?.message ?? 'En feil oppstod ved henting av institusjon.';
                setError('root', { message });
            });
    }

    return { form, onSubmit };
}
