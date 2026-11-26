import { BehandlingKategori, BehandlingUnderkategori } from '@typer/behandlingstema';
import type { NoBrand } from '@typer/brand';
import { FagsakId, FagsakStatus, FagsakType, type IMinimalFagsak } from '@typer/fagsak';
import { BehandlingTestdata } from './behandlingTestdata';

export function lagFagsak(fagsak: Partial<NoBrand<IMinimalFagsak>> = {}): IMinimalFagsak {
    const { id = 1, ...resten } = fagsak;
    return {
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
        finnesStrengtFortroligPersonIFagsak: false,
        migreringsdato: '',
        behandlinger: [BehandlingTestdata.lagVisningBehandling()],
        ...resten,
        id: FagsakId.fra(id),
    };
}

export * as FagsakTestdata from './fagsakTestdata';
