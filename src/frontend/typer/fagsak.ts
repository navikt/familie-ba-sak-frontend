import { IBehandling } from './behandling';
import { INøkkelPar } from './common';

// Enum
export enum FagsakStatus {
    OPPRETTET = 'OPPRETTET',
    LØPENDE = 'LØPENDE',
    STANSET = 'STANSET',
}

// Interface
export interface IFagsak {
    behandlinger: IBehandling[];
    id: number;
    opprettetTidspunkt: string;
    saksnummer: string;
    status: FagsakStatus;
    søkerFødselsnummer: string;
    underBehandling: boolean;
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
    STANSET: {
        id: 'STANSET',
        navn: 'Stanset',
    },
};
