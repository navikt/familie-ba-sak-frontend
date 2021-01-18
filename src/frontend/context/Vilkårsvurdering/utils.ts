import { FeltState } from '@navikt/familie-skjema';

import { IPeriode } from '../../typer/periode';
import { IVilkårResultat, Resultat } from '../../typer/vilkår';

export const hentPeriode = (vilkårResultat: FeltState<IVilkårResultat>): IPeriode => {
    return vilkårResultat.verdi.periode.verdi;
};

export const hentBegrunnelse = (vilkårResultat: FeltState<IVilkårResultat>): string => {
    return vilkårResultat.verdi.begrunnelse.verdi;
};

export const hentResultat = (vilkårResultat: FeltState<IVilkårResultat>): Resultat => {
    return vilkårResultat.verdi.resultat.verdi;
};
