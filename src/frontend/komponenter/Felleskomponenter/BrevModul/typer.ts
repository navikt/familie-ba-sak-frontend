import { INøkkelPar } from '../../../typer/common';

export interface IBrevData {
    mottaker: TypeMottaker;
    brevmal: TypeBrev;
    årsak: TypeÅrsak;
    fritekst?: string;
}

export enum TypeÅrsak {
    ANNEN = 'ANNEN',
    UTVANDRET = 'UTVANDRET',
    DOKUMENTASJON = 'DOKUMENTASJON',
}

export enum TypeMottaker {
    SØKER = 'SØKER',
}

export enum TypeBrev {
    DOKUMENTASJON = 'DOKUMENTASJON',
    SAKSBEHANDLINGSTID = 'SAKSBEHANDLINGSTID',
    REVURDERING = 'REVURDERING',
}

export const årsaktyper: INøkkelPar = {
    UTVANDRET: { id: 'UTVANDRET', navn: 'Bruker er registrert utvandret' },
    DOKUMENTASJON: { id: 'DOKUMENTASJON', navn: 'Avventer dokumentasjon' },
    ANNEN: { id: 'ANNEN', navn: 'Annen' },
};

export const mottakertyper: INøkkelPar = {
    SØKER: { id: 'SØKER', navn: 'Søker' },
};

export const brevtyper: INøkkelPar = {
    DOKUMENTASJON: { id: 'DOKUMENTASJON', navn: 'Innhent/Manglende dokumentasjon' },
    SAKSBEHANDLINGSTID: { id: 'SAKSBEHANDLINGSTID', navn: 'Forlengelse av saksbehandlingstid' },
    REVURDERING: { id: 'REVURDERING', navn: 'Varsel om revurdering' },
};

// TODO: Ikke komplette typer. Kun ut i fra skisser.
