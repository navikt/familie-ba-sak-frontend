import type { SkjemaBrevmottaker } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { Målform } from '@typer/søknad';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';

import type { DokumentutsendingAvtaleDato, DokumentutsendingFormValues } from './useDokumentutsendingSkjema';
import type { ISelectOptionMedBrevtekst } from '../../Behandling/Høyremeny/Brev/typer';
import { Informasjonsbrev, opplysningsdokumenter } from '../../Behandling/Høyremeny/Brev/typer';
import { DokumentÅrsakInstitusjon, DokumentÅrsakPerson } from '../dokumentÅrsakTyper';

interface SkjemaDataInput {
    skjemaverdier: DokumentutsendingFormValues;
    manuelleBrevmottakerePåFagsak: SkjemaBrevmottaker[];
}

export const hentDeltBostedMultiselectVerdierForBarn = (
    barn: IBarnMedOpplysninger,
    avtalerOmDeltBostedPerBarn: Record<string, DokumentutsendingAvtaleDato[]>
): string[] =>
    (avtalerOmDeltBostedPerBarn[barn.ident] ?? []).map(
        avtale =>
            `Barn født ${isoStringTilFormatertString({
                isoString: barn.fødselsdato,
                tilFormat: Datoformat.DATO,
            })}. Avtalen gjelder fra ${isoStringTilFormatertString({
                isoString: avtale.dato,
                tilFormat: Datoformat.DATO_FORLENGET,
            })}.`
    );

const hentEnkeltInformasjonsbrevRequest = ({
    skjemaverdier,
    manuelleBrevmottakerePåFagsak,
    brevmal,
}: SkjemaDataInput & {
    brevmal: Informasjonsbrev;
}): IManueltBrevRequestPåFagsak => ({
    multiselectVerdier: [],
    barnIBrev: [],
    mottakerMålform: skjemaverdier.målform ?? Målform.NB,
    brevmal: brevmal,
    manuelleBrevmottakere: manuelleBrevmottakerePåFagsak,
});

const hentDeltBostedSkjemaData = ({
    skjemaverdier,
    manuelleBrevmottakerePåFagsak,
}: SkjemaDataInput): IManueltBrevRequestPåFagsak => {
    const merkedeBarn = skjemaverdier.valgteBarn.filter(barn => barn.merket);

    return {
        multiselectVerdier: merkedeBarn.flatMap(barn =>
            hentDeltBostedMultiselectVerdierForBarn(barn, skjemaverdier.avtalerOmDeltBostedPerBarn)
        ),
        barnIBrev: merkedeBarn.map(barn => barn.ident),
        mottakerMålform: skjemaverdier.målform ?? Målform.NB,
        brevmal: Informasjonsbrev.INFORMASJONSBREV_DELT_BOSTED,
        manuelleBrevmottakere: manuelleBrevmottakerePåFagsak,
    };
};

const hentBarnIBrevSkjemaData = ({
    skjemaverdier,
    manuelleBrevmottakerePåFagsak,
    brevmal,
}: SkjemaDataInput & {
    brevmal: Informasjonsbrev;
}): IManueltBrevRequestPåFagsak => {
    const merkedeBarn = skjemaverdier.valgteBarn.filter(barn => barn.merket);

    return {
        multiselectVerdier: merkedeBarn.map(
            barn =>
                `Barn født ${isoStringTilFormatertString({
                    isoString: barn.fødselsdato,
                    tilFormat: Datoformat.DATO,
                })}.`
        ),
        barnIBrev: merkedeBarn.map(barn => barn.ident),
        mottakerMålform: skjemaverdier.målform ?? Målform.NB,
        brevmal: brevmal,
        manuelleBrevmottakere: manuelleBrevmottakerePåFagsak,
    };
};

