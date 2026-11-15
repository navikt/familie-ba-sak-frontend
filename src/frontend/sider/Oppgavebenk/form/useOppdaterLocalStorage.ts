import { LocalStorageKeyFactory, useLocalStorage } from '@hooks/useLocalStorage';
import { useCallback } from 'react';

import { DATOFELTER, OppgavefilterField, type OppgavefilterFormValues } from './useOppgavefilterForm';
import { erGyldigDato } from './validering';

/**
 * Lagrer de oppgitte skjemaverdiene i localStorage. Ufullstendige eller ugyldige datoer endrer ikke lagret verdi,
 * slik at localStorage holder seg i takt med URL-en (se useOppdaterURL).
 */
export function useOppdaterLocalStorage() {
    const localStorage = useLocalStorage();

    return useCallback(
        (values: Partial<OppgavefilterFormValues>) => {
            for (const field of Object.values(OppgavefilterField)) {
                const value = values[field];
                if (value === undefined) {
                    continue;
                }
                if (DATOFELTER.includes(field) && value !== '' && !erGyldigDato(value)) {
                    continue;
                }
                localStorage.set(LocalStorageKeyFactory.oppgavefilter(field), value);
            }
        },
        [localStorage]
    );
}
