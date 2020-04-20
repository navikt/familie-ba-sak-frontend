import { IFagsak } from '../../frontend/typer/fagsak';
import { Ressurs, byggSuksessRessurs } from '../../frontend/typer/ressurs';
import { IBehandling, BehandlingSteg } from '../../frontend/typer/behandling';
import { createMock } from 'ts-auto-mock';

export const mockFagsak = (id: number, søkerFødselsnummer: string): Ressurs<IFagsak> | null => {
    const fagsak: IFagsak = createMock<IFagsak>();
    fagsak.id = id;
    fagsak.søkerFødselsnummer = søkerFødselsnummer;
    fagsak.behandlinger = [];
    return byggSuksessRessurs<IFagsak>(fagsak);
};

export const mockBehandling = (
    behandlingId: number,
    aktiv: boolean,
    steg: BehandlingSteg
): IBehandling => {
    const behandling: IBehandling = createMock<IBehandling>();
    behandling.behandlingId = behandlingId;
    behandling.aktiv = aktiv;
    behandling.steg = steg;
    behandling.personer = [];

    return behandling;
};
