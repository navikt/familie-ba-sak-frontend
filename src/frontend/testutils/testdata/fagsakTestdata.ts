import { BehandlingTestdata } from './behandlingTestdata';
import { BehandlingKategori, BehandlingUnderkategori } from '../../typer/behandlingstema';
import { FagsakStatus, FagsakType, type IMinimalFagsak } from '../../typer/fagsak';

export function lagFagsak(fagsak?: Partial<IMinimalFagsak>): IMinimalFagsak {
    return {
        id: 1,
        fagsakeier: '12345678910',
        opprettetTidspunkt: '2020-09-19T09:08:56.8',
        saksnummer: '1234',
        status: FagsakStatus.LØPENDE,
        søkerFødselsnummer: '12345678910',
        underBehandling: false,
        løpendeKategori: BehandlingKategori.NASJONAL,
        løpendeUnderkategori: BehandlingUnderkategori.ORDINÆR,
        fagsakType: FagsakType.NORMAL,
        institusjon: undefined,
        migreringsdato: '',
        behandlinger: [BehandlingTestdata.lagVisningBehandling()],
        gjeldendeUtbetalingsperioder: [],
        ...(fagsak ?? {}),
    };
}

export * as FagsakTestdata from './fagsakTestdata';
