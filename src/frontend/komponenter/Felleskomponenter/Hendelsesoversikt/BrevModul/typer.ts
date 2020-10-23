export interface IBrevData {
    mottaker: MottakerType;
    brevmal: Brevmal;
    fritekst?: string;
}

export enum MottakerType {
    SØKER = 'SØKER',
}

export const mottakerTyper: Record<MottakerType, string> = {
    SØKER: 'Søker',
};

export interface BrevtypeSelect extends HTMLSelectElement {
    value: Brevmal | '';
}

export enum Brevmal {
    OPPLYSNINGER = 'OPPLYSNINGER',
    VARSEL_OM_REVURDERING = 'VARSEL_OM_REVURDERING',
}

export const brevmaler: Record<Brevmal, string> = {
    OPPLYSNINGER: 'Innhent opplysninger',
    VARSEL_OM_REVURDERING: 'Varsel om revurdering',
};
