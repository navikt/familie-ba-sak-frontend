import { FeltState, Avhengigheter, Valideringsstatus, feil, ok } from '@navikt/familie-skjema';

import { IPeriode } from '../../typer/periode';
import { IAnnenVurdering, IPersonResultat, IVilkårResultat, Resultat } from '../../typer/vilkår';

export const validerVilkår = (
    nyttVilkårResultat: FeltState<IVilkårResultat>,
    avhengigheter?: Avhengigheter
): FeltState<IVilkårResultat> => {
    const nyPeriode: FeltState<IPeriode> = nyttVilkårResultat.verdi.periode.valider(
        nyttVilkårResultat.verdi.periode,
        {
            ...avhengigheter,
            erEksplisittAvslagPåSøknad: nyttVilkårResultat.verdi.erEksplisittAvslagPåSøknad,
        }
    );

    const nyBegrunnelse: FeltState<string> = nyttVilkårResultat.verdi.begrunnelse.valider(
        nyttVilkårResultat.verdi.begrunnelse
    );

    const nyttResultat: FeltState<Resultat> = nyttVilkårResultat.verdi.resultat.valider(
        nyttVilkårResultat.verdi.resultat
    );

    const gyldigVilkår: boolean =
        nyPeriode.valideringsstatus === Valideringsstatus.OK &&
        nyBegrunnelse.valideringsstatus === Valideringsstatus.OK &&
        nyttResultat.valideringsstatus === Valideringsstatus.OK;

    const nyVerdi: IVilkårResultat = {
        ...nyttVilkårResultat.verdi,
        periode: nyPeriode,
        begrunnelse: nyBegrunnelse,
        resultat: nyttResultat,
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
                    return validerVilkår(vilkårResultat, { person: personResultat.person });
                }
            ),
        };
    });
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

    const gyldigVilkår: boolean =
        nyBegrunnelse.valideringsstatus === Valideringsstatus.OK &&
        nyttResultat.valideringsstatus === Valideringsstatus.OK;

    const nyVerdi: IAnnenVurdering = {
        ...nyttAnnenVurdering.verdi,
        begrunnelse: nyBegrunnelse,
        resultat: nyttResultat,
    };

    return gyldigVilkår
        ? ok({ ...nyttAnnenVurdering, verdi: nyVerdi })
        : feil({ ...nyttAnnenVurdering, verdi: nyVerdi }, '');
};
