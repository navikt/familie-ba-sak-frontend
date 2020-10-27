export interface IBrevData {
    mottakerIdent: string;
    multiselectVerdier: string[];
    brevmal: Brevmal;
    fritekst: string;
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

export const selectLabelsForBrevmaler: Record<Brevmal, string> = {
    INNHENTE_OPPLYSNINGER: 'Velg dokumenter',
    VARSEL_OM_REVURDERING: 'Velg årsak',
};

export const hentSelectOptions = (brevmal: Brevmal): ISelectOptionMedBrevtekst[] => {
    let selectOptionsMedBrevtekst;
    switch (brevmal) {
        case Brevmal.INNHENTE_OPPLYSNINGER:
            selectOptionsMedBrevtekst = dokumenter;
            break;
        case Brevmal.VARSEL_OM_REVURDERING:
            selectOptionsMedBrevtekst = årsaker;
            break;
    }

    return selectOptionsMedBrevtekst;
};

export interface ISelectOptionMedBrevtekst {
    value: string;
    label: string;
    brevtekst: string;
}

export const dokumenter: ISelectOptionMedBrevtekst[] = [
    {
        value: 'oppholdstillatelse',
        label: 'Oppholdstillatelse',
        brevtekst: 'Bekreftelse på oppholdstillatelse',
    },
    {
        value: 'oppholdstillatelse_2',
        label: 'Oppholdstillatelse2',
        brevtekst: 'Bekreftelse på oppholdstillatelse 2',
    },
    { value: 'annet', label: 'Annet', brevtekst: '' },
];

export const årsaker: ISelectOptionMedBrevtekst[] = [
    { value: 'annet', label: 'Annet', brevtekst: '' },
];
