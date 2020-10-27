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

export const selectLabelsForBrevmaler: Record<Brevmal, string> = {
    INNHENTE_OPPLYSNINGER: 'Velg dokumenter',
    VARSEL_OM_REVURDERING: 'Velg årsak',
};

export const hentSelectOptions = (brevmal: Brevmal) => {
    let selectOptionsMedBrevtekst;
    switch (brevmal) {
        case Brevmal.INNHENTE_OPPLYSNINGER:
            selectOptionsMedBrevtekst = dokumenter;
            break;
        case Brevmal.VARSEL_OM_REVURDERING:
            selectOptionsMedBrevtekst = årsaker;
            break;
    }

    return selectOptionsMedBrevtekst.map(
        (selectOptionMedBrevtekst: ISelectOptionMedBrevtekst) => selectOptionMedBrevtekst.option
    );
};

export interface ISelectOption {
    value: string;
    label: string;
}

export interface ISelectOptionMedBrevtekst {
    option: ISelectOption;
    brevtekst: string;
}

export const dokumenter: ISelectOptionMedBrevtekst[] = [
    {
        option: { value: 'oppholdstillatelse', label: 'Oppholdstillatelse' },
        brevtekst: 'Bekreftelse på oppholdstillatelse',
    },
    {
        option: { value: 'oppholdstillatelse_2', label: 'Oppholdstillatelse2' },
        brevtekst: 'Bekreftelse på oppholdstillatelse 2',
    },
    { option: { value: 'annet', label: 'Annet' }, brevtekst: '' },
];

export const årsaker: ISelectOptionMedBrevtekst[] = [
    { option: { value: 'annet', label: 'Annet' }, brevtekst: '' },
];
