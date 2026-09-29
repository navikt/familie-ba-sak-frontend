import { useFelt, Valideringsstatus } from '@navikt/familie-skjema';
import { act, renderHook } from '@testing-library/react';

import generator from '../../testutils/testverktøy/fnr/fnr-generator';
import { identValidator } from '../validators';

describe('utils/validators', () => {
    test('Validering av ident', () => {
        const fnrGenerator = generator(new Date('10.02.2020'));
        const { result } = renderHook(() =>
            useFelt({
                verdi: '',
                valideringsfunksjon: identValidator,
            })
        );

        const validertTomIdent = result.current.valider(result.current);
        expect(validertTomIdent.valideringsstatus).toBe(Valideringsstatus.FEIL);
        expect(validertTomIdent.feilmelding).toBe('Identen har ikke 11 tall');

        act(() => result.current.onChange('12345678910'));
        const validertUgyldigIdent = result.current.valider(result.current);
        expect(validertUgyldigIdent.valideringsstatus).toBe(Valideringsstatus.FEIL);
        expect(validertUgyldigIdent.feilmelding).toBe('Identen er ugyldig');

        const fnr = fnrGenerator.next().value;
        if (fnr) {
            act(() => result.current.onChange(fnr));
        }

        expect(result.current.valider(result.current).valideringsstatus).toBe(Valideringsstatus.OK);
    });
});