const hentKanSøkeSkjemaData = ({
    skjemaverdier,
    manuelleBrevmottakerePåFagsak,
}: SkjemaDataInput): IManueltBrevRequestPåFagsak => {
    const målform = skjemaverdier.målform ?? Målform.NB;
    const fritekster = skjemaverdier.fritekster.map(fritekst => fritekst.tekst);

    const dokumenter = skjemaverdier.dokumenter.map(valgtDokument => {
        const dokument = opplysningsdokumenter.find(
            dokument => dokument.label === valgtDokument
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
    skjemaverdier,
    manuelleBrevmottakerePåFagsak,
    brevmal,
}: SkjemaDataInput & {
    brevmal: Informasjonsbrev;
}): IManueltBrevRequestPåFagsak => ({
    multiselectVerdier: [],
    barnIBrev: [],
    mottakerMålform: skjemaverdier.målform ?? Målform.NB,
    brevmal: brevmal,
    manuelleBrevmottakere: manuelleBrevmottakerePåFagsak,
    fritekstAvsnitt: skjemaverdier.fritekstAvsnitt,
});

export const transformerSkjemaData = ({
    skjemaverdier,
    manuelleBrevmottakerePåFagsak,
}: SkjemaDataInput): IManueltBrevRequestPåFagsak => {
    if (!skjemaverdier.årsak) {
        throw new Error('Årsak er ikke valgt og vi kan ikke sende inn skjema');
    }

    switch (skjemaverdier.årsak) {
        case DokumentÅrsakPerson.DELT_BOSTED:
            return hentDeltBostedSkjemaData({ skjemaverdier, manuelleBrevmottakerePåFagsak });

        case DokumentÅrsakPerson.FØDSEL_MINDREÅRIG:
            return hentEnkeltInformasjonsbrevRequest({
                skjemaverdier,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_MINDREÅRIG,
                manuelleBrevmottakerePåFagsak,
            });

        case DokumentÅrsakPerson.FØDSEL_VERGEMÅL:
            return hentEnkeltInformasjonsbrevRequest({
                skjemaverdier,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_VERGEMÅL,
                manuelleBrevmottakerePåFagsak,
            });

        case DokumentÅrsakPerson.FØDSEL_GENERELL:
            return hentEnkeltInformasjonsbrevRequest({
                skjemaverdier,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_GENERELL,
                manuelleBrevmottakerePåFagsak,
            });

        case DokumentÅrsakPerson.KAN_SØKE:
            return hentKanSøkeSkjemaData({ skjemaverdier, manuelleBrevmottakerePåFagsak });

        case DokumentÅrsakPerson.KAN_SØKE_EØS:
            return hentEnkeltInformasjonsbrevRequest({
                skjemaverdier,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_KAN_SØKE_EØS,
                manuelleBrevmottakerePåFagsak,
            });

        case DokumentÅrsakPerson.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD:
            return hentBarnIBrevSkjemaData({
                skjemaverdier,
                brevmal:
                    Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD,
                manuelleBrevmottakerePåFagsak,
            });

        case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER:
            return hentBarnIBrevSkjemaData({
                skjemaverdier,
                brevmal:
                    Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER,
                manuelleBrevmottakerePåFagsak,
            });

        case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER:
            return hentBarnIBrevSkjemaData({
                skjemaverdier,
                brevmal:
                    Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER,
                manuelleBrevmottakerePåFagsak,
            });

        case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL:
            return hentBarnIBrevSkjemaData({
                skjemaverdier,
                brevmal:
                    Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL,
                manuelleBrevmottakerePåFagsak,
            });

        case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER:
            return hentBarnIBrevSkjemaData({
                skjemaverdier,
                brevmal:
                    Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER,
                manuelleBrevmottakerePåFagsak,
            });

        case DokumentÅrsakPerson.KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV:
            return hentBarnIBrevSkjemaData({
                skjemaverdier,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV,
                manuelleBrevmottakerePåFagsak,
            });

        case DokumentÅrsakPerson.INNHENTE_OPPLYSNINGER_KLAGE:
            return hentInnhenteOpplysningerKlageSkjemaData({
                skjemaverdier,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_INNHENTE_OPPLYSNINGER_KLAGE,
                manuelleBrevmottakerePåFagsak,
            });

        case DokumentÅrsakInstitusjon.INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON:
            return hentInnhenteOpplysningerKlageSkjemaData({
                skjemaverdier,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON,
                manuelleBrevmottakerePåFagsak,
            });
    }
};
