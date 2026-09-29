import { lagAnnenVurdering } from '@testutils/testdata/annenVurderingTestdata';
import { lagGrunnlagPerson } from '@testutils/testdata/personTestdata';
import type { IGrunnlagPerson } from '@typer/person';
import { PersonType } from '@typer/person';
import {
    Regelverk,
    Resultat,
    ResultatBegrunnelse,
    UtdypendeVilkårsvurderingDeltBosted,
    UtdypendeVilkårsvurderingEøsBarnBorMedSøker,
    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket,
    UtdypendeVilkårsvurderingGenerell,
    UtdypendeVilkårsvurderingNasjonal,
    VilkårType,
} from '@typer/vilkår';
import { nyIsoDatoPeriode } from '@utils/dato';
import { describe, expect, test } from 'vitest';
import {
    erAnnenVurderingGyldig,
    validerBegrunnelse,
    validerPeriode,
    validerResultat,
    validerUtdypendeVilkårsvurderinger,
} from './validering';

const lagPerson = (person: Partial<IGrunnlagPerson> = {}) =>
    lagGrunnlagPerson({ personIdent: '12345678930', fødselsdato: '2000-05-17', type: PersonType.BARN, ...person });

describe('vilkårsvurdering/validering', () => {
    describe('validerPeriode', () => {
        test('Periode med ugyldig fom gir feil', () => {
            const feilmelding = validerPeriode(nyIsoDatoPeriode('400220', undefined), {
                person: lagPerson(),
                erEksplisittAvslagPåSøknad: false,
            });
            expect(feilmelding).toEqual('Ugyldig f.o.m.');
        });

        test('Periode med ugyldig tom gir feil', () => {
            const feilmelding = validerPeriode(nyIsoDatoPeriode('2020-06-17', '400220'), {
                person: lagPerson(),
                erEksplisittAvslagPåSøknad: false,
            });
            expect(feilmelding).toEqual('Ugyldig t.o.m.');
        });

        test('Periode uten datoer gir feil hvis ikke avslag', () => {
            const feilmelding = validerPeriode(nyIsoDatoPeriode(undefined, undefined), {
                person: lagPerson(),
                erEksplisittAvslagPåSøknad: false,
            });
            expect(feilmelding).toEqual('F.o.m. må settes før du kan gå videre');
        });

        test('Periode uten fom-dato gir feil hvis avslag og tom-dato er satt', () => {
            const feilmelding = validerPeriode(nyIsoDatoPeriode(undefined, '2010-05-17'), {
                person: lagPerson(),
                erEksplisittAvslagPåSøknad: true,
            });
            expect(feilmelding).toEqual('F.o.m. må settes eller t.o.m. må fjernes før du kan gå videre');
        });

        test('Periode uten fom-dato, tom-dato og som er avslag gir ok', () => {
            const feilmelding = validerPeriode(nyIsoDatoPeriode(undefined, undefined), {
                person: lagPerson(),
                erEksplisittAvslagPåSøknad: true,
            });
            expect(feilmelding).toBeUndefined();
        });

        test('Periode med fom-dato på oppfylt periode senere enn tom', () => {
            const feilmelding = validerPeriode(nyIsoDatoPeriode('2010-06-17', '2010-01-17'), {
                person: lagPerson(),
                erEksplisittAvslagPåSøknad: true,
            });
            expect(feilmelding).toEqual('F.o.m må settes tidligere enn t.o.m');
        });

        test('Periode med fom-dato før barnets fødselsdato på oppfylt periode gir feil', () => {
            const feilmelding = validerPeriode(nyIsoDatoPeriode('1999-05-17', '2018-05-17'), {
                person: lagPerson(),
                erEksplisittAvslagPåSøknad: false,
            });
            expect(feilmelding).toEqual('Du kan ikke legge til periode før barnets fødselsdato');
        });

        test('Periode med tom-dato etter barnets dødsfalldato gir feil', () => {
            const feilmelding = validerPeriode(nyIsoDatoPeriode('2000-05-17', '2021-05-17'), {
                person: lagPerson({ dødsfallDato: '2020-12-12' }),
                erEksplisittAvslagPåSøknad: false,
            });
            expect(feilmelding).toEqual('Du kan ikke sette til og med dato etter dødsfalldato');
        });

        test('Periode med fom-dato lik som tom-dato skal ikke være mulig dersom det ikke er barnets dødsfallsdato', () => {
            const feilmelding = validerPeriode(nyIsoDatoPeriode('2020-12-12', '2020-12-12'), {
                person: lagPerson(),
                erEksplisittAvslagPåSøknad: false,
            });
            expect(feilmelding).toEqual('F.o.m må settes tidligere enn t.o.m');
        });

        test('Periode med fom-dato lik som tom-dato skal være mulig dersom det er barnets dødsfallsdato', () => {
            const feilmelding = validerPeriode(nyIsoDatoPeriode('2020-12-12', '2020-12-12'), {
                person: lagPerson({ dødsfallDato: '2020-12-12' }),
                erEksplisittAvslagPåSøknad: false,
            });
            expect(feilmelding).toBeUndefined();
        });

        test('Periode med etter barnets fødselsdato gir feil på 18 årsvilkåret', () => {
            const feilmelding = validerPeriode(nyIsoDatoPeriode('2000-05-17', '2018-05-17'), {
                person: lagPerson(),
                erEksplisittAvslagPåSøknad: false,
                er18ÅrsVilkår: true,
            });
            expect(feilmelding).toEqual('Du kan ikke legge til periode på dette vilkåret fra barnet har fylt 18 år');
        });

        test('Periode med etter barnets fødselsdato gir ok på andre vilkår', () => {
            const feilmelding = validerPeriode(nyIsoDatoPeriode('2000-05-17', '2018-05-18'), {
                person: lagPerson(),
                erEksplisittAvslagPåSøknad: false,
            });
            expect(feilmelding).toBeUndefined();
        });

        test('Periode med innenfor 18 år gir ok på 18 årsvilkåret', () => {
            const feilmelding = validerPeriode(nyIsoDatoPeriode('2000-05-17', '2018-05-16'), {
                person: lagPerson(),
                erEksplisittAvslagPåSøknad: false,
                er18ÅrsVilkår: true,
            });
            expect(feilmelding).toBeUndefined();
        });
    });

    describe('validerBegrunnelse', () => {
        const nasjonalBarn = {
            vilkårType: VilkårType.BOR_MED_SØKER,
            regelverk: Regelverk.NASJONALE_REGLER,
            personType: PersonType.BARN,
        };

        test('Begrunnelse må oppgis dersom Utdypende vilkårsvurdering er valgt', () => {
            expect(
                validerBegrunnelse('begrunnelse', {
                    ...nasjonalBarn,
                    utdypendeVilkårsvurderinger: [UtdypendeVilkårsvurderingNasjonal.VURDERT_MEDLEMSKAP],
                })
            ).toBeUndefined();

            expect(validerBegrunnelse('', { ...nasjonalBarn, utdypendeVilkårsvurderinger: [] })).toBeUndefined();

            const forventetFeilmelding =
                'Du har gjort ett eller flere valg under "Utdypende vilkårsvurdering" og må derfor fylle inn en begrunnelse';

            expect(
                validerBegrunnelse('', {
                    ...nasjonalBarn,
                    utdypendeVilkårsvurderinger: [UtdypendeVilkårsvurderingNasjonal.VURDERT_MEDLEMSKAP],
                })
            ).toBe(forventetFeilmelding);

            expect(
                validerBegrunnelse('', {
                    ...nasjonalBarn,
                    utdypendeVilkårsvurderinger: [UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG],
                })
            ).toBe(forventetFeilmelding);

            expect(
                validerBegrunnelse('', {
                    ...nasjonalBarn,
                    utdypendeVilkårsvurderinger: [UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED],
                })
            ).toBe(forventetFeilmelding);

            expect(
                validerBegrunnelse('', {
                    utdypendeVilkårsvurderinger: [],
                    regelverk: Regelverk.NASJONALE_REGLER,
                    vilkårType: VilkårType.UTVIDET_BARNETRYGD,
                    personType: PersonType.SØKER,
                })
            ).toBe('Du må fylle inn en begrunnelse');
        });

        test('Begrunnelse validering for EØS forordningen', () => {
            expect(
                validerBegrunnelse('', {
                    utdypendeVilkårsvurderinger: [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_EØS_MED_SØKER],
                    regelverk: Regelverk.EØS_FORORDNINGEN,
                    vilkårType: VilkårType.BOR_MED_SØKER,
                    personType: PersonType.BARN,
                })
            ).toBeUndefined();

            expect(
                validerBegrunnelse('', {
                    utdypendeVilkårsvurderinger: [],
                    regelverk: Regelverk.EØS_FORORDNINGEN,
                    vilkårType: VilkårType.LOVLIG_OPPHOLD,
                    personType: PersonType.SØKER,
                })
            ).toBeUndefined();

            expect(
                validerBegrunnelse('', {
                    utdypendeVilkårsvurderinger: [
                        UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING,
                    ],
                    regelverk: Regelverk.EØS_FORORDNINGEN,
                    vilkårType: VilkårType.BOSATT_I_RIKET,
                    personType: PersonType.SØKER,
                })
            ).toBe('Du må fylle inn en begrunnelse');

            expect(
                validerBegrunnelse('', {
                    utdypendeVilkårsvurderinger: [],
                    regelverk: Regelverk.EØS_FORORDNINGEN,
                    vilkårType: VilkårType.UTVIDET_BARNETRYGD,
                    personType: PersonType.SØKER,
                })
            ).toBe('Du må fylle inn en begrunnelse');
        });
    });

    describe('validerResultat', () => {
        test('Ikke vurdert gir feil', () => {
            expect(validerResultat(Resultat.IKKE_VURDERT, { vurderesEtter: null })).toBe('Resultat er ikke satt');
        });

        test('Oppfylt gir ok', () => {
            expect(validerResultat(Resultat.OPPFYLT, { vurderesEtter: null })).toBeUndefined();
        });

        test('Ikke aktuelt er kun gyldig etter EØS-forordningen', () => {
            expect(
                validerResultat(ResultatBegrunnelse.IKKE_AKTUELT, { vurderesEtter: Regelverk.EØS_FORORDNINGEN })
            ).toBeUndefined();
            expect(
                validerResultat(ResultatBegrunnelse.IKKE_AKTUELT, { vurderesEtter: Regelverk.NASJONALE_REGLER })
            ).toBe('Resultat er ikke satt');
        });
    });

    describe('validerUtdypendeVilkårsvurderinger', () => {
        test('EØS-alternativer uten regelverk gir ugyldig kombinasjon', () => {
            const feilmelding = validerUtdypendeVilkårsvurderinger(
                [
                    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING,
                    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING_UTLAND,
                ],
                {
                    personType: PersonType.SØKER,
                    vilkårType: VilkårType.BOSATT_I_RIKET,
                    resultat: Resultat.OPPFYLT,
                    vurderesEtter: null,
                }
            );
            expect(feilmelding).toBe('Du har valgt en ugyldig kombinasjon');
        });
    });

    describe('erAnnenVurderingGyldig', () => {
        test('vurdert annen vurdering er gyldig', () => {
            expect(erAnnenVurderingGyldig(lagAnnenVurdering({ resultat: Resultat.OPPFYLT }))).toBe(true);
            expect(erAnnenVurderingGyldig(lagAnnenVurdering({ resultat: Resultat.IKKE_OPPFYLT }))).toBe(true);
        });

        test('ikke vurdert annen vurdering er ugyldig', () => {
            expect(erAnnenVurderingGyldig(lagAnnenVurdering({ resultat: Resultat.IKKE_VURDERT }))).toBe(false);
        });
    });
});
