import { FeltState, Valideringscontext, Valideringsstatus } from '../../familie-skjema/typer';
import { feil, ok } from '../../familie-skjema/validators';
import { IPeriode } from '../../typer/periode';
import { IPersonResultat, IVilkårResultat, Resultat } from '../../typer/vilkår';

export const validerVilkår = (
    nyttVilkårResultat: FeltState<IVilkårResultat>,
    valideringscontext?: Valideringscontext
): FeltState<IVilkårResultat> => {
    const nyPeriode: FeltState<IPeriode> = nyttVilkårResultat.value.periode.valider(
        nyttVilkårResultat.value.periode,
        valideringscontext
    );

    const nyBegrunnelse: FeltState<string> = nyttVilkårResultat.value.begrunnelse.valider(
        nyttVilkårResultat.value.begrunnelse
    );

    const nyttResultat: FeltState<Resultat> = nyttVilkårResultat.value.resultat.valider(
        nyttVilkårResultat.value.resultat
    );

    const gyldigVilkår: boolean =
        nyPeriode.valideringsstatus === Valideringsstatus.OK &&
        nyBegrunnelse.valideringsstatus === Valideringsstatus.OK &&
        nyttResultat.valideringsstatus === Valideringsstatus.OK;

    const nyVerdi: IVilkårResultat = {
        ...nyttVilkårResultat.value,
        periode: nyPeriode,
        begrunnelse: nyBegrunnelse,
        resultat: nyttResultat,
    };

    return gyldigVilkår
        ? ok({ ...nyttVilkårResultat, value: nyVerdi })
        : feil({ ...nyttVilkårResultat, value: nyVerdi }, '');
};

export const kjørValidering = (vilkårsvurdering: IPersonResultat[]): IPersonResultat[] => {
    return vilkårsvurdering.map((personResultat: IPersonResultat) => {
        return {
            ...personResultat,
            vilkårResultater: personResultat.vilkårResultater.map(
                (vilkårResultat: FeltState<IVilkårResultat>): FeltState<IVilkårResultat> => {
                    return validerVilkår(vilkårResultat);
                }
            ),
        };
    });
};
