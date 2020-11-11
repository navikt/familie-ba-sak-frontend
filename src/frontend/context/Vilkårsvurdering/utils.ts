import { IVilkårResultat, Resultat } from '../../typer/vilkår';
import { IPeriode } from '../../typer/periode';
import { FeltState } from '../../familie-skjema/typer';

export const hentPeriode = (vilkårResultat: FeltState<IVilkårResultat>): IPeriode => {
    return vilkårResultat.value.periode.value;
};

export const hentBegrunnelse = (vilkårResultat: FeltState<IVilkårResultat>): string => {
    return vilkårResultat.value.begrunnelse.value;
};

export const hentResultat = (vilkårResultat: FeltState<IVilkårResultat>): Resultat => {
    return vilkårResultat.value.resultat.value;
};
