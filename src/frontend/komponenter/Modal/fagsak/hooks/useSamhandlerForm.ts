import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useHttp } from '@navikt/familie-http';

import { hentSamhandler } from '../../../../api/hentSamhandler';
import { useOnFormSubmitSuccessful } from '../../../../hooks/useOnFormSubmitSuccessful';
import type { ISamhandlerInfo } from '../../../../typer/samhandler';
import {
    SamhandlerFeltnavn,
    SamhandlerFormServerErrors,
    type SamhandlerFormValues,
} from '../form/SamhandlerForm';

interface Props {
    settSamhandler: (samhandler: ISamhandlerInfo) => void;
}

export function useSamhandlerForm({ settSamhandler }: Props) {
    const queryClient = useQueryClient();
    const { request } = useHttp();

    const form = useForm<SamhandlerFormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            [SamhandlerFeltnavn.ORGNR]: '',
        },
    });

    const { control, setError, reset } = form;

    useOnFormSubmitSuccessful(control, () => reset());

    async function onSubmit(values: SamhandlerFormValues) {
        return await queryClient
            .fetchQuery({
                queryKey: ['samhandler', values.orgnr],
                queryFn: () => hentSamhandler(request, values.orgnr),
            })
            .then(samhandler => settSamhandler(samhandler))
            .catch(error => {
                const message =
                    (error as Error)?.message ?? 'En feil oppstod ved henting av institusjon.';
                setError(SamhandlerFormServerErrors.onSubmitError.id, { message });
            });
    }

    return { form, onSubmit };
}
