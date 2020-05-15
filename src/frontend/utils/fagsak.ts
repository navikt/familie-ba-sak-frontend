import moment from 'moment';
import { IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { IFelt } from '../typer/felt';
import { IVedtakForBehandling } from '../typer/vedtak';
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

export const hentAktivVedtakPåBehandlig = (
    behandling: IBehandling
): IVedtakForBehandling | undefined => {
    return behandling.vedtakForBehandling.find((vedtak: IVedtakForBehandling) => vedtak.aktiv);
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
                (vilkårResultat: IFelt<IVilkårResultat>) =>
                    vilkårResultat.verdi.resultat.verdi === Resultat.NEI
            )
        ) !== undefined
    ) {
        return false;
    } else {
        return true;
    }
};
