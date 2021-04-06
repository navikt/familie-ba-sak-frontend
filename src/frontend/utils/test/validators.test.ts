import { FeltState, Valideringsstatus } from '@navikt/familie-skjema';

import { IPeriode, nyPeriode } from '../../typer/periode';
import { PersonType } from '../../typer/person';
import { Målform } from '../../typer/søknad';
import { erPeriodeGyldig } from '../validators';

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
            'Du kan ikke legge til periode på dette vilkåret etter barnet har fylt 18 år'
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
});
