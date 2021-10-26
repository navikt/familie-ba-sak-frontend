import { VisningBehandling } from '../komponenter/Fagsak/Saksoversikt/visningBehandling';
import { IBehandling } from '../typer/behandling';
import { fagsakStatus, IFagsak, IMinimalFagsak } from '../typer/fagsak';
import { IVedtakForBehandling } from '../typer/vedtak';
import { kalenderDiff } from './kalender';

export const hentFagsakStatusVisning = (minimalFagsak: IMinimalFagsak): string =>
    minimalFagsak.underBehandling ? 'Under behandling' : fagsakStatus[minimalFagsak.status].navn;

export const hentSisteBehandlingPåFagsak = (fagsak: IFagsak): IBehandling | undefined => {
    if (fagsak.behandlinger.length === 0) {
        return undefined;
    } else {
        return fagsak.behandlinger.sort((a, b) =>
            kalenderDiff(new Date(b.opprettetTidspunkt), new Date(a.opprettetTidspunkt))
        )[0];
    }
};

export const hentAktivBehandlingPåFagsak = (fagsak: IFagsak): IBehandling | undefined => {
    return fagsak.behandlinger.find((behandling: IBehandling) => behandling.aktiv);
};

export const hentAktivBehandlingPåMinimalFagsak = (
    minimalFagsak: IMinimalFagsak
): VisningBehandling | undefined => {
    return minimalFagsak.behandlinger.find((behandling: VisningBehandling) => behandling.aktiv);
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
