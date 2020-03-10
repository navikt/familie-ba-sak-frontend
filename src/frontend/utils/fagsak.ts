import { IFagsak } from '../typer/fagsak';
import moment = require('moment');
import { IBehandling } from '../typer/behandling';

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
