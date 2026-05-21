import { useBehandlingId } from '@hooks/useBehandlingId';
import { useConfirmBrowserRefresh } from '@hooks/useConfirmBrowserRefresh';
import { HentHistorikkinnslagQueryKeyFactory } from '@hooks/useHentHistorikkinnslag';
import { HentSammensattKontrollsakQueryKeyFactory } from '@hooks/useHentSammensattKontrollsak';
import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import { useOppdaterSammensattKontrollsak } from '@hooks/useOppdaterSammensattKontrollsak';
import { useSammensattKontrollsakContext } from '@sider/Fagsak/Behandling/Sider/Vedtak/SammensattKontrollsak/SammensattKontrollsakContext';
import { useQueryClient } from '@tanstack/react-query';
import { erDefinert } from '@utils/commons';
import { useForm } from 'react-hook-form';

export enum SammensattKontrollsakFormField {
    FRITEKST = 'fritekst',
}

export interface SammensattKontrollsakFormValues {
    [SammensattKontrollsakFormField.FRITEKST]: string;
}

export function useSammensattKontrollsakForm() {
    const { sammensattKontrollsak } = useSammensattKontrollsakContext();

    const behandlingId = useBehandlingId();
    const queryClient = useQueryClient();

    const { mutateAsync: oppdaterSammensattKontrollsak } = useOppdaterSammensattKontrollsak({
        onSuccess: sammensattKontrollsak => {
            queryClient.setQueryData(
                HentSammensattKontrollsakQueryKeyFactory.behandling(behandlingId),
                sammensattKontrollsak
            );
            queryClient.invalidateQueries({
                queryKey: HentHistorikkinnslagQueryKeyFactory.historikkinnslag(behandlingId),
            });
        },
        onError: error => {
            const message = error.message ?? 'Teknisk feil ved lagring av sammensatt kontrollsak.';
            setError('root', { message });
        },
    });

    const form = useForm<SammensattKontrollsakFormValues>({
        values: {
            [SammensattKontrollsakFormField.FRITEKST]: sammensattKontrollsak?.fritekst ?? '',
        },
    });

    const {
        control,
        setError,
        reset,
        formState: { isDirty },
    } = form;

    useConfirmBrowserRefresh({ enabled: isDirty });

    useOnFormSubmitSuccessful(control, () => reset());

    function onSubmit(values: SammensattKontrollsakFormValues) {
        if (!erDefinert(sammensattKontrollsak)) {
            throw Error('Sammensatt kontrollsak er ikke satt.');
        }
        const { fritekst } = values;
        return oppdaterSammensattKontrollsak({ ...sammensattKontrollsak, fritekst });
    }

    return { form, onSubmit };
}
