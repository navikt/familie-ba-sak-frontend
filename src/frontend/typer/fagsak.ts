import { IBarnBeregning } from './behandle';
import { IPerson } from './person';

// Enum
export enum Behandlingstype {
    FØRSTEGANGSBEHANDLING = 'FØRSTEGANGSBEHANDLING',
    REVURDERING = 'REVURDERING',
}

// Enum
export enum VedtakResultat {
    INNVILGET = 'INNVILGET',
    AVSLÅTT = 'AVSLÅTT',
    OPPHØRT = 'OPPHØRT',
    HENLAGT = 'HENLAGT',
}

// Interface
export interface IFagsak {
    behandlinger: IBehandling[];
    id: number;
    opprettetTidspunkt: string;
    saksnummer: string;
    søkerFødselsnummer: string;
}

export interface IBehandling {
    aktiv: boolean;
    behandlingId: number;
    søker?: string;
    barnasFødselsnummer: string[];
    vedtakForBehandling: IVedtakForBehandling[];
}

export interface IVedtakForBehandling {
    aktiv: boolean;
    ansvarligSaksbehandler: string;
    barnasBeregning: IBarnBeregning[];
    stønadFom: string;
    stønadTom: string;
    vedtaksdato: string;
    resultat: VedtakResultat;
}

export interface IBehandlingsresultat {
    aktiv: boolean;
}

export interface IPersonopplysninger {
    annenPart: IPerson;
    barna: IPerson[];
    søker: IPerson;
}

export interface INøkkelPar {
    [key: string]: {
        id: string;
        navn: string;
    };
}

export const behandlingstyper: INøkkelPar = {
    FØRSTEGANGSBEHANDLING: {
        id: 'førstegangsbehandling',
        navn: 'Førstegangsbehandling',
    },
    REVURDERING: {
        id: 'revurdering',
        navn: 'Revurdering',
    },
};

export const sakstyper: INøkkelPar = {
    ORDINÆR: {
        id: 'ordinær',
        navn: 'Ordinær barnetrygd',
    },
    UTVIDET: {
        id: 'utvidet',
        navn: 'Utvidet barnetrygd',
    },
};
