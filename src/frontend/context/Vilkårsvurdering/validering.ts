import { Avhengigheter, feil, FeltState, ok, Valideringsstatus } from '@navikt/familie-skjema';

import { IPeriode } from '../../typer/periode';
import { VedtakBegrunnelse } from '../../typer/vedtak';
import {
    IAnnenVurdering,
    IPersonResultat,
    IVilkårResultat,
    Resultat,
    VilkårType,
} from '../../typer/vilkår';

export const validerVilkår = (
    nyttVilkårResultat: FeltState<IVilkårResultat>,
    avhengigheter?: Avhengigheter
): FeltState<IVilkårResultat> => {
    const nyPeriode: FeltState<IPeriode> = nyttVilkårResultat.verdi.periode.valider(
        nyttVilkårResultat.verdi.periode,
        {
            ...avhengigheter,
            erEksplisittAvslagPåSøknad: nyttVilkårResultat.verdi.erEksplisittAvslagPåSøknad,
            er18ÅrsVilkår: nyttVilkårResultat.verdi.vilkårType === VilkårType.UNDER_18_ÅR,
        }
    );

    const nyBegrunnelse: FeltState<string> = nyttVilkårResultat.verdi.begrunnelse.valider(
        nyttVilkårResultat.verdi.begrunnelse
    );

    const nyttResultat: FeltState<Resultat> = nyttVilkårResultat.verdi.resultat.valider(
        nyttVilkårResultat.verdi.resultat
    );

    const nyeAvslagbegrunnelser: FeltState<
        VedtakBegrunnelse[]
    > = nyttVilkårResultat.verdi.avslagBegrunnelser.valider(
        nyttVilkårResultat.verdi.avslagBegrunnelser,
        { erEksplisittAvslagPåSøknad: nyttVilkårResultat.verdi.erEksplisittAvslagPåSøknad }
    );

    const gyldigVilkår: boolean =
        nyPeriode.valideringsstatus === Valideringsstatus.OK &&
        nyBegrunnelse.valideringsstatus === Valideringsstatus.OK &&
        nyttResultat.valideringsstatus === Valideringsstatus.OK &&
        nyeAvslagbegrunnelser.valideringsstatus === Valideringsstatus.OK;

    const nyVerdi: IVilkårResultat = {
        ...nyttVilkårResultat.verdi,
        periode: nyPeriode,
        begrunnelse: nyBegrunnelse,
        resultat: nyttResultat,
        avslagBegrunnelser: nyeAvslagbegrunnelser,
    };

    return gyldigVilkår
        ? ok({ ...nyttVilkårResultat, verdi: nyVerdi })
        : feil({ ...nyttVilkårResultat, verdi: nyVerdi }, '');
};

export const validerAnnenVurdering = (
    nyttAnnenVurdering: FeltState<IAnnenVurdering>
): FeltState<IAnnenVurdering> => {
    const nyBegrunnelse: FeltState<string> = nyttAnnenVurdering.verdi.begrunnelse.valider(
        nyttAnnenVurdering.verdi.begrunnelse
    );

    const nyttResultat: FeltState<Resultat> = nyttAnnenVurdering.verdi.resultat.valider(
        nyttAnnenVurdering.verdi.resultat
    );

    const gyldigAnnenVurdering: boolean =
        nyBegrunnelse.valideringsstatus === Valideringsstatus.OK &&
        nyttResultat.valideringsstatus === Valideringsstatus.OK;

    const nyVerdi: IAnnenVurdering = {
        ...nyttAnnenVurdering.verdi,
        begrunnelse: nyBegrunnelse,
        resultat: nyttResultat,
    };

    return gyldigAnnenVurdering
        ? ok({ ...nyttAnnenVurdering, verdi: nyVerdi })
        : feil({ ...nyttAnnenVurdering, verdi: nyVerdi }, '');
};

export const kjørValidering = (vilkårsvurdering: IPersonResultat[]): IPersonResultat[] => {
    return vilkårsvurdering.map((personResultat: IPersonResultat) => {
        return {
            ...personResultat,
            vilkårResultater: personResultat.vilkårResultater.map(
                (vilkårResultat: FeltState<IVilkårResultat>): FeltState<IVilkårResultat> => {
                    return validerVilkår(vilkårResultat, { person: personResultat.person });
                }
            ),
            andreVurderinger: personResultat.andreVurderinger.map(
                (annenVurdering: FeltState<IAnnenVurdering>): FeltState<IAnnenVurdering> => {
                    return validerAnnenVurdering(annenVurdering);
                }
            ),
        };
    });
};
