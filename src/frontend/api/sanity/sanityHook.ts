import { VedtakBegrunnelseType } from '../../typer/vedtak';
import { VilkårType } from '../../typer/vilkår';
import { hentBegrunnelserQuery } from './queries';
import { sanity } from './sanity';

export interface Begrunnelsedata {
    apiNavn: string;
    navnISystem: string;
    vilkår: VilkårType;
    begrunnelsetype: VedtakBegrunnelseType;
}

export const useSanity = () => {
    const hentBegrunnelser = (): Promise<Begrunnelsedata[]> => sanity.fetch(hentBegrunnelserQuery);

    return { hentBegrunnelser };
};
