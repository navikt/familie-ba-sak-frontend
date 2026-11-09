import { FagsakStatus, type IMinimalFagsak } from '@typer/fagsak';

export type Fagsaknavigering =
    | { status: 'FUNNET'; fagsak: IMinimalFagsak }
    | { status: 'INGEN_FAGSAKER' }
    | { status: 'FLERE_FAGSAKER' };

export function finnFagsakÅNavigereTil(fagsaker: IMinimalFagsak[]): Fagsaknavigering {
    if (fagsaker.length === 0) {
        return { status: 'INGEN_FAGSAKER' };
    }

    if (fagsaker.length === 1) {
        return { status: 'FUNNET', fagsak: fagsaker[0] };
    }

    const løpendeFagsaker = fagsaker.filter(fagsak => fagsak.status === FagsakStatus.LØPENDE);
    if (løpendeFagsaker.length === 1) {
        return { status: 'FUNNET', fagsak: løpendeFagsaker[0] };
    }

    const fagsakerUnderBehandling = fagsaker.filter(fagsak => fagsak.underBehandling);
    if (fagsakerUnderBehandling.length === 1) {
        return { status: 'FUNNET', fagsak: fagsakerUnderBehandling[0] };
    }

    return { status: 'FLERE_FAGSAKER' };
}
