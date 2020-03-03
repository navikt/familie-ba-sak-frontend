import { IBehandling } from './behandling';
import { INøkkelPar } from './common';

// Enum
export enum FagsakStatus {
    OPPRETTET = 'OPPRETTET',
    LØPENDE = 'LØPENDE',
}

// Interface
export interface IFagsak {
    behandlinger: IBehandling[];
    id: number;
    opprettetTidspunkt: string;
    saksnummer: string;
    status: FagsakStatus;
    søkerFødselsnummer: string;
}

export const fagsakStatus: INøkkelPar = {
    OPPRETTET: {
        id: 'OPPRETTET',
        navn: 'Opprettet',
    },
    LØPENDE: {
        id: 'LØPENDE',
        navn: 'Løpende',
    },
};
