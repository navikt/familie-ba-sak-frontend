import { LocalStorageKeyFactory, useLocalStorage } from '@hooks/useLocalStorage';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { migrerGamleFilterverdier, migrerGamleSøkeparametere } from './migrering';
import { OppgavefilterField, type OppgavefilterFormValues, STANDARDVERDIER } from './useOppgavefilterForm';
import { lagValideringer } from './validering';

export function useDefaultValues(): OppgavefilterFormValues {
    const [searchParams] = useSearchParams();

    const saksbehandler = useSaksbehandler();

    const localStorage = useLocalStorage();

    const [defaultValues] = useState(() => {
        migrerGamleFilterverdier();
        const migrerteSøkeparametere = migrerGamleSøkeparametere(searchParams);

        const valideringer = lagValideringer(saksbehandler);
        const harQueryParams = Object.values(OppgavefilterField).some(field => migrerteSøkeparametere.has(field));

        function lagDefaultValue(field: OppgavefilterField): string {
            const verdi = harQueryParams
                ? migrerteSøkeparametere.get(field)
                : localStorage.get(LocalStorageKeyFactory.oppgavefilter(field));
            return verdi !== null && valideringer[field](verdi) ? verdi : STANDARDVERDIER[field];
        }

        const verdier: OppgavefilterFormValues = {
            [OppgavefilterField.REGISTRERT_DATO]: lagDefaultValue(OppgavefilterField.REGISTRERT_DATO),
            [OppgavefilterField.OPPGAVETYPE]: lagDefaultValue(OppgavefilterField.OPPGAVETYPE),
            [OppgavefilterField.BEHANDLINGSTEMA]: lagDefaultValue(OppgavefilterField.BEHANDLINGSTEMA),
            [OppgavefilterField.BEHANDLINGSTYPE]: lagDefaultValue(OppgavefilterField.BEHANDLINGSTYPE),
            [OppgavefilterField.FRIST]: lagDefaultValue(OppgavefilterField.FRIST),
            [OppgavefilterField.ENHET]: lagDefaultValue(OppgavefilterField.ENHET),
            [OppgavefilterField.SAKSBEHANDLER]: lagDefaultValue(OppgavefilterField.SAKSBEHANDLER),
        };

        return verdier;
    });

    return defaultValues;
}
