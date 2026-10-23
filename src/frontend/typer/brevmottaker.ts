import type { Regionkode } from '@komponenter/FlaggCombobox';

export enum Brevmottakertype {
    BRUKER_MED_UTENLANDSK_ADRESSE = 'BRUKER_MED_UTENLANDSK_ADRESSE',
    FULLMEKTIG = 'FULLMEKTIG',
    VERGE = 'VERGE',
    DØDSBO = 'DØDSBO',
}

export enum Modus {
    FAGSAK = 'FAGSAK',
    BEHANDLING = 'BEHANDLING',
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

export function utledValgbareBrevmottakertyper(brevmottakere: Brevmottaker[], modus: Modus): Brevmottakertype[] {
    const alleredeValgteBrevmottakertyper = brevmottakere.map(brevmottaker => brevmottaker.type);
    switch (modus) {
        case Modus.FAGSAK:
            return utledValgbareBrevmottakertyperForFagsak(alleredeValgteBrevmottakertyper);
        case Modus.BEHANDLING:
            return utledValgbareBrevmottakertyperForBehandling(alleredeValgteBrevmottakertyper);
    }
}

function utledValgbareBrevmottakertyperForFagsak(
    alleredeValgteBrevmottakertyper: Brevmottakertype[]
): Brevmottakertype[] {
    const harValgtFullmektigEllerVerge =
        alleredeValgteBrevmottakertyper.includes(Brevmottakertype.FULLMEKTIG) ||
        alleredeValgteBrevmottakertyper.includes(Brevmottakertype.VERGE);

    return [Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE, Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE]
        .filter(it => !harValgtFullmektigEllerVerge || it === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE)
        .filter(it => !alleredeValgteBrevmottakertyper.includes(it));
}

function utledValgbareBrevmottakertyperForBehandling(
    alleredeValgteBrevmottakertyper: Brevmottakertype[]
): Brevmottakertype[] {
    if (alleredeValgteBrevmottakertyper.length === 0) {
        return [
            Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE,
            Brevmottakertype.FULLMEKTIG,
            Brevmottakertype.VERGE,
            Brevmottakertype.DØDSBO,
        ];
    }

    if (alleredeValgteBrevmottakertyper.includes(Brevmottakertype.DØDSBO)) {
        return [];
    }

    const harValgtFullmektigEllerVerge =
        alleredeValgteBrevmottakertyper.includes(Brevmottakertype.FULLMEKTIG) ||
        alleredeValgteBrevmottakertyper.includes(Brevmottakertype.VERGE);

    return [Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE, Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE]
        .filter(it => !harValgtFullmektigEllerVerge || it === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE)
        .filter(it => !alleredeValgteBrevmottakertyper.includes(it));
}

export function utledPreutfyltNavn(brevmottakertype: Brevmottakertype, land: Regionkode | null, navn: string) {
    if (brevmottakertype === Brevmottakertype.DØDSBO) {
        return land === null || land === 'NO' ? `${navn} v/dødsbo` : `Estate of ${navn}`;
    }
    return navn;
}
