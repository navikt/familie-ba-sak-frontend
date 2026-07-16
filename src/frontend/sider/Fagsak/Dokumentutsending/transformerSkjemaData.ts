import type { SkjemaBrevmottaker } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import { finnBarnIBrevÅrsak } from '@sider/Fagsak/Dokumentutsending/barnIBrevÅrsak';
import { DokumentÅrsak } from '@sider/Fagsak/Dokumentutsending/dokumentÅrsakTyper';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';
import { Målform } from '@typer/søknad';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';
import {
    Informasjonsbrev,
    type ISelectOptionMedBrevtekst,
    opplysningsdokumenter,
} from '../Behandling/Høyremeny/Brev/typer';
import type { DokumentutsendingBarn, DokumentutsendingFormValues } from './useDokumentutsendingSkjema';

interface SkjemaDataInput {
    skjemaverdier: DokumentutsendingFormValues;
    manuelleBrevmottakerePåFagsak: SkjemaBrevmottaker[];
}

const brevmalPerÅrsak: Partial<Record<DokumentÅrsak, Informasjonsbrev>> = {
    [DokumentÅrsak.FØDSEL_MINDREÅRIG]: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_MINDREÅRIG,
    [DokumentÅrsak.FØDSEL_VERGEMÅL]: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_VERGEMÅL,
    [DokumentÅrsak.FØDSEL_GENERELL]: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_GENERELL,
    [DokumentÅrsak.KAN_SØKE_EØS]: Informasjonsbrev.INFORMASJONSBREV_KAN_SØKE_EØS,
    [DokumentÅrsak.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD]:
        Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD,
    [DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER]:
        Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER,
    [DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER]:
        Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER,
    [DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL]:
        Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL,
    [DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER]:
        Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER,
    [DokumentÅrsak.KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV]:
        Informasjonsbrev.INFORMASJONSBREV_KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV,
    [DokumentÅrsak.INNHENTE_OPPLYSNINGER_KLAGE]: Informasjonsbrev.INFORMASJONSBREV_INNHENTE_OPPLYSNINGER_KLAGE,
    [DokumentÅrsak.INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON]:
        Informasjonsbrev.INFORMASJONSBREV_INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON,
};

export const hentDeltBostedMultiselectVerdierForBarn = (barn: DokumentutsendingBarn): string[] =>
    barn.avtalerOmDeltBosted.map(
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
}: SkjemaDataInput & { brevmal: Informasjonsbrev }): IManueltBrevRequestPåFagsak => ({
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
        multiselectVerdier: merkedeBarn.flatMap(barn => hentDeltBostedMultiselectVerdierForBarn(barn)),
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
    const { årsak } = skjemaverdier;
    if (!årsak) {
        throw new Error('Årsak er ikke valgt og vi kan ikke sende inn skjema');
    }

    switch (årsak) {
        case DokumentÅrsak.DELT_BOSTED:
            return hentDeltBostedSkjemaData({ skjemaverdier, manuelleBrevmottakerePåFagsak });

        case DokumentÅrsak.KAN_SØKE:
            return hentKanSøkeSkjemaData({ skjemaverdier, manuelleBrevmottakerePåFagsak });

        default: {
            const brevmal = brevmalPerÅrsak[årsak];
            if (!brevmal) {
                throw new Error(`Fant ingen brevmal for årsak ${årsak}`);
            }

            if (
                årsak === DokumentÅrsak.INNHENTE_OPPLYSNINGER_KLAGE ||
                årsak === DokumentÅrsak.INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON
            ) {
                return hentInnhenteOpplysningerKlageSkjemaData({
                    skjemaverdier,
                    brevmal,
                    manuelleBrevmottakerePåFagsak,
                });
            }

            return finnBarnIBrevÅrsak(årsak) !== undefined
                ? hentBarnIBrevSkjemaData({ skjemaverdier, brevmal, manuelleBrevmottakerePåFagsak })
                : hentEnkeltInformasjonsbrevRequest({ skjemaverdier, brevmal, manuelleBrevmottakerePåFagsak });
        }
    }
};
