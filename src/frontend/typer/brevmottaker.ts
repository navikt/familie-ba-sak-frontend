export enum Brevmottakertype {
    BRUKER_MED_UTENLANDSK_ADRESSE = 'BRUKER_MED_UTENLANDSK_ADRESSE',
    FULLMEKTIG = 'FULLMEKTIG',
    VERGE = 'VERGE',
    DØDSBO = 'DØDSBO',
}

export const BREVMOTTAKERTYPE_SOM_SKAL_PREUTFYLLES = [
    Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE,
    Brevmottakertype.DØDSBO,
];

export function erBrevmottakertype(verdi: string): verdi is Brevmottakertype {
    return (Object.values(Brevmottakertype) as string[]).includes(verdi);
}

export interface Brevmottaker {
    type: Brevmottakertype;
    navn: string;
    adresselinje1: string;
    adresselinje2?: string;
    postnummer?: string;
    poststed?: string;
    landkode: string;
}

export interface BrevmottakerFagsak extends Brevmottaker {
    uuid: string;
}

export interface BrevmottakerBehandling extends Brevmottaker {
    id: number;
}

export const brevmottakertypeVisningsnavn: Record<Brevmottakertype, string> = {
    BRUKER_MED_UTENLANDSK_ADRESSE: 'Bruker med utenlandsk adresse',
    FULLMEKTIG: 'Fullmektig',
    VERGE: 'Verge',
    DØDSBO: 'Dødsbo',
};
