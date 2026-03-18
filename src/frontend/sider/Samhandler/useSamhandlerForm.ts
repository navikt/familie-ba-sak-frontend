import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useHttp } from '@navikt/familie-http';

import { hentSamhandler } from '../../api/hentSamhandler';
import { useOnFormSubmitSuccessful } from '../../hooks/useOnFormSubmitSuccessful';
import type { ISamhandlerInfo } from '../../typer/samhandler';

const påvirkerSystemLaster = false;

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
    const { request } = useHttp();

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
                queryKey: ['samhandler-orgnr', values.orgnr],
                queryFn: () => hentSamhandler(request, values.orgnr, påvirkerSystemLaster),
            })
            .then(settSamhandler)
            .catch(error => {
                const message = (error as Error)?.message ?? 'En feil oppstod ved henting av institusjon.';
                setError('root', { message });
            });
    }

    return { form, onSubmit };
}
