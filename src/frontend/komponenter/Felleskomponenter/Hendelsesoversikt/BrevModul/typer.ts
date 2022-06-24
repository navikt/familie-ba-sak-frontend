import type { Målform } from '../../../../typer/søknad';

export interface BrevtypeSelect extends HTMLSelectElement {
    value: Brevmal | '';
}

export enum Brevmal {
    INNHENTE_OPPLYSNINGER = 'INNHENTE_OPPLYSNINGER',
    INNHENTE_OPPLYSNINGER_ETTER_SØKNAD_I_SED = 'INNHENTE_OPPLYSNINGER_ETTER_SØKNAD_I_SED',
    VARSEL_OM_VEDTAK_ETTER_SØKNAD_I_SED = 'VARSEL_OM_VEDTAK_ETTER_SØKNAD_I_SED',
    VARSEL_OM_REVURDERING = 'VARSEL_OM_REVURDERING',
    VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14 = 'VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14',
    VARSEL_OM_REVURDERING_SAMBOER = 'VARSEL_OM_REVURDERING_SAMBOER',
    VARSEL_OM_REVURDERING_FRA_NASJONAL_TIL_EØS = 'VARSEL_OM_REVURDERING_FRA_NASJONAL_TIL_EØS',
    HENLEGGE_TRUKKET_SØKNAD = 'HENLEGGE_TRUKKET_SØKNAD',
    SVARTIDSBREV = 'SVARTIDSBREV',
    FORLENGET_SVARTIDSBREV = 'FORLENGET_SVARTIDSBREV',
}

export enum Informasjonsbrev {
    INFORMASJONSBREV_DELT_BOSTED = 'INFORMASJONSBREV_DELT_BOSTED',
    INFORMASJONSBREV_FØDSEL_MINDREÅRIG = 'INFORMASJONSBREV_FØDSEL_MINDREÅRIG',
    INFORMASJONSBREV_FØDSEL_UMYNDIG = 'INFORMASJONSBREV_FØDSEL_UMYNDIG',
    INFORMASJONSBREV_KAN_SØKE = 'INFORMASJONSBREV_KAN_SØKE',
    INFORMASJONSBREV_KAN_SØKE_EØS = 'INFORMASJONSBREV_KAN_SØKE_EØS',
    INFORMASJONSBREV_FØDSEL_GENERELL = 'INFORMASJONSBREV_FØDSEL_GENERELL',
}

export const brevmaler: Record<Brevmal, string> = {
    INNHENTE_OPPLYSNINGER: 'Innhent opplysninger',
    INNHENTE_OPPLYSNINGER_ETTER_SØKNAD_I_SED: 'Innhente opplysninger etter søknad i SED',
    VARSEL_OM_VEDTAK_ETTER_SØKNAD_I_SED: 'Varsel om vedtak etter søknad i SED',
    VARSEL_OM_REVURDERING: 'Varsel om revurdering',
    HENLEGGE_TRUKKET_SØKNAD: 'Henlegg søknad',
    SVARTIDSBREV: 'Svartidsbrev',
    VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14: 'Varsel om revurdering delt bosted §14',
    VARSEL_OM_REVURDERING_SAMBOER: 'Varsel om revurdering samboer',
    VARSEL_OM_REVURDERING_FRA_NASJONAL_TIL_EØS: 'Varsel om revurdering fra nasjonal til EØS',
    FORLENGET_SVARTIDSBREV: 'Forlenget svartidsbrev',
};

export const leggTilValuePåOption = (
    option: Omit<ISelectOptionMedBrevtekst, 'value'>
): ISelectOptionMedBrevtekst => ({
    ...option,
    value: option.label.toLocaleLowerCase().replace(' ', '_'),
});

type OptionType = {
    value: string;
    label: string;
};

export interface ISelectOptionMedBrevtekst extends OptionType {
    value: string;
    label: string;
    brevtekst?: Record<Målform, string>;
}

