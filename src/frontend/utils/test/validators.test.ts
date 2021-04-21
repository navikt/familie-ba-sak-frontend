import { act, renderHook } from '@testing-library/react-hooks';

import { FeltState, useFelt, Valideringsstatus } from '@navikt/familie-skjema';

import generator from '../../testverktøy/fnr/fnr-generator';
import { IPeriode, nyPeriode } from '../../typer/periode';
import { PersonType } from '../../typer/person';
import { Målform } from '../../typer/søknad';
import { VedtakBegrunnelse } from '../../typer/vedtak';
import { Resultat } from '../../typer/vilkår';
import {
    erAvslagBegrunnelserGyldig,
    erPeriodeGyldig,
    erResultatGyldig,
    identValidator,
} from '../validators';

export declare const nyFeltTestState: <T>(
    verdi: T,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    valideringsfunksjon?: (felt: any, metadata?: any) => any | undefined
) => FeltState<T>;

describe('utils/validators', () => {
    const nyFeltState = <T>(verdi: T): FeltState<T> => ({
        feilmelding: '',
        valider: (feltState, _) => feltState,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        verdi,
    });

    const mockBarn = {
        personIdent: '12345678930',
        fødselsdato: '2000-05-17',
        type: PersonType.BARN,
        kjønn: 'KVINNE',
        navn: 'Mock Barn',
        målform: Målform.NB,
    };

    test('Periode uten datoer gir feil hvis ikke avslag', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode(undefined, undefined));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: mockBarn,
            erEksplisittAvslagPåSøknad: false,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual('F.o.m. må settes før du kan gå videre');
    });

    test('Periode uten fom-dato gir feil hvis avslag og tom-dato er satt', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode(undefined, '2010-05-17'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: mockBarn,
            erEksplisittAvslagPåSøknad: true,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual(
            'F.o.m. må settes eller t.o.m. må fjernes før du kan gå videre'
        );
    });

    test('Periode uten fom-dato, tom-dato og som er avslag gir ok', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode(undefined, undefined));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: mockBarn,
            erEksplisittAvslagPåSøknad: true,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.OK);
    });

    test('Periode med fom-dato og ugyldig periode gir feil', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('2010-06-17', '2010-01-17'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: mockBarn,
            erEksplisittAvslagPåSøknad: true,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual('Ugyldig periode');
    });

    test('Periode med fom-dato på oppfylt periode ', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('2010-06-17', '2010-01-17'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: mockBarn,
            erEksplisittAvslagPåSøknad: true,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual('Ugyldig periode');
    });

    test('Periode med fom-dato før barnets fødselsdato på oppfylt periode gir feil', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('1999-05-17', '2018-05-17'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: mockBarn,
            erEksplisittAvslagPåSøknad: false,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual(
            'Du kan ikke legge til periode før barnets fødselsdato'
        );
    });

    test('Periode med etter barnets fødselsdato gir feil på 18 årsvilkåret', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('2000-05-17', '2018-05-17'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: mockBarn,
            erEksplisittAvslagPåSøknad: false,
            er18ÅrsVilkår: true,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual(
            'Du kan ikke legge til periode på dette vilkåret fra barnet har fylt 18 år'
        );
    });

    test('Periode med etter barnets fødselsdato gir ok på andre vilkår', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('2000-05-17', '2018-05-18'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: mockBarn,
            erEksplisittAvslagPåSøknad: false,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.OK);
    });

    test('Periode med innenfor 18 år gir ok på 18 årsvilkåret', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('2000-05-17', '2018-05-16'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: mockBarn,
            erEksplisittAvslagPåSøknad: false,
            er18ÅrsVilkår: true,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.OK);
    });

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

    test('Validering av resultat på vilkår', () => {
        const { result } = renderHook(() =>
            useFelt({
                verdi: Resultat.IKKE_VURDERT,
                valideringsfunksjon: erResultatGyldig,
            })
        );

        const validertIkkeVurdert = result.current.valider(result.current);
        expect(validertIkkeVurdert.valideringsstatus).toBe(Valideringsstatus.FEIL);
        expect(validertIkkeVurdert.feilmelding).toBe('Resultat er ikke satt');

        act(() => result.current.onChange(Resultat.OPPFYLT));
        expect(result.current.valider(result.current).valideringsstatus).toBe(Valideringsstatus.OK);
    });

    test('Validering av avslagsbegrunnelser', () => {
        const { result } = renderHook(() =>
            useFelt({
                verdi: [],
                valideringsfunksjon: erAvslagBegrunnelserGyldig,
            })
        );

        const validertTomListe = result.current.valider(result.current, {
            erEksplisittAvslagPåSøknad: true,
        });
        expect(validertTomListe.valideringsstatus).toBe(Valideringsstatus.FEIL);
        expect(validertTomListe.feilmelding).toBe('Du må velge minst en begrunnelse ved avslag');

        act(() => result.current.onChange([VedtakBegrunnelse.AVSLAG_BOSATT_I_RIKET]));
        expect(
            result.current.valider(result.current, { erEksplisittAvslagPåSøknad: true })
                .valideringsstatus
        ).toBe(Valideringsstatus.OK);
    });
});
