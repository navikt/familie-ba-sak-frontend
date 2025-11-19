import {
    type IRestBrevmottaker,
    Mottaker,
    type SkjemaBrevmottaker,
} from '../../sider/Fagsak/Fagsaklinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';

export function lagBrevmottaker(brevmottaker: Partial<SkjemaBrevmottaker> = {}): SkjemaBrevmottaker {
    return {
        type: Mottaker.FULLMEKTIG,
        navn: 'Brev Brevmottaker',
        adresselinje1: 'Brevveien 1',
        adresselinje2: undefined,
        postnummer: '0001',
        poststed: 'Oslo',
        landkode: 'NO',
        ...brevmottaker,
    };
}

export function lagRestBrevmottaker(brevmottaker: Partial<IRestBrevmottaker> = {}) {
    return {
        id: 1,
        type: Mottaker.FULLMEKTIG,
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
