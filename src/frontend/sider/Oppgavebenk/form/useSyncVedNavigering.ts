import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { useEffect, useEffectEvent, useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { NavigationType, useLocation, useNavigationType, useSearchParams } from 'react-router';

import { migrerGamleSøkeparametere } from './migrering';
import { useOppdaterLocalStorage } from './useOppdaterLocalStorage';
import { OppgavefilterField, type OppgavefilterFormValues, STANDARDVERDIER } from './useOppgavefilterForm';
import { lagValideringer } from './validering';

/**
 * Når saksbehandler går tilbake eller frem i nettleserhistorikken, settes skjemaet og localStorage til verdiene i
 * URL-en.
 */
export function useSyncVedNavigering(form: UseFormReturn<OppgavefilterFormValues>) {
    const location = useLocation();
    const navigationType = useNavigationType();
    const saksbehandler = useSaksbehandler();

    const [searchParams] = useSearchParams();

    const oppdaterLocalStorage = useOppdaterLocalStorage();

    const forrigeLocation = useRef(location);

    function hentValuesFraURL(): OppgavefilterFormValues {
        const valideringer = lagValideringer(saksbehandler);
        const migrerteSøkeparametere = migrerGamleSøkeparametere(searchParams);

        function hentVerdiFraURL(field: OppgavefilterField): string {
            const verdi = migrerteSøkeparametere.get(field);
            return verdi !== null && valideringer[field](verdi) ? verdi : STANDARDVERDIER[field];
        }

        return {
            [OppgavefilterField.REGISTRERT_DATO]: hentVerdiFraURL(OppgavefilterField.REGISTRERT_DATO),
            [OppgavefilterField.OPPGAVETYPE]: hentVerdiFraURL(OppgavefilterField.OPPGAVETYPE),
            [OppgavefilterField.BEHANDLINGSTEMA]: hentVerdiFraURL(OppgavefilterField.BEHANDLINGSTEMA),
            [OppgavefilterField.BEHANDLINGSTYPE]: hentVerdiFraURL(OppgavefilterField.BEHANDLINGSTYPE),
            [OppgavefilterField.FRIST]: hentVerdiFraURL(OppgavefilterField.FRIST),
            [OppgavefilterField.ENHET]: hentVerdiFraURL(OppgavefilterField.ENHET),
            [OppgavefilterField.SAKSBEHANDLER]: hentVerdiFraURL(OppgavefilterField.SAKSBEHANDLER),
        };
    }

    const synkroniser = useEffectEvent(() => {
        const values = hentValuesFraURL();
        form.reset(values, { keepDefaultValues: true });
        oppdaterLocalStorage(values);
    });

    useEffect(() => {
        if (location === forrigeLocation.current) {
            return;
        }
        forrigeLocation.current = location;
        if (navigationType === NavigationType.Pop) {
            synkroniser();
        }
    }, [location, navigationType]);
}
