import type { ISamhandlerInfo } from '../../typer/samhandler';

export function lagSamhandler(samhandler: Partial<ISamhandlerInfo> = {}): ISamhandlerInfo {
    return {
        orgNummer: '974652293',
        tssEksternId: '80000123456',
        navn: 'Testinstitusjonen AS',
        adresser: [
            {
                adresselinjer: ['Testveien 1'],
                postNr: '0150',
                postSted: 'Oslo',
                adresseType: 'Arbeidsadresse',
            },
        ],
        ...samhandler,
    };
}

export * as SamhandlerTestdata from './samhandlerTestdata';
