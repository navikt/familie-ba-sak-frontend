export interface IBrevData {
    mottaker: TypeMottaker;
    brevmal: TypeBrev;
    fritekst?: string;
}

export enum TypeMottaker {
    SØKER = 'Søker',
}

export enum TypeBrev {
    OPPLYSNINGER = 'Innhent opplysninger',
}
