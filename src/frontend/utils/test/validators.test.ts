import { act, renderHook } from '@testing-library/react-hooks';

import { useFelt, Valideringsstatus } from '@navikt/familie-skjema';
import type { FeltState } from '@navikt/familie-skjema';
import { kjønnType } from '@navikt/familie-typer';

import generator from '../../testverktøy/fnr/fnr-generator';
import type { IGrunnlagPerson } from '../../typer/person';
import { PersonType } from '../../typer/person';
import { Målform } from '../../typer/søknad';
import type { UtdypendeVilkårsvurdering } from '../../typer/vilkår';
import { Regelverk, UtdypendeVilkårsvurderingEøsBarnBorMedSøker } from '../../typer/vilkår';
import {
    Resultat,
    VilkårType,
    UtdypendeVilkårsvurderingDeltBosted,
    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket,
    UtdypendeVilkårsvurderingGenerell,
    UtdypendeVilkårsvurderingNasjonal,
} from '../../typer/vilkår';
import type { IPeriode } from '../kalender';
import { nyPeriode } from '../kalender';
import type { UtdypendeVilkårsvurderingAvhengigheter } from '../utdypendeVilkårsvurderinger';
import {
    erBegrunnelseGyldig,
    erPeriodeGyldig,
    erResultatGyldig,
    erUtdypendeVilkårsvurderingerGyldig,
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

    const grunnlagPersonFixture = (overstyrendeProps: Partial<IGrunnlagPerson> = {}) => {
        const defaults: IGrunnlagPerson = {
            personIdent: '12345678930',
            fødselsdato: '2000-05-17',
            type: PersonType.BARN,
            kjønn: kjønnType.KVINNE,
            navn: 'Mock Barn',
            målform: Målform.NB,
        };

        return { ...defaults, ...overstyrendeProps };
    };

    test('Periode med ugyldig fom gir feil', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('400220', undefined));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: grunnlagPersonFixture(),
            erEksplisittAvslagPåSøknad: false,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual('Ugyldig f.o.m.');
    });

    test('Periode med ugyldig tom gir feil', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('2020-06-17', '400220'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: grunnlagPersonFixture(),
            erEksplisittAvslagPåSøknad: false,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual('Ugyldig t.o.m.');
    });

    test('Periode uten datoer gir feil hvis ikke avslag', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode(undefined, undefined));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: grunnlagPersonFixture(),
            erEksplisittAvslagPåSøknad: false,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual('F.o.m. må settes før du kan gå videre');
    });

    test('Periode uten fom-dato gir feil hvis avslag og tom-dato er satt', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode(undefined, '2010-05-17'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: grunnlagPersonFixture(),
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
            person: grunnlagPersonFixture(),
            erEksplisittAvslagPåSøknad: true,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.OK);
    });

    test('Periode med fom-dato på oppfylt periode senere enn tom', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('2010-06-17', '2010-01-17'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: grunnlagPersonFixture(),
            erEksplisittAvslagPåSøknad: true,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual('F.o.m må settes tidligere enn t.o.m');
    });

    test('Periode med fom-dato før barnets fødselsdato på oppfylt periode gir feil', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('1999-05-17', '2018-05-17'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: grunnlagPersonFixture(),
            erEksplisittAvslagPåSøknad: false,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual(
            'Du kan ikke legge til periode før barnets fødselsdato'
        );
    });

    test('Periode med tom-dato etter barnets dødsfalldato gir feil', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('2000-05-17', '2021-05-17'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: grunnlagPersonFixture({ dødsfallDato: '2020-12-12' }),
            erEksplisittAvslagPåSøknad: false,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual(
            'Du kan ikke sette til og med dato etter dødsfalldato'
        );
    });

    test('Periode med fom-dato lik som tom-dato skal ikke være mulig dersom det ikke er barnets dødsfallsdato', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('2020-12-12', '2020-12-12'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: grunnlagPersonFixture(),
            erEksplisittAvslagPåSøknad: false,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual('F.o.m må settes tidligere enn t.o.m');
    });

    test('Periode med fom-dato lik som tom-dato skal være mulig dersom det er barnets dødsfallsdato', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('2020-12-12', '2020-12-12'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: grunnlagPersonFixture({ dødsfallDato: '2020-12-12' }),
            erEksplisittAvslagPåSøknad: false,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.OK);
    });

    test('Periode med etter barnets fødselsdato gir feil på 18 årsvilkåret', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('2000-05-17', '2018-05-17'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: grunnlagPersonFixture(),
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
            person: grunnlagPersonFixture(),
            erEksplisittAvslagPåSøknad: false,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.OK);
    });

    test('Periode med innenfor 18 år gir ok på 18 årsvilkåret', () => {
        const periode: FeltState<IPeriode> = nyFeltState(nyPeriode('2000-05-17', '2018-05-16'));
        const valideringsresultat = erPeriodeGyldig(periode, {
            person: grunnlagPersonFixture(),
            erEksplisittAvslagPåSøknad: false,
            er18ÅrsVilkår: true,
        });
        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.OK);
    });

    test('Begrunnelse må oppgis dersom Utdypende vilkårsvurdering er valgt', () => {
        const valideringBegrunnelseOppgitt = erBegrunnelseGyldig(nyFeltState('begrunnelse'), {
            utdypendeVilkårsvurderinger: [UtdypendeVilkårsvurderingNasjonal.VURDERT_MEDLEMSKAP],
        });
        expect(valideringBegrunnelseOppgitt.valideringsstatus).toEqual(Valideringsstatus.OK);

        const valideringVurderingIkkeValgt = erBegrunnelseGyldig(nyFeltState(''), {
            utdypendeVilkårsvurderinger: [],
        });
        expect(valideringVurderingIkkeValgt.valideringsstatus).toEqual(Valideringsstatus.OK);

        const valideringMedlemskapVurdertManglerBegrunnelse = erBegrunnelseGyldig(nyFeltState(''), {
            utdypendeVilkårsvurderinger: [UtdypendeVilkårsvurderingNasjonal.VURDERT_MEDLEMSKAP],
            regelverk: Regelverk.NASJONALE_REGLER,
        });
        expect(valideringMedlemskapVurdertManglerBegrunnelse.valideringsstatus).toEqual(
            Valideringsstatus.FEIL
        );
        expect(valideringMedlemskapVurdertManglerBegrunnelse.feilmelding).toBe(
            'Du har gjort ett eller flere valg under "Utdypende vilkårsvurdering" og må derfor fylle inn en begrunnelse'
        );

        const valideringSkjønnsmessigVurderingManglerBegrunnelse = erBegrunnelseGyldig(
            nyFeltState(''),
            {
                utdypendeVilkårsvurderinger: [
                    UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG,
                ],
                regelverk: Regelverk.NASJONALE_REGLER,
            }
        );
        expect(valideringSkjønnsmessigVurderingManglerBegrunnelse.valideringsstatus).toEqual(
            Valideringsstatus.FEIL
        );
        expect(valideringSkjønnsmessigVurderingManglerBegrunnelse.feilmelding).toBe(
            'Du har gjort ett eller flere valg under "Utdypende vilkårsvurdering" og må derfor fylle inn en begrunnelse'
        );

        const valideringDeltBostedManglerBegrunnelse = erBegrunnelseGyldig(nyFeltState(''), {
            utdypendeVilkårsvurderinger: [UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED],
            regelverk: Regelverk.NASJONALE_REGLER,
        });
        expect(valideringDeltBostedManglerBegrunnelse.valideringsstatus).toEqual(
            Valideringsstatus.FEIL
        );
        expect(valideringDeltBostedManglerBegrunnelse.feilmelding).toBe(
            'Du har gjort ett eller flere valg under "Utdypende vilkårsvurdering" og må derfor fylle inn en begrunnelse'
        );

        const valideringManglerBegrunnelseForSøkerMedUtvidetVilkår = erBegrunnelseGyldig(
            nyFeltState(''),
            {
                utdypendeVilkårsvurderinger: [],
                regelverk: Regelverk.NASJONALE_REGLER,
                vilkårType: VilkårType.UTVIDET_BARNETRYGD,
                personType: PersonType.SØKER,
            }
        );
        expect(valideringManglerBegrunnelseForSøkerMedUtvidetVilkår.valideringsstatus).toEqual(
            Valideringsstatus.FEIL
        );
        expect(valideringManglerBegrunnelseForSøkerMedUtvidetVilkår.feilmelding).toBe(
            'Du må fylle inn en begrunnelse'
        );

        const valideringBegrunnelseIkkeOppgittNårIngenErValgt = erBegrunnelseGyldig(
            nyFeltState(''),
            {
                utdypendeVilkårsvurderinger: [],
            }
        );
        expect(valideringBegrunnelseIkkeOppgittNårIngenErValgt.valideringsstatus).toEqual(
            Valideringsstatus.OK
        );
    });

    test('Begrunnelse validering for EØS forordningen', () => {
        const valideringValgfriBegrunnelseForBarn = erBegrunnelseGyldig(nyFeltState(''), {
            utdypendeVilkårsvurderinger: [
                UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_EØS_MED_SØKER,
            ],
            regelverk: Regelverk.EØS_FORORDNINGEN,
            vilkårType: VilkårType.BOR_MED_SØKER,
            personType: PersonType.BARN,
        });
        expect(valideringValgfriBegrunnelseForBarn.valideringsstatus).toEqual(Valideringsstatus.OK);

        const valideringValgfriBegrunnelseForSøkedMedVilkårTypeLovligOpphold = erBegrunnelseGyldig(
            nyFeltState(''),
            {
                utdypendeVilkårsvurderinger: [],
                regelverk: Regelverk.EØS_FORORDNINGEN,
                vilkårType: VilkårType.LOVLIG_OPPHOLD,
                personType: PersonType.SØKER,
            }
        );
        expect(
            valideringValgfriBegrunnelseForSøkedMedVilkårTypeLovligOpphold.valideringsstatus
        ).toEqual(Valideringsstatus.OK);

        const valideringManglerBegrunnelseForSøkerMedVilkårTypeBosattIRiket = erBegrunnelseGyldig(
            nyFeltState(''),
            {
                utdypendeVilkårsvurderinger: [
                    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING,
                ],
                regelverk: Regelverk.EØS_FORORDNINGEN,
                vilkårType: VilkårType.BOSATT_I_RIKET,
                personType: PersonType.SØKER,
            }
        );
        expect(
            valideringManglerBegrunnelseForSøkerMedVilkårTypeBosattIRiket.valideringsstatus
        ).toEqual(Valideringsstatus.FEIL);
        expect(valideringManglerBegrunnelseForSøkerMedVilkårTypeBosattIRiket.feilmelding).toBe(
            'Du må fylle inn en begrunnelse'
        );

        const valideringManglerBegrunnelseForSøkerMedUtvidetVilkår = erBegrunnelseGyldig(
            nyFeltState(''),
            {
                utdypendeVilkårsvurderinger: [],
                regelverk: Regelverk.EØS_FORORDNINGEN,
                vilkårType: VilkårType.UTVIDET_BARNETRYGD,
                personType: PersonType.SØKER,
            }
        );
        expect(valideringManglerBegrunnelseForSøkerMedUtvidetVilkår.valideringsstatus).toEqual(
            Valideringsstatus.FEIL
        );
        expect(valideringManglerBegrunnelseForSøkerMedUtvidetVilkår.feilmelding).toBe(
            'Du må fylle inn en begrunnelse'
        );
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
    test('Validering av utdypende vilkårsvurdering', () => {
        const utdypendeVilkårsvurderinger: UtdypendeVilkårsvurdering[] = [
            UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING,
            UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING_UTLAND,
        ];
        const utdypendeVilkårsvurderingAvhengigheter: UtdypendeVilkårsvurderingAvhengigheter = {
            personType: PersonType.SØKER,
            vilkårType: VilkårType.BOSATT_I_RIKET,
            resultat: Resultat.OPPFYLT,
            vurderesEtter: null,
            brukEøs: true,
        };
        const valideringForMangeValgteAlternativer = erUtdypendeVilkårsvurderingerGyldig(
            nyFeltState(utdypendeVilkårsvurderinger),
            utdypendeVilkårsvurderingAvhengigheter
        );
        expect(valideringForMangeValgteAlternativer.valideringsstatus).toEqual(
            Valideringsstatus.FEIL
        );
    });
});
