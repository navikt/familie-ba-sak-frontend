import type { Brevmottaker, BrevmottakerBehandling, BrevmottakerFagsak } from '@typer/brevmottaker';
import { Brevmottakertype } from '@typer/brevmottaker';
import { randomUUID } from '@utils/commons';

export function lagBrevmottaker(brevmottaker: Partial<Brevmottaker> = {}): Brevmottaker {
    return {
        type: Brevmottakertype.FULLMEKTIG,
        navn: 'Brev Brevmottaker',
        adresselinje1: 'Brevveien 1',
        adresselinje2: undefined,
        postnummer: '0001',
        poststed: 'Oslo',
        landkode: 'NO',
        ...brevmottaker,
    };
}

export function lagBrevmottakerFagsak(brevmottaker: Partial<BrevmottakerFagsak> = {}): BrevmottakerFagsak {
    return {
        ...lagBrevmottaker(),
        uuid: randomUUID(),
        ...brevmottaker,
    };
}

export function lagBrevmottakerBehandling(brevmottaker: Partial<BrevmottakerBehandling> = {}): BrevmottakerBehandling {
    return {
        id: 1,
        type: Brevmottakertype.FULLMEKTIG,
        navn: 'Brev Brevmottaker',
        adresselinje1: 'Brevveien 1',
        adresselinje2: undefined,
        postnummer: '0001',
        poststed: 'Oslo',
        landkode: 'NO',
        ...brevmottaker,
    };
}

export * as BrevmottakerTestdata from './brevmottakerTestdata';
