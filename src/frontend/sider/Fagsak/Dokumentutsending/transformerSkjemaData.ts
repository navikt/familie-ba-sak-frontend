import type { SkjemaBrevmottaker } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';
import { type IBarnMedOpplysninger, Målform } from '@typer/søknad';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';

import type { ISkjema } from '@navikt/familie-skjema';

import type { DokumentutsendingSkjema } from './DokumentutsendingContext';
import { DokumentÅrsakInstitusjon, DokumentÅrsakPerson } from './dokumentÅrsakTyper';
import type { ISelectOptionMedBrevtekst } from '../Behandling/Høyremeny/Brev/typer';
import { Informasjonsbrev, opplysningsdokumenter } from '../Behandling/Høyremeny/Brev/typer';

interface SkjemaDataInput {
    skjema: ISkjema<DokumentutsendingSkjema, string>;
    manuelleBrevmottakerePåFagsak: SkjemaBrevmottaker[];
}

const hentEnkeltInformasjonsbrevRequest = ({
    skjema,
    manuelleBrevmottakerePåFagsak,
    brevmal,
}: SkjemaDataInput & {
    brevmal: Informasjonsbrev;
}): IManueltBrevRequestPåFagsak => ({
    multiselectVerdier: [],
    barnIBrev: [],
    mottakerMålform: skjema.felter.målform.verdi ?? Målform.NB,
    brevmal: brevmal,
    manuelleBrevmottakere: manuelleBrevmottakerePåFagsak,
});

const hentDeltBostedSkjemaData = ({
    skjema,
    manuelleBrevmottakerePåFagsak,
    hentDeltBostedMulitiselectVerdierForBarn,
}: SkjemaDataInput & {
    hentDeltBostedMulitiselectVerdierForBarn: (barn: IBarnMedOpplysninger) => string[];
}): IManueltBrevRequestPåFagsak => {
    const barnIBrev = skjema.felter.barnMedDeltBosted.verdi.filter(barn => barn.merket);

    return {
        multiselectVerdier: barnIBrev.flatMap(hentDeltBostedMulitiselectVerdierForBarn),
        barnIBrev: barnIBrev.map(barn => barn.ident),
        mottakerMålform: skjema.felter.målform.verdi ?? Målform.NB,
        brevmal: Informasjonsbrev.INFORMASJONSBREV_DELT_BOSTED,
        manuelleBrevmottakere: manuelleBrevmottakerePåFagsak,
    };
};

const hentBarnIBrevSkjemaData = ({
    skjema,
    manuelleBrevmottakerePåFagsak,
    brevmal,
}: SkjemaDataInput & {
    brevmal: Informasjonsbrev;
}): IManueltBrevRequestPåFagsak => {
    const barnIBrev = skjema.felter.barnIBrev.verdi.filter(barn => barn.merket);

    return {
        multiselectVerdier: barnIBrev.map(
            barn =>
                `Barn født ${isoStringTilFormatertString({
                    isoString: barn.fødselsdato,
                    tilFormat: Datoformat.DATO,
                })}.`
        ),
        barnIBrev: barnIBrev.map(barn => barn.ident),
        mottakerMålform: skjema.felter.målform.verdi ?? Målform.NB,
        brevmal: brevmal,
        manuelleBrevmottakere: manuelleBrevmottakerePåFagsak,
    };
};

const hentKanSøkeSkjemaData = ({
    skjema,
    manuelleBrevmottakerePåFagsak,
}: SkjemaDataInput): IManueltBrevRequestPåFagsak => {
    const målform = skjema.felter.målform.verdi ?? Målform.NB;
    const fritekster = skjema.felter.fritekster.verdi.map(fritekstFelt => fritekstFelt.verdi.tekst);

    const dokumenter = skjema.felter.dokumenter.verdi.map(dokumentOption => {
        const dokument = opplysningsdokumenter.find(
            dokument => dokument.label === dokumentOption
        ) as ISelectOptionMedBrevtekst;
        if (!dokument.brevtekst) {
            throw new Error('Dokumentoptionen mangler brevtekst');
        }
        return dokument.brevtekst[målform];
    });

    return {
        multiselectVerdier: dokumenter.concat(fritekster),
        barnIBrev: [],
        mottakerMålform: målform,
        brevmal: Informasjonsbrev.INFORMASJONSBREV_KAN_SØKE,
        manuelleBrevmottakere: manuelleBrevmottakerePåFagsak,
    };
};