export const opplysningsdokumenter: Omit<ISelectOptionMedBrevtekst, 'value'>[] = [
    {
        label: 'Adopsjon - barna',
        brevtekst: {
            NB: 'Dokumentasjon på adopsjon som viser hvilken dato du overtok omsorgen for barna.',
            NN: 'Dokumentasjon på adopsjon som viser frå kva dato du overtok omsorga for barna.',
        },
    },
    {
        label: 'Adopsjon - barnet',
        brevtekst: {
            NB: 'Dokumentasjon på adopsjon som viser hvilken dato du overtok omsorgen for barnet.',
            NN: 'Dokumentasjon på adopsjon som viser frå kva dato du overtok omsorga for barnet.',
        },
    },
    {
        label: 'Ankomst Norge - barna',
        brevtekst: {
            NB: 'Dokumentasjon som viser når barna kom til Norge.',
            NN: 'Dokumentasjon som viser når barna kom til Noreg.',
        },
    },
    {
        label: 'Ankomst Norge - barnet',
        brevtekst: {
            NB: 'Dokumentasjon som viser når barnet kom til Norge.',
            NN: 'Dokumentasjon som viser når barnet kom til Noreg.',
        },
    },
    {
        label: 'Ankomst Norge - søker',
        brevtekst: {
            NB: 'Dokumentasjon som viser når du kom til Norge.',
            NN: 'Dokumentasjon som viser når du kom til Noreg.',
        },
    },
    {
        label: 'Ankomst Norge - søker og barna',
        brevtekst: {
            NB: 'Dokumentasjon som viser når du og barna kom til Norge.',
            NN: 'Dokumentasjon som viser når du og barna kom til Noreg.',
        },
    },
    {
        label: 'Ankomst Norge - søker og barnet',
        brevtekst: {
            NB: 'Dokumentasjon som viser når du og barnet kom til Norge.',
            NN: 'Dokumentasjon som viser når du og barnet kom til Noreg.',
        },
    },
    {
        label: 'Avtale om delt bosted',
        brevtekst: {
            NB: 'Avtale om delt bosted.',
            NN: 'Avtale om delt bustad.',
        },
    },
    {
        label: 'Avtale om fast bosted',
        brevtekst: {
            NB: 'Avtale om fast bosted.',
            NN: 'Avtale om fast bustad.',
        },
    },
    {
        label: 'Bor sammen med - barna',
        brevtekst: {
            NB: 'Dokumentasjon som viser at barna bor sammen med deg.',
            NN: 'Dokumentasjon som viser at barna bur saman med deg.',
        },
    },
    {
        label: 'Bor sammen med - barnet',
        brevtekst: {
            NB: 'Dokumentasjon som viser at barnet bor sammen med deg.',
            NN: 'Dokumentasjon som viser at barnet bur saman med deg.',
        },
    },
    {
        label: 'Flyttet til søker - barna',
        brevtekst: {
            NB: 'Dokumentasjon som viser hvilken dato barna flyttet til deg. Du må melde flytting til Folkeregisteret.',
            NN: 'Dokumentasjon som viser frå kva dato barna flytta til deg. Du må melde flytting til Folkeregisteret.',
        },
    },
    {
        label: 'Flyttet til søker - barnet',
        brevtekst: {
            NB: 'Dokumentasjon som viser hvilken dato barnet flyttet til deg. Du må melde flytting til Folkeregisteret.',
            NN: 'Dokumentasjon som viser frå kva dato barnet flyttet til deg. Du må melde flytting til Folkeregisteret.',
        },
    },
    {
        label: 'Folkeregistrert i Norge - barna',
        brevtekst: {
            NB: 'Dokumentasjon som viser at barna har norsk fødselsnummer og er bosatt i Norge.',
            NN: 'Dokumentasjon på at barna har norsk fødselsnummer og er busett  i Noreg.',
        },
    },
    {
        label: 'Folkeregistrert i Norge - barnet',
        brevtekst: {
            NB: 'Dokumentasjon som viser at barnet har norsk fødselsnummer og er bosatt i Norge.',
            NN: 'Dokumentasjon på at barnet har norsk fødselsnummer og er busett  i Noreg.',
        },
    },
    {
        label: 'Folkeregistrert i Norge - søker',
        brevtekst: {
            NB: 'Dokumentasjon som viser at du har norsk fødselsnummer og er bosatt i Norge.',
            NN: 'Dokumentasjon på at du har norsk fødselsnummer og er busett  i Noreg.',
        },
    },
    {
        label: 'Folkeregistrert i Norge - søker og barna',
        brevtekst: {
            NB: 'Dokumentasjon som viser at du og barna har norsk fødselsnummer og er bosatt i Norge.',
            NN: 'Dokumentasjon på at du og barna har norsk fødselsnummer og er busett  i Noreg.',
        },
    },
    {
        label: 'Folkeregistrert i Norge - søker og barnet',
        brevtekst: {
            NB: 'Dokumentasjon som viser at du og barnet har norsk fødselsnummer og er bosatt i Norge.',
            NN: 'Dokumentasjon på at du og barnet har norsk fødselsnummer og er busett  i Noreg.',
        },
    },
    {
        label: 'Oppholdstillatelse - barna',
        brevtekst: {
            NB: 'Kopi av vedtak om oppholdstillatelse for barna.',
            NN: 'Kopi av vedtak om opphaldsløyve for barna.',
        },
    },
    {
        label: 'Oppholdstillatelse - barnet',
        brevtekst: {
            NB: 'Kopi av vedtak om oppholdstillatelse for barnet.',
            NN: 'Kopi av vedtak om opphaldsløyve for barnet.',
        },
    },
    {
        label: 'Oppholdstillatelse - søker',
        brevtekst: {
            NB: 'Kopi av vedtak om oppholdstillatelse for deg.',
            NN: 'Kopi av vedtak om opphaldsløyve for deg.',
        },
    },
    {
        label: 'Oppholdstillatelse - søker og barna',
        brevtekst: {
            NB: 'Kopi av vedtak om oppholdstillatelse for deg og barna.',
            NN: 'Kopi av vedtak om opphaldsløyve for deg og barna.',
        },
    },
    {
        label: 'Oppholdstillatelse - søker og barnet',
        brevtekst: {
            NB: 'Kopi av vedtak om oppholdstillatelse for deg og barnet.',
            NN: 'Kopi av vedtak om opphaldsløyve for deg og barnet.',
        },
    },
    {
        label: 'Rettsavgjørelse - barna',
        brevtekst: {
            NB: 'Rettsavgjørelse som viser fra hvilken dato barna bor sammen med deg.',
            NN: 'Avgjersle frå retten som viser frå kva dato barna bur saman med deg.',
        },
    },
    {
        label: 'Rettsavgjørelse - barnet',
        brevtekst: {
            NB: 'Rettsavgjørelse som viser fra hvilken dato barnet bor sammen med deg.',
            NN: 'Avgjersle frå retten som viser frå kva dato barnet bur saman med deg.',
        },
    },
    {
        label: 'Utenlandsopphold, perioder - barna',
        brevtekst: {
            NB: 'Dokumentasjon som viser hvilke perioder barna har vært i Norge og hvilke perioder barna har vært i utlandet. For eksempel kopi av flybilletter, kopi av pass med stempel, bekreftelse fra skole, barnehage eller helsestasjon.',
            NN: 'Dokumentasjon som viser kva for periodar barna har vore i Noreg og kva for periodar dei har vore i utlandet. Til dømes kopi av flybillettar, kopi av pass med stempel, stadfesting frå skule, barnehage eller helsestasjon.',
        },
    },
    {
        label: 'Utenlandsopphold, perioder - barnet',
        brevtekst: {
            NB: 'Dokumentasjon som viser hvilke perioder barnet har vært i Norge og hvilke perioder barnet har vært i utlandet. For eksempel kopi av flybilletter, kopi av pass med stempel, bekreftelse fra skole, barnehage eller helsestasjon.',
            NN: 'Dokumentasjon som viser kva for periodar barnet har vore i Noreg og kva for periodar det har vore i utlandet. Til dømes kopi av flybillettar, kopi av pass med stempel, stadfesting frå skule, barnehage eller helsestasjon.',
        },
    },
    {
        label: 'Utenlandsopphold, perioder - søker',
        brevtekst: {
            NB: 'Dokumentasjon som viser hvilke perioder du har vært i Norge og hvilke perioder du har vært i utlandet. For eksempel kopi av flybilletter eller kopi av pass med stempel.',
            NN: 'Dokumentasjon som viser kva for periodar du har vore i Noreg og kva for periodar du har vore i utlandet. Til dømes kopi av flybillettar eller kopi av pass med stempel.',
        },
    },
    {
        label: 'Utenlandsopphold, perioder - søker og barna',
        brevtekst: {
            NB: 'Dokumentasjon som viser hvilke perioder du og barna har vært i Norge og hvilke perioder dere har vært i utlandet. For eksempel kopi av flybilletter, kopi av pass med stempel, bekreftelse fra skole barnehage eller helsestasjon.',
            NN: 'Dokumentasjon som viser kva for periodar du og barna har vore i Noreg og kva for periodar de har vore i utlandet. Til dømes kopi av flybillettar, kopi av pass med stempel, stadfesting frå skule, barnehage eller helsestasjon.',
        },
    },
    {
        label: 'Utenlandsopphold, perioder - søker og barnet',
        brevtekst: {
            NB: 'Dokumentasjon som viser hvilke perioder du og barnet har vært i Norge og hvilke perioder dere har vært i utlandet. For eksempel kopi av flybilletter, kopi av pass med stempel, bekreftelse fra skole barnehage eller helsestasjon.',
            NN: 'Dokumentasjon som viser kva for periodar du og barnet har vore i Noreg og kva for periodar de har vore i utlandet. Til dømes kopi av flybillettar, kopi av pass med stempel, stadfesting frå skule, barnehage eller helsestasjon.',
        },
    },
    {
        label: 'Vergefullmakt',
        brevtekst: {
            NB: 'Vergefullmakt.',
            NN: 'Vergefullmakt.',
        },
    },
    {
        label: 'Dokumentasjon dødsfall samboer',
        brevtekst: {
            NB: 'Dokumentasjon som viser at samboeren din er død.',
            NN: 'Dokumentasjon som viser at sambuaren din er død.',
        },
    },
    {
        label: 'Dokumentasjon dødsfall gift',
        brevtekst: {
            NB: 'Dokumentasjon som viser at ektefellen din er død.',
            NN: 'Dokumentasjon som viser at ektefellen din er død.',
        },
    },
    {
        label: 'Separasjonsbevilling',
        brevtekst: {
            NB: 'Separasjonsbevilling.',
            NN: 'Separasjonsbevilling.',
        },
    },
    {
        label: 'Dokumentasjon skilsmisse',
        brevtekst: {
            NB: 'Dokumentasjon som viser at du er skilt.',
            NN: 'Dokumentasjon som viser at du er skilt.',
        },
    },
    {
        label: 'Meklingsattest',
        brevtekst: {
            NB: 'Meklingsattest',
            NN: 'Meklingsattest',
        },
    },
    {
        label: 'Dokumentasjon på egen husholdning',
        brevtekst: {
            NB: 'Dokumentasjon som viser at du har egen husholdning.',
            NN: 'Dokumentasjon som viser at du har eiga hushaldning.',
        },
    },
    {
        label: 'Dokumentasjon på flytting samboer',
        brevtekst: {
            NB: 'Dokumentasjon som viser at du og samboeren din har flyttet fra hverandre.',
            NN: 'Dokumentasjon som viser at du og sambuaren din har flytta frå kvarandre.',
        },
    },
    {
        label: 'Dokumentasjon på flytting gift',
        brevtekst: {
            NB: 'Dokumentasjon som viser at du og ektefellen din har flyttet fra hverandre.',
            NN: 'Dokumentasjon som viser at du og ektefellen din har flytta frå kvarandre.',
        },
    },
    {
        label: 'Dokumentasjon på fengsel samboer',
        brevtekst: {
            NB: 'Dokumentasjon som viser at samboeren din er i fengsel i 6 måneder eller mer.',
            NN: 'Dokumentasjon som viser at sambuaren din er i fengsel i 6 månader eller meir.',
        },
    },
    {
        label: 'Dokumentasjon på fengsel ektefelle',
        brevtekst: {
            NB: 'Dokumentasjon som viser at ektefellen din er i fengsel i 6 måneder eller mer.',
            NN: 'Dokumentasjon som viser at ektefellen din er i fengsel i 6 månader eller meir.',
        },
    },
    {
        label: 'Erklæring samlivsbrudd (faktisk separasjon)',
        brevtekst: {
            NB: 'Erklæring på at forholdet er avsluttet.',
            NN: 'Erklæring på at forholdet er avslutta.',
        },
    },
    {
        label: 'Varig oppholdsbevis for EØS borger',
        brevtekst: {
            NB: 'Varig oppholdsbevis for EØS borger.',
            NN: 'Varig opphaldsbevis for EØS borgar.',
        },
    },
    {
        label: 'Dokumentasjon på arbeid',
        brevtekst: {
            NB: 'Dokumentasjon som viser at du jobber i Norge.',
            NN: 'Dokumentasjon som viser at du jobbar i Noreg.',
        },
    },
    {
        label: 'Dokumentasjon på utført arbeid',
        brevtekst: {
            NB: 'Dokumentasjon som viser at du har jobbet i Norge.',
            NN: 'Dokumentasjon som viser at du har jobba i Noreg.',
        },
    },
    {
        label: 'Fullmakt',
        brevtekst: {
            NB: 'Dokumentasjon som viser hvem du har gitt fullmakt til. Dette må være en person.',
            NN: 'Dokumentasjon som viser kven du har gitt fullmakt til. Dette må vere ein person.',
        },
    },
    {
        label: 'Driver næring i Norge',
        brevtekst: {
            NB: 'Næringsspesifikasjon eller resultatregnskap som viser at du driver næring i Norge.',
            NN: 'Næringsspesifikasjon eller resultatreknskap som viser at du driv næring i Noreg.',
        },
    },
    {
        label: 'Har drevet næring i Norge',
        brevtekst: {
            NB: 'Næringsspesifikasjon eller resultatregnskap som viser at du har drevet næring i Norge.',
            NN: 'Næringsspesifikasjon eller resultatreknskap som viser at du har drive næring i Noreg.',
        },
    },
    {
        label: 'Frasagt barnetrygd Storbritannia',
        brevtekst: {
            NB: 'Dokumentasjon som viser at familien har frasagt seg retten til barnetrygd fra Storbritannia.',
            NN: 'Dokumentasjon som viser at familien har sagt frå seg seg retten til barnetrygd frå Storbritannia.',
        },
    },
    {
        label: 'Betalt skatt Storbritannia',
        brevtekst: {
            NB: 'Dokumentasjon som viser at familien har betalt “High Income Child Benefit Charge” i Storbritannia.',
            NN: 'Dokumentasjon som viser at familien har betalt “High Income Child Benefit Charge” i Storbritannia.',
        },
    },
    {
        label: 'Sentrum for livsinteresser',
        brevtekst: {
            NB: 'Opplysninger om hvilket land du og familien din er bosatt i.',
            NN: 'Opplysningar om kva land du og familien din er busett i.',
        },
    },
    {
        label: 'Selvforsørget EØS borger',
        brevtekst: {
            NB: 'Dokumentasjon som viser at du kan forsørge deg selv og familien din mens du er bosatt i Norge. Du kan sende oss dokumenter som viser at du har pensjon, oppsparte midler eller inntekt på eiendom i Norge. ',
            NN: 'Dokumentasjon som viser at du kan forsørge deg sjølv og familien din medan du er busett i Noreg. Du kan sende oss dokument som viser at du har pensjon, oppsparte midlar eller inntekt på eigedom i Noreg.',
        },
    },
    {
        label: 'Barnetrygden kommer barnet til gode',
        brevtekst: {
            NB: 'Dokumentasjon på, eller opplysninger om hvordan du bruker barnetrygden på barnet.',
            NN: 'Dokumentasjon på, eller opplysningar om korleis du brukar barnetrygda på barnet.',
        },
    },
];
