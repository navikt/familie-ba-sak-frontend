import type { Avhengigheter, FeltState } from '@navikt/familie-skjema';
import { feil, ok, Valideringsstatus } from '@navikt/familie-skjema';

import type { VedtakBegrunnelse } from '../../../../../typer/vedtak';
import type {
    IPersonResultat,
    IRestAnnenVurdering,
    IVilkårResultat,
    UtdypendeVilkårsvurdering,
} from '../../../../../typer/vilkår';
import { Resultat, VilkårType } from '../../../../../typer/vilkår';
import type { IIsoDatoPeriode } from '../../../../../utils/dato';

export const validerVilkår = (
    nyttVilkårResultat: FeltState<IVilkårResultat>,
    avhengigheter?: Avhengigheter
): FeltState<IVilkårResultat> => {
    const nyPeriode: FeltState<IIsoDatoPeriode> = nyttVilkårResultat.verdi.periode.valider(
        nyttVilkårResultat.verdi.periode,
        {
            ...avhengigheter,
            erEksplisittAvslagPåSøknad: nyttVilkårResultat.verdi.erEksplisittAvslagPåSøknad,
            er18ÅrsVilkår: nyttVilkårResultat.verdi.vilkårType === VilkårType.UNDER_18_ÅR,
        }
    );

    const nyBegrunnelse: FeltState<string> = nyttVilkårResultat.verdi.begrunnelse.valider(
        nyttVilkårResultat.verdi.begrunnelse,
        {
            utdypendeVilkårsvurderinger: nyttVilkårResultat.verdi.utdypendeVilkårsvurderinger.verdi,
            vilkårType: nyttVilkårResultat.verdi.vilkårType,
            regelverk: nyttVilkårResultat.verdi.vurderesEtter,
            personType: avhengigheter?.person.type,
        }
    );

    const nyttResultat: FeltState<Resultat> = nyttVilkårResultat.verdi.resultat.valider(
        nyttVilkårResultat.verdi.resultat,
        {
            vurderesEtter: nyttVilkårResultat.verdi.vurderesEtter,
            resultatBegrunnelse: nyttVilkårResultat.verdi.resultatBegrunnelse,
        }
    );

    const nyeAvslagbegrunnelser: FeltState<VedtakBegrunnelse[]> = nyttVilkårResultat.verdi.avslagBegrunnelser.valider(
        nyttVilkårResultat.verdi.avslagBegrunnelser,
        { erEksplisittAvslagPåSøknad: nyttVilkårResultat.verdi.erEksplisittAvslagPåSøknad }
    );

    const nyUtdypendeVilkårsvurdering: FeltState<UtdypendeVilkårsvurdering[]> =
        nyttVilkårResultat.verdi.utdypendeVilkårsvurderinger.valider(
            nyttVilkårResultat.verdi.utdypendeVilkårsvurderinger,
            {
                personType: avhengigheter?.person.type,
                vilkårType: nyttVilkårResultat.verdi.vilkårType,
                resultat: nyttVilkårResultat.verdi.resultat.verdi,
                vurderesEtter: nyttVilkårResultat.verdi.vurderesEtter,
            }
        );

    const gyldigVilkår: boolean =
        nyPeriode.valideringsstatus === Valideringsstatus.OK &&
        nyBegrunnelse.valideringsstatus === Valideringsstatus.OK &&
        nyttResultat.valideringsstatus === Valideringsstatus.OK &&
        nyeAvslagbegrunnelser.valideringsstatus === Valideringsstatus.OK &&
        nyUtdypendeVilkårsvurdering.valideringsstatus === Valideringsstatus.OK;

    const nyVerdi: IVilkårResultat = {
        ...nyttVilkårResultat.verdi,
        periode: nyPeriode,
        begrunnelse: nyBegrunnelse,
        resultat: nyttResultat,
        avslagBegrunnelser: nyeAvslagbegrunnelser,
        utdypendeVilkårsvurderinger: nyUtdypendeVilkårsvurdering,
    };

    return gyldigVilkår
        ? ok({ ...nyttVilkårResultat, verdi: nyVerdi })
        : feil({ ...nyttVilkårResultat, verdi: nyVerdi }, '');
};

export const kjørValidering = (vilkårsvurdering: IPersonResultat[]): IPersonResultat[] => {
    return vilkårsvurdering.map((personResultat: IPersonResultat) => {
        return {
            ...personResultat,
            vilkårResultater: personResultat.vilkårResultater.map(
                (vilkårResultat: FeltState<IVilkårResultat>): FeltState<IVilkårResultat> => {
                    return validerVilkår(vilkårResultat, {
                        person: personResultat.person,
                    });
                }
            ),
        };
    });
};

export function validerAnnenVurderingResultat(resultat: Resultat): string | undefined {
    return resultat === Resultat.IKKE_VURDERT ? 'Resultat er ikke satt' : undefined;
}

export function erAnnenVurderingGyldig(annenVurdering: IRestAnnenVurdering): boolean {
    return validerAnnenVurderingResultat(annenVurdering.resultat) === undefined;
}
