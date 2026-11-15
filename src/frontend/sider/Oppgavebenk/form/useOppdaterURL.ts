import { useCallback } from 'react';
import { type NavigateOptions, useSearchParams } from 'react-router';

import { GAMLE_SØKEPARAMETERE } from './migrering';
import { DATOFELTER, OppgavefilterField, type OppgavefilterFormValues, STANDARDVERDIER } from './useOppgavefilterForm';
import { erGyldigDato } from './validering';

/**
 * Oppdaterer URL-en med de oppgitte skjemaverdiene. Som standard legges endringen til i nettleserhistorikken.
 *
 * Felter med standardverdi fjernes fra URL-en. Ufullstendige eller ugyldige datoer endrer ikke URL-en, slik at
 * inntasting ikke gir ekstra innslag i historikken.
 */
export function useOppdaterURL() {
    const [searchParams, setSearchParams] = useSearchParams();

    return useCallback(
        (verdier: Partial<OppgavefilterFormValues>, options?: NavigateOptions) => {
            const oppdaterteSøkeparametere = new URLSearchParams(searchParams);
            for (const field of Object.values(OppgavefilterField)) {
                const verdi = verdier[field];
                if (verdi === undefined) {
                    continue;
                }
                if (DATOFELTER.includes(field) && verdi !== '' && !erGyldigDato(verdi)) {
                    continue;
                }
                if (verdi !== STANDARDVERDIER[field]) {
                    oppdaterteSøkeparametere.set(field, verdi);
                } else {
                    oppdaterteSøkeparametere.delete(field);
                }
            }
            for (const gammelSøkeparameter of GAMLE_SØKEPARAMETERE) {
                oppdaterteSøkeparametere.delete(gammelSøkeparameter);
            }
            if (oppdaterteSøkeparametere.toString() !== searchParams.toString()) {
                setSearchParams(oppdaterteSøkeparametere, options);
            }
        },
        [searchParams, setSearchParams]
    );
}
