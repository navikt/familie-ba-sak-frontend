import { FeltState } from '@navikt/familie-skjema';

import { IBehandling } from '../typer/behandling';
import { fagsakStatus, IFagsak } from '../typer/fagsak';
import { IVedtakForBehandling } from '../typer/vedtak';
import { IPersonResultat, IVilkårResultat, Resultat } from '../typer/vilkår';
import familieDayjs, { familieDayjsDiff } from './familieDayjs';

export const hentFagsakStatusVisning = (fagsak: IFagsak): string =>
    fagsak.underBehandling ? 'Under behandling' : fagsakStatus[fagsak.status].navn;

export const hentSisteBehandlingPåFagsak = (fagsak: IFagsak): IBehandling | undefined => {
    if (fagsak.behandlinger.length === 0) {
        return undefined;
    } else {
        return fagsak.behandlinger.sort((a, b) =>
            familieDayjsDiff(familieDayjs(b.opprettetTidspunkt), familieDayjs(a.opprettetTidspunkt))
        )[0];
    }
};

export const hentAktivBehandlingPåFagsak = (fagsak: IFagsak): IBehandling | undefined => {
    return fagsak.behandlinger.find((behandling: IBehandling) => behandling.aktiv);
};

export const hentBehandlingPåFagsak = (
    fagsak: IFagsak,
    behandlingId: number
): IBehandling | undefined => {
    return fagsak.behandlinger.find(
        (behandling: IBehandling) => behandling.behandlingId === behandlingId
    );
};

export const hentAktivVedtakPåBehandlig = (
    behandling: IBehandling
): IVedtakForBehandling | undefined => {
    return behandling.vedtakForBehandling.find((vedtak: IVedtakForBehandling) => vedtak.aktiv);
};

/**
 * Når man får periodisert vilkårsvurdering med aksjonspunkter
 * må denne ta høyde for at noen perioder kan være innvilget, mens andre er avslått.
 *
 * @param vilkårsvurdering liste av perioder med vilkår
 */
export const alleVilkårPåVilkårsvurderingOppfylt = (vilkårsvurdering: IPersonResultat[]) =>
    vilkårsvurdering.every(personResultat => alleVillkårOppfylt(personResultat.vilkårResultater));

export const alleVillkårOppfylt = (vilkårResultater: FeltState<IVilkårResultat>[]) =>
    vilkårResultater.every(
        vilkårResultat => vilkårResultat.verdi.resultat.verdi !== Resultat.IKKE_OPPFYLT
    );
