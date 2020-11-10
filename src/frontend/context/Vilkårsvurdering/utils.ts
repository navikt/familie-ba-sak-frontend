import { IFelt } from '../../familie-skjema/felt';
import { IVilkårResultat, Resultat } from '../../typer/vilkår';
import { IPeriode } from '../../typer/periode';

export const hentPeriode = (vilkårResultat: IFelt<IVilkårResultat>): IPeriode => {
    return vilkårResultat.verdi.periode.verdi;
};

export const hentBegrunnelse = (vilkårResultat: IFelt<IVilkårResultat>): string => {
    return vilkårResultat.verdi.begrunnelse.verdi;
};

export const hentResultat = (vilkårResultat: IFelt<IVilkårResultat>): Resultat => {
    return vilkårResultat.verdi.resultat.verdi;
};