const hentInnhenteOpplysningerKlageSkjemaData = ({
    skjema,
    manuelleBrevmottakerePåFagsak,
    brevmal,
}: SkjemaDataInput & {
    brevmal: Informasjonsbrev;
}): IManueltBrevRequestPåFagsak => ({
    multiselectVerdier: [],
    barnIBrev: [],
    mottakerMålform: skjema.felter.målform.verdi ?? Målform.NB,
    brevmal: brevmal,
    manuelleBrevmottakere: manuelleBrevmottakerePåFagsak,
    fritekstAvsnitt: skjema.felter.fritekstAvsnitt.verdi,
});

export const transformerSkjemaData = ({
    skjema,
    manuelleBrevmottakerePåFagsak,
    hentDeltBostedMulitiselectVerdierForBarn,
}: SkjemaDataInput & {
    hentDeltBostedMulitiselectVerdierForBarn: (barn: IBarnMedOpplysninger) => string[];
}): IManueltBrevRequestPåFagsak => {
    const dokumentÅrsak = skjema.felter.årsak.verdi;
    if (!dokumentÅrsak) {
        throw Error('Bruker ikke hentet inn og vi kan ikke sende inn skjema');
    }

    switch (dokumentÅrsak) {
        case DokumentÅrsakPerson.DELT_BOSTED:
            return hentDeltBostedSkjemaData({
                skjema,
                manuelleBrevmottakerePåFagsak,
                hentDeltBostedMulitiselectVerdierForBarn,
            });

        case DokumentÅrsakPerson.FØDSEL_MINDREÅRIG:
            return hentEnkeltInformasjonsbrevRequest({
                skjema,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_MINDREÅRIG,
                manuelleBrevmottakerePåFagsak,
            });
        case DokumentÅrsakPerson.FØDSEL_VERGEMÅL:
            return hentEnkeltInformasjonsbrevRequest({
                skjema,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_VERGEMÅL,
                manuelleBrevmottakerePåFagsak,
            });
        case DokumentÅrsakPerson.FØDSEL_GENERELL:
            return hentEnkeltInformasjonsbrevRequest({
                skjema,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_GENERELL,
                manuelleBrevmottakerePåFagsak,
            });
        case DokumentÅrsakPerson.KAN_SØKE:
            return hentKanSøkeSkjemaData({ skjema, manuelleBrevmottakerePåFagsak });
        case DokumentÅrsakPerson.KAN_SØKE_EØS:
            return hentEnkeltInformasjonsbrevRequest({
                skjema,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_KAN_SØKE_EØS,
                manuelleBrevmottakerePåFagsak,
            });

        case DokumentÅrsakPerson.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD:
            return hentBarnIBrevSkjemaData({
                skjema,
                brevmal:
                    Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD,
                manuelleBrevmottakerePåFagsak,
            });
        case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER:
            return hentBarnIBrevSkjemaData({
                skjema,
                brevmal:
                    Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER,
                manuelleBrevmottakerePåFagsak,
            });
        case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER:
            return hentBarnIBrevSkjemaData({
                skjema,
                brevmal:
                    Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER,
                manuelleBrevmottakerePåFagsak,
            });
        case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL:
            return hentBarnIBrevSkjemaData({
                skjema,
                brevmal:
                    Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL,
                manuelleBrevmottakerePåFagsak,
            });
        case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER:
            return hentBarnIBrevSkjemaData({
                skjema,
                brevmal:
                    Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER,
                manuelleBrevmottakerePåFagsak,
            });
        case DokumentÅrsakPerson.KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV:
            return hentBarnIBrevSkjemaData({
                skjema,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV,
                manuelleBrevmottakerePåFagsak,
            });
        case DokumentÅrsakPerson.INNHENTE_OPPLYSNINGER_KLAGE:
            return hentInnhenteOpplysningerKlageSkjemaData({
                skjema,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_INNHENTE_OPPLYSNINGER_KLAGE,
                manuelleBrevmottakerePåFagsak,
            });
        case DokumentÅrsakInstitusjon.INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON:
            return hentInnhenteOpplysningerKlageSkjemaData({
                skjema,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON,
                manuelleBrevmottakerePåFagsak,
            });
    }
};
