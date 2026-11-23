import { useOnMount } from '@hooks/useOnMount';
import {
    BehandlingstypeFilter,
    EnhetFilter,
    GjelderFilter,
    OppgavetypeFilter,
    SaksbehandlerFilter,
} from '@typer/oppgave';
import { useForm } from 'react-hook-form';

import { useOppgavebenkContext } from '../OppgavebenkContext';
import { usePaginationContext } from '../PaginationContext';
import { useDefaultValues } from './useDefaultValues';
import { useOppdaterLocalStorage } from './useOppdaterLocalStorage';
import { useOppdaterURL } from './useOppdaterURL';
import { useSyncVedNavigering } from './useSyncVedNavigering';

export enum OppgavefilterField {
    REGISTRERT_DATO = 'registrertDato',
    OPPGAVETYPE = 'oppgavetype',
    BEHANDLINGSTEMA = 'behandlingstema',
    BEHANDLINGSTYPE = 'behandlingstype',
    FRIST = 'frist',
    ENHET = 'enhet',
    SAKSBEHANDLER = 'saksbehandler',
}

export const DATOFELTER = [OppgavefilterField.REGISTRERT_DATO, OppgavefilterField.FRIST];

export interface OppgavefilterFormValues {
    [OppgavefilterField.REGISTRERT_DATO]: string;
    [OppgavefilterField.OPPGAVETYPE]: string;
    [OppgavefilterField.BEHANDLINGSTEMA]: string;
    [OppgavefilterField.BEHANDLINGSTYPE]: string;
    [OppgavefilterField.FRIST]: string;
    [OppgavefilterField.ENHET]: string;
    [OppgavefilterField.SAKSBEHANDLER]: string;
}

export const STANDARDVERDIER: OppgavefilterFormValues = {
    [OppgavefilterField.REGISTRERT_DATO]: '',
    [OppgavefilterField.OPPGAVETYPE]: OppgavetypeFilter.ALLE,
    [OppgavefilterField.BEHANDLINGSTEMA]: GjelderFilter.ALLE,
    [OppgavefilterField.BEHANDLINGSTYPE]: BehandlingstypeFilter.ALLE,
    [OppgavefilterField.FRIST]: '',
    [OppgavefilterField.ENHET]: EnhetFilter.VELG,
    [OppgavefilterField.SAKSBEHANDLER]: SaksbehandlerFilter.ALLE,
};

export enum Mode {
    RESET_PAGE_PARAM = 'RESET_PAGE_PARAM',
    KEEP_PAGE_PARAM = 'KEEP_PAGE_PARAM',
}

export function useOppgavefilterForm() {
    const { hentOppgaver } = useOppgavebenkContext();
    const { page, setPage } = usePaginationContext();

    const defaultValues = useDefaultValues();

    const form = useForm<OppgavefilterFormValues>({ defaultValues });

    useSyncVedNavigering(form);

    const oppdaterURL = useOppdaterURL();
    const oppdaterLocalStorage = useOppdaterLocalStorage();

    const { setError } = form;

    async function onSubmit(values: OppgavefilterFormValues, mode: Mode) {
        try {
            if (mode === Mode.RESET_PAGE_PARAM && page !== 1) {
                setPage(1, { replace: false });
            }
            await hentOppgaver(values);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Ukjent feil ved henting av oppgaver.';
            setError('root', { message });
        }
    }

    useOnMount(() => {
        oppdaterLocalStorage(defaultValues);
        oppdaterURL(defaultValues, { replace: true });
        if (defaultValues[OppgavefilterField.ENHET] !== EnhetFilter.VELG) {
            void onSubmit(defaultValues, Mode.KEEP_PAGE_PARAM);
        }
    });

    return { form, onSubmit };
}
