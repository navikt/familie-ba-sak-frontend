import { feil, IFelt, ok, Valideringsmetadata, Valideringsstatus } from '../../familie-skjema/felt';
import { IPeriode } from '../../typer/periode';
import { IPersonResultat, IVilkårResultat, Resultat } from '../../typer/vilkår';

export const validerVilkår = (
    nyttVilkårResultat: IFelt<IVilkårResultat>,
    valideringsmetadata?: Valideringsmetadata
): IFelt<IVilkårResultat> => {
    const nyPeriode: IFelt<IPeriode> = nyttVilkårResultat.verdi.periode.valider(
        nyttVilkårResultat.verdi.periode,
        valideringsmetadata
    );

    const nyBegrunnelse: IFelt<string> = nyttVilkårResultat.verdi.begrunnelse.valider(
        nyttVilkårResultat.verdi.begrunnelse
    );

    const nyttResultat: IFelt<Resultat> = nyttVilkårResultat.verdi.resultat.valider(
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
