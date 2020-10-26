export interface IBrevData {
    mottakerIdent: string;
    brevmal: Brevmal;
    fritekst?: string;
}

export interface BrevtypeSelect extends HTMLSelectElement {
    value: Brevmal | '';
}

export enum Brevmal {
    INNHENTE_OPPLYSNINGER = 'INNHENTE_OPPLYSNINGER',
    VARSEL_OM_REVURDERING = 'VARSEL_OM_REVURDERING',
}

export const brevmaler: Record<Brevmal, string> = {
    INNHENTE_OPPLYSNINGER: 'Innhent opplysninger',
    VARSEL_OM_REVURDERING: 'Varsel om revurdering',
};
