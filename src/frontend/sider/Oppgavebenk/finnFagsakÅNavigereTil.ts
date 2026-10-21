import { FagsakStatus, type IMinimalFagsak } from '@typer/fagsak';

export function finnFagsakÅNavigereTil(fagsaker: IMinimalFagsak[]): IMinimalFagsak | undefined {
    if (fagsaker.length === 1) {
        return fagsaker[0];
    }

    const løpendeFagsaker = fagsaker.filter(fagsak => fagsak.status === FagsakStatus.LØPENDE);
    if (løpendeFagsaker.length === 1) {
        return løpendeFagsaker[0];
    }

    const fagsakerUnderBehandling = fagsaker.filter(fagsak => fagsak.underBehandling);
    if (fagsakerUnderBehandling.length === 1) {
        return fagsakerUnderBehandling[0];
    }

    return undefined;
}
