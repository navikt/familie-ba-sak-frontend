import {
    Mottaker,
    type SkjemaBrevmottaker,
} from '../../sider/Fagsak/Fagsaklinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';

export function lagBrevmottaker(brevmottaker?: Partial<SkjemaBrevmottaker>): SkjemaBrevmottaker {
    return {
        type: Mottaker.FULLMEKTIG,
        navn: 'Navn Navnesen',
        adresselinje1: 'Adresselinje 1',
        adresselinje2: undefined,
        postnummer: '0001',
        poststed: 'Oslo',
        landkode: 'NO',
        ...(brevmottaker ?? {}),
    };
}

export * as BrevmottakerTestdata from './brevmottakerTestdata';
