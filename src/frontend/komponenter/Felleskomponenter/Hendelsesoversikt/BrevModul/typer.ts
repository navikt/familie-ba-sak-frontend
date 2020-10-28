import { Målform } from '../../../../typer/søknad';

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

    return selectOptionsMedBrevtekst.map((selectOptionMedBrevtekst: ISelectOptionMedBrevtekst) => ({
        ...selectOptionMedBrevtekst,
        value: selectOptionMedBrevtekst.label.toLocaleLowerCase().replace(' ', '_'),
    }));
};

export interface ISelectOptionMedBrevtekst {
    value: string;
    label: string;
    brevtekst: Record<Målform, string>;
}

// Value settes ved henting av select option basert på label
export const dokumenter: ISelectOptionMedBrevtekst[] = [
    {
        value: '',
        label: 'Avtale om delt bosted',
        brevtekst: {
            NB: 'Avtale om delt bosted.',
            NN: 'Avtale om delt bustad.',
        },
    },
    {
        value: '',
        label: 'Avtale om fast bosted',
        brevtekst: {
            NB: 'Avtale om fast bosted.',
            NN: 'Avtale om fast bustad.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon på adopsjon som viser hvilken dato du overtok omsorgen for barna',
        brevtekst: {
            NB: 'Dokumentasjon på adopsjon som viser hvilken dato du overtok omsorgen for barna.',
            NN: 'Dokumentasjon på adopsjon som viser frå kva dato du overtok omsorga for barna.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon på adopsjon som viser hvilken dato du overtok omsorgen for barnet',
        brevtekst: {
            NB: 'Dokumentasjon på adopsjon som viser hvilken dato du overtok omsorgen for barnet.',
            NN: 'Dokumentasjon på adopsjon som viser frå kva dato du overtok omsorga for barnet.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon på at du er folkeregistrert i Norge',
        brevtekst: {
            NB: 'Dokumentasjon på at du er folkeregistrert i Norge.',
            NN: 'Dokumentasjon på at du er folkeregistrert i Noreg.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon på at du og barna er folkeregistrert i Norge',
        brevtekst: {
            NB: 'Dokumentasjon på at du og barna er folkeregistrert i Norge.',
            NN: 'Dokumentasjon på at du og barna er folkeregistrert i Noreg.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon på at du og barnet er folkeregistrert i Norge',
        brevtekst: {
            NB: 'Dokumentasjon på at du og barnet er folkeregistrert i Norge.',
            NN: 'Dokumentasjon på at du og barnet er folkeregistrert i Noreg.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon på at barna er folkeregistrert i Norge',
        brevtekst: {
            NB: 'Dokumentasjon på at barna er folkeregistrert i Norge.',
            NN: 'Dokumentasjon på at barna er folkeregistrert i Noreg.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon på at barnet er folkeregistrert i Norge',
        brevtekst: {
            NB: 'Dokumentasjon på at barnet er folkeregistrert i Norge.',
            NN: 'Dokumentasjon på at barnet er folkeregistrert i Noreg.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon som viser at barna bor sammen med deg',
        brevtekst: {
            NB: 'Dokumentasjon som viser at barna bor sammen med deg.',
            NN: 'Dokumentasjon som viser at barna bur saman med deg.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon som viser at barnet bor sammen med deg',
        brevtekst: {
            NB: 'Dokumentasjon som viser at barnet bor sammen med deg.',
            NN: 'Dokumentasjon som viser at barnet bur saman med deg.',
        },
    },
    {
        value: '',
        label:
            'Dokumentasjon som viser hvilken dato barna flyttet til deg. Du må melde flytting til Folkeregisteret',
        brevtekst: {
            NB:
                'Dokumentasjon som viser hvilken dato barna flyttet til deg. Du må melde flytting til Folkeregisteret.',
            NN:
                'Dokumentasjon som viser frå kva dato barna flytta til deg. Du må melde flytting til Folkeregisteret.',
        },
    },
    {
        value: '',
        label:
            'Dokumentasjon som viser hvilken dato barnet flyttet til deg. Du må melde flytting til Folkeregisteret',
        brevtekst: {
            NB:
                'Dokumentasjon som viser hvilken dato barnet flyttet til deg. Du må melde flytting til Folkeregisteret.',
            NN:
                'Dokumentasjon som viser frå kva dato barnet flyttet til deg. Du må melde flytting til Folkeregisteret.',
        },
    },
    {
        value: '',
        label:
            'Dokumentasjon som viser hvilke perioder du og barna har vært i Norge og hvilke perioder dere har vært i utlandet. For eksempel kopi av flybilletter, kopi av pass med stempel, bekreftelse fra skole barnehage eller helsestasjon',
        brevtekst: {
            NB:
                'Dokumentasjon som viser hvilke perioder du og barna har vært i Norge og hvilke perioder dere har vært i utlandet. For eksempel kopi av flybilletter, kopi av pass med stempel, bekreftelse fra skole barnehage eller helsestasjon.',
            NN:
                'Dokumentasjon som viser kva for periodar du og barna har vore i Noreg og kva for periodar de har vore i utlandet. Til dømes kopi av flybillettar, kopi av pass med stempel, stadfesting frå skule, barnehage eller helsestasjon.',
        },
    },
    {
        value: '',
        label:
            'Dokumentasjon som viser hvilke perioder du og barnet har vært i Norge og hvilke perioder dere har vært i utlandet. For eksempel kopi av flybilletter, kopi av pass med stempel, bekreftelse fra skole barnehage eller helsestasjon',
        brevtekst: {
            NB:
                'Dokumentasjon som viser hvilke perioder du og barnet har vært i Norge og hvilke perioder dere har vært i utlandet. For eksempel kopi av flybilletter, kopi av pass med stempel, bekreftelse fra skole barnehage eller helsestasjon.',
            NN:
                'Dokumentasjon som viser kva for periodar du og barnet har vore i Noreg og kva for periodar de har vore i utlandet. Til dømes kopi av flybillettar, kopi av pass med stempel, stadfesting frå skule, barnehage eller helsestasjon.',
        },
    },
    {
        value: '',
        label:
            'Dokumentasjon som viser hvilke perioder barna har vært i Norge og hvilke perioder dere har vært i utlandet. For eksempel kopi av flybilletter, kopi av pass med stempel, bekreftelse fra skole, barnehage eller helsestasjon',
        brevtekst: {
            NB:
                'Dokumentasjon som viser hvilke perioder barna har vært i Norge og hvilke perioder dere har vært i utlandet. For eksempel kopi av flybilletter, kopi av pass med stempel, bekreftelse fra skole, barnehage eller helsestasjon.',
            NN:
                'Dokumentasjon som viser kva for periodar barna har vore i Noreg og kva for periodar dei har vore i utlandet. Til dømes kopi av flybillettar, kopi av pass med stempel, stadfesting frå skule, barnehage eller helsestasjon.',
        },
    },
    {
        value: '',
        label:
            'Dokumentasjon som viser hvilke perioder barnet har vært i Norge og hvilke perioder dere har vært i utlandet. For eksempel kopi av flybilletter, kopi av pass med stempel, bekreftelse fra skole, barnehage eller helsestasjon',
        brevtekst: {
            NB:
                'Dokumentasjon som viser hvilke perioder barnet har vært i Norge og hvilke perioder dere har vært i utlandet. For eksempel kopi av flybilletter, kopi av pass med stempel, bekreftelse fra skole, barnehage eller helsestasjon.',
            NN:
                'Dokumentasjon som viser kva for periodar barnet har vore i Noreg og kva for periodar det har vore i utlandet. Til dømes kopi av flybillettar, kopi av pass med stempel, stadfesting frå skule, barnehage eller helsestasjon.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon som viser når du kom til Norge',
        brevtekst: {
            NB: 'Dokumentasjon som viser når du kom til Norge.',
            NN: 'Dokumentasjon som viser når du kom til Noreg.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon som viser når du og barna kom til Norge',
        brevtekst: {
            NB: 'Dokumentasjon som viser når du og barna kom til Norge.',
            NN: 'Dokumentasjon som viser når du og barna kom til Noreg.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon som viser når du og barnet kom til Norge',
        brevtekst: {
            NB: 'Dokumentasjon som viser når du og barnet kom til Norge.',
            NN: 'Dokumentasjon som viser når du og barnet kom til Noreg.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon som viser når barna kom til Norge',
        brevtekst: {
            NB: 'Dokumentasjon som viser når barna kom til Norge.',
            NN: 'Dokumentasjon som viser når barna kom til Noreg.',
        },
    },
    {
        value: '',
        label: 'Dokumentasjon som viser når barnet kom til Norge',
        brevtekst: {
            NB: 'Dokumentasjon som viser når barnet kom til Norge.',
            NN: 'Dokumentasjon som viser når barnet kom til Noreg.',
        },
    },
    {
        value: '',
        label: 'Kopi av vedtak om oppholdstillatelse for deg',
        brevtekst: {
            NB: 'Kopi av vedtak om oppholdstillatelse for deg.',
            NN: 'Kopi av vedtak om opphaldsløyve for deg.',
        },
    },
    {
        value: '',
        label: 'Kopi av vedtak om oppholdstillatelse for deg og barna',
        brevtekst: {
            NB: 'Kopi av vedtak om oppholdstillatelse for deg og barna.',
            NN: 'Kopi av vedtak om opphaldsløyve for deg og barna.',
        },
    },
    {
        value: '',
        label: 'Kopi av vedtak om oppholdstillatelse for deg og barnet',
        brevtekst: {
            NB: 'Kopi av vedtak om oppholdstillatelse for deg og barnet.',
            NN: 'Kopi av vedtak om opphaldsløyve for deg og barnet.',
        },
    },
    {
        value: '',
        label: 'Kopi av vedtak om oppholdstillatelse for barna',
        brevtekst: {
            NB: 'Kopi av vedtak om oppholdstillatelse for barna.',
            NN: 'Kopi av vedtak om opphaldsløyve for barna.',
        },
    },
    {
        value: '',
        label: 'Kopi av vedtak om oppholdstillatelse for barnet',
        brevtekst: {
            NB: 'Kopi av vedtak om oppholdstillatelse for barnet.',
            NN: 'Kopi av vedtak om opphaldsløyve for barnet.',
        },
    },
    {
        value: '',
        label: 'Rettsavgjørelse som viser fra hvilken dato barnet bor sammen med deg',
        brevtekst: {
            NB: 'Rettsavgjørelse som viser fra hvilken dato barnet bor sammen med deg.',
            NN: 'Avgjersle frå retten som viser frå kva dato barnet bur saman med deg.',
        },
    },
    {
        value: '',
        label: 'Rettsavgjørelse som viser fra hvilken dato barna bor sammen med deg',
        brevtekst: {
            NB: 'Rettsavgjørelse som viser fra hvilken dato barna bor sammen med deg.',
            NN: 'Avgjersle frå retten som viser frå kva dato barna bur saman med deg.',
        },
    },

    {
        value: '',
        label: 'Vergefullmakt',
        brevtekst: {
            NB: 'Vergefullmakt.',
            NN: 'Vergefullmakt.',
        },
    },
    {
        value: 'annet',
        label: 'Annet',
        brevtekst: {
            NB: '',
            NN: '',
        },
    },
];

export const årsaker: ISelectOptionMedBrevtekst[] = [
    {
        value: 'annet',
        label: 'Annet',
        brevtekst: {
            NB: '',
            NN: '',
        },
    },
];
