import moment from 'moment';
import { IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { IPersonResultat, IVilkårResultat, Resultat } from '../typer/vilkår';

export const hentSisteBehandlingPåFagsak = (fagsak: IFagsak): IBehandling | undefined => {
    if (fagsak.behandlinger.length === 0) {
        return undefined;
    } else {
        return fagsak.behandlinger.sort((a, b) =>
            moment(b.opprettetTidspunkt).diff(a.opprettetTidspunkt)
        )[0];
    }
};

export const hentAktivBehandlingPåFagsak = (fagsak: IFagsak): IBehandling | undefined => {
    return fagsak.behandlinger.find((behandling: IBehandling) => behandling.aktiv === true);
};

/**
 * Ser om det finnes minst 1 vilkår som ikke er oppfylt.
 * Når man får periodisert vilkårsvurdering med aksjonspunkter
 * må denne ta høyde for at noen perioder kan være innvilget, mens andre er avslått.
 *
 * @param vilkårsvurdering liste av perioder med vilkår
 */
export const erBehandlingenInnvilget = (vilkårsvurdering: IPersonResultat[]) => {
    if (
        vilkårsvurdering.find((personResultat: IPersonResultat) =>
            personResultat.vilkårResultater.find(
                (vilkårResultat: IVilkårResultat) => vilkårResultat.resultat === Resultat.NEI
            )
        ) !== undefined
    ) {
        return false;
    } else {
        return true;
    }
};
