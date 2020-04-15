import { IPersonResultat, IVilkårResultat, Resultat } from '../../typer/vilkår';
import { IPeriode } from '../../typer/periode';
import { Valideringsstatus, feil, IFelt, ok } from '../../typer/felt';

export const validerVilkår = (
    nyttVilkårResultat: IFelt<IVilkårResultat>
): IFelt<IVilkårResultat> => {
    const nyPeriode: IFelt<IPeriode> = nyttVilkårResultat.verdi.periode.valideringsFunksjon(
        nyttVilkårResultat.verdi.periode
    );

    const nyBegrunnelse: IFelt<string> = nyttVilkårResultat.verdi.begrunnelse.valideringsFunksjon(
        nyttVilkårResultat.verdi.begrunnelse
    );

    const nyttResultat: IFelt<Resultat> = nyttVilkårResultat.verdi.resultat.valideringsFunksjon(
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
                (vilkårResultat: IFelt<IVilkårResultat>): IFelt<IVilkårResultat> => {
                    return validerVilkår(vilkårResultat);
                }
            ),
        };
    });
};
