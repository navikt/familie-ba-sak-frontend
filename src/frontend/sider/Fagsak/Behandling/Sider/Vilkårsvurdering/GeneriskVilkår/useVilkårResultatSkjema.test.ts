import { lagGrunnlagPerson } from '@testutils/testdata/personTestdata';
import { lagVilkårResultat } from '@testutils/testdata/vilkårResultatTestdata';
import { PersonType } from '@typer/person';
import type { IRestVilkårResultat } from '@typer/vilkår';
import {
    Regelverk,
    Resultat,
    ResultatBegrunnelse,
    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket,
    UtdypendeVilkårsvurderingGenerell,
    VilkårType,
} from '@typer/vilkår';
import { describe, expect, test } from 'vitest';

import { lagVilkårResultatFormValues, tilRestVilkårResultat, VilkårResultatFelt } from './useVilkårResultatSkjema';

const søker = lagGrunnlagPerson({ personIdent: '12345678910', fødselsdato: '1990-01-01', type: PersonType.SØKER });

const lagVilkårResultatForSøker = (overstyrendeProps: Partial<IRestVilkårResultat> = {}): IRestVilkårResultat =>
    lagVilkårResultat({
        periodeFom: '2024-01-01',
        periodeTom: '2024-06-30',
        resultat: Resultat.OPPFYLT,
        vilkårType: VilkårType.LOVLIG_OPPHOLD,
        vurderesEtter: Regelverk.EØS_FORORDNINGEN,
        ...overstyrendeProps,
    });

describe('useVilkårResultatSkjema', () => {
    describe('lagVilkårResultatFormValues', () => {
        test('mapper resultatbegrunnelse IKKE_AKTUELT til radioverdi', () => {
            const values = lagVilkårResultatFormValues(
                lagVilkårResultatForSøker({ resultatBegrunnelse: ResultatBegrunnelse.IKKE_AKTUELT }),
                søker
            );
            expect(values[VilkårResultatFelt.RESULTAT]).toBe(ResultatBegrunnelse.IKKE_AKTUELT);
            expect(values[VilkårResultatFelt.PERIODE]).toEqual({ fom: '2024-01-01', tom: '2024-06-30' });
        });

        test('fjerner utdypende vilkårsvurderinger som ikke er mulige for vilkåret', () => {
            const values = lagVilkårResultatFormValues(
                lagVilkårResultatForSøker({
                    vilkårType: VilkårType.BOSATT_I_RIKET,
                    utdypendeVilkårsvurderinger: [
                        UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING,
                        UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG,
                    ],
                }),
                søker
            );
            expect(values[VilkårResultatFelt.UTDYPENDE_VILKÅRSVURDERINGER]).toEqual([
                UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING,
            ]);
        });
    });

    describe('tilRestVilkårResultat', () => {
        test('IKKE_AKTUELT lagres som OPPFYLT med resultatbegrunnelse', () => {
            const vilkårResultat = lagVilkårResultatForSøker();
            const values = lagVilkårResultatFormValues(vilkårResultat, søker);

            const rest = tilRestVilkårResultat(vilkårResultat, {
                ...values,
                [VilkårResultatFelt.RESULTAT]: ResultatBegrunnelse.IKKE_AKTUELT,
                [VilkårResultatFelt.PERIODE]: { fom: '2024-02-01', tom: undefined },
                [VilkårResultatFelt.BEGRUNNELSE]: 'Ny begrunnelse',
            });

            expect(rest.resultat).toBe(Resultat.OPPFYLT);
            expect(rest.resultatBegrunnelse).toBe(ResultatBegrunnelse.IKKE_AKTUELT);
            expect(rest.periodeFom).toBe('2024-02-01');
            expect(rest.periodeTom).toBeUndefined();
            expect(rest.begrunnelse).toBe('Ny begrunnelse');
            expect(rest.id).toBe(vilkårResultat.id);
            expect(rest.behandlingId).toBe(vilkårResultat.behandlingId);
        });

        test('vanlig resultat nullstiller resultatbegrunnelse', () => {
            const vilkårResultat = lagVilkårResultatForSøker({ resultatBegrunnelse: ResultatBegrunnelse.IKKE_AKTUELT });
            const values = lagVilkårResultatFormValues(vilkårResultat, søker);

            const rest = tilRestVilkårResultat(vilkårResultat, {
                ...values,
                [VilkårResultatFelt.RESULTAT]: Resultat.IKKE_OPPFYLT,
            });

            expect(rest.resultat).toBe(Resultat.IKKE_OPPFYLT);
            expect(rest.resultatBegrunnelse).toBeNull();
        });
    });
});
