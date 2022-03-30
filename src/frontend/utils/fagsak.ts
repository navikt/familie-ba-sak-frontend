import type { VisningBehandling } from '../komponenter/Fagsak/Saksoversikt/visningBehandling';
import type { IMinimalFagsak } from '../typer/fagsak';
import { fagsakStatus } from '../typer/fagsak';
import { kalenderDiff } from './kalender';

export const hentFagsakStatusVisning = (minimalFagsak: IMinimalFagsak): string =>
    minimalFagsak.behandlinger.length === 0
        ? '-'
        : minimalFagsak.underBehandling
        ? 'Under behandling'
        : fagsakStatus[minimalFagsak.status].navn;

export const hentSisteBehandlingPåMinimalFagsak = (
    fagsak: IMinimalFagsak
): VisningBehandling | undefined => {
    if (fagsak.behandlinger.length === 0) {
        return undefined;
    } else {
        return fagsak.behandlinger.sort((a, b) =>
            kalenderDiff(new Date(b.opprettetTidspunkt), new Date(a.opprettetTidspunkt))
        )[0];
    }
};

export const hentAktivBehandlingPåMinimalFagsak = (
    minimalFagsak: IMinimalFagsak
): VisningBehandling | undefined => {
    return minimalFagsak.behandlinger.find((behandling: VisningBehandling) => behandling.aktiv);
};
