import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import useDokument from '@hooks/useDokument';
import { Mottaker } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import { transformerSkjemaData } from '@sider/Fagsak/Dokumentutsending/transformerSkjemaData';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';
import { Distribusjonskanal } from '@typer/dokument';
import { FagsakType } from '@typer/fagsak';
import type { IBarnMedOpplysninger, Målform } from '@typer/søknad';
import { useBarnIBrevFelter } from '@utils/barnIBrevFelter';
import type { IsoDatoString } from '@utils/dato';
import { useDeltBostedFelter } from '@utils/deltBostedSkjemaFelter';
import type { IFritekstFelt } from '@utils/fritekstfelter';
import { hentFrontendFeilmelding } from '@utils/ressursUtils';
import deepEqual from 'deep-equal';

import type { Avhengigheter, FeltState, ISkjema } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { type DokumentÅrsak, DokumentÅrsakInstitusjon, DokumentÅrsakPerson } from './dokumentÅrsakTyper';
import { useBrukerContext } from '../BrukerContext';
import { useFagsakContext } from '../FagsakContext';
import { useManuelleBrevmottakerePåFagsakContext } from '../ManuelleBrevmottakerePåFagsakContext';

export interface DokumentutsendingSkjema {
    årsak: DokumentÅrsak | undefined;
    målform: Målform | undefined;
    fritekster: FeltState<IFritekstFelt>[];
    fritekstAvsnitt: string;
    dokumenter: string[];
    barnMedDeltBosted: IBarnMedOpplysninger[];
    barnIBrev: IBarnMedOpplysninger[];
    avtalerOmDeltBostedPerBarn: Record<string, IsoDatoString[]>;
}

interface DokumentutsendingContextValue {
    hentForhåndsvisningPåFagsak: () => void;
    hentSkjemaFeilmelding: () => string | undefined;
    hentetDokument: Ressurs<string>;
    sendBrevPåFagsak: () => void;
    senderBrev: () => boolean;
    settVisInnsendtBrevModal: (vis: boolean) => void;
    settVisfeilmeldinger: (vis: boolean) => void;
    skjemaErLåst: () => boolean;
    visForhåndsvisningBeskjed: () => boolean;
    visInnsendtBrevModal: boolean;
    skjema: ISkjema<DokumentutsendingSkjema, string>;
    nullstillSkjema: () => void;
    distribusjonskanal: Ressurs<Distribusjonskanal>;
    brukerHarUtenlandskAdresse: boolean;
    brukerHarUkjentAdresse: () => boolean;
    hentDistribusjonskanal: (personIdent: string) => void;
    dokumentÅrsaker: DokumentÅrsak[];
}

const DokumentutsendingContext = createContext<DokumentutsendingContextValue | undefined>(undefined);

export function DokumentutsendingProvider({ children }: PropsWithChildren) {
    const { fagsak } = useFagsakContext();
    const { bruker } = useBrukerContext();
    const { manuelleBrevmottakerePåFagsak, settManuelleBrevmottakerePåFagsak } =
        useManuelleBrevmottakerePåFagsakContext();
    const [visInnsendtBrevModal, settVisInnsendtBrevModal] = useState(false);
    const { hentForhåndsvisning, hentetDokument, distribusjonskanal, hentDistribusjonskanal } = useDokument();

    const [sistBrukteDataVedForhåndsvisning, settSistBrukteDataVedForhåndsvisning] = useState<
        IManueltBrevRequestPåFagsak | undefined
    >(undefined);

    const erInstitusjon = fagsak.fagsakType === FagsakType.INSTITUSJON;
    const dokumentÅrsaker = erInstitusjon
        ? Object.values(DokumentÅrsakInstitusjon)
        : Object.values(DokumentÅrsakPerson);

    const målform = useFelt<Målform | undefined>({
        verdi: undefined,
        valideringsfunksjon: (felt: FeltState<Målform | undefined>) =>
            felt.verdi ? ok(felt) : feil(felt, 'Målform er ikke valgt'),
    });

    const årsak = useFelt<DokumentÅrsak | undefined>({
        verdi: undefined,
        valideringsfunksjon: (felt: FeltState<DokumentÅrsak | undefined>) => {
            return felt.verdi ? ok(felt) : feil(felt, 'Du må velge en årsak');
        },
    });

    const fritekster = useFelt<FeltState<IFritekstFelt>[]>({
        verdi: [],
        valideringsfunksjon: (felt: FeltState<FeltState<IFritekstFelt>[]>) => {
            return felt.verdi.some(
                fritekst => fritekst.valideringsstatus === Valideringsstatus.FEIL || fritekst.verdi.tekst.length === 0
            )
                ? feil(felt, '')
                : ok(felt);
        },
        avhengigheter: { årsakFelt: årsak },
        skalFeltetVises: avhengigheter => {
            return avhengigheter.årsakFelt.verdi === DokumentÅrsakPerson.KAN_SØKE;
        },
    });

    const fritekstAvsnitt = useFelt({
        verdi: '',
        valideringsfunksjon: (felt: FeltState<string>) => {
            return felt.valideringsstatus === Valideringsstatus.FEIL || felt.verdi.length === 0
                ? feil(felt, 'Fritekst avsnitt mangler.')
                : ok(felt);
        },
        avhengigheter: { årsakFelt: årsak },
        skalFeltetVises: avhengigheter => {
            return [
                DokumentÅrsakPerson.INNHENTE_OPPLYSNINGER_KLAGE,
                DokumentÅrsakInstitusjon.INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON,
            ].includes(avhengigheter.årsakFelt.verdi);
        },
    });

    const dokumenter = useFelt({
        verdi: [],
        valideringsfunksjon: (felt: FeltState<string[]>, avhengigheter?: Avhengigheter) => {
            if (felt.verdi.length === 0 && avhengigheter?.fritekster.verdi.length === 0) {
                return feil(felt, 'Du må velge minst ett dokument');
            } else {
                return ok(felt);
            }
        },
        avhengigheter: { årsakFelt: årsak, fritekster: fritekster },
        skalFeltetVises: avhengigheter => {
            return avhengigheter.årsakFelt.verdi === DokumentÅrsakPerson.KAN_SØKE;
        },
        nullstillVedAvhengighetEndring: false,
    });

    const {
        barnMedDeltBosted,
        avtalerOmDeltBostedPerBarn,
        nullstillDeltBosted,
        hentDeltBostedMulitiselectVerdierForBarn,
    } = useDeltBostedFelter({
        avhengigheter: { årsakFelt: årsak },
        skalFeltetVises: avhengigheter => avhengigheter.årsakFelt.verdi === DokumentÅrsakPerson.DELT_BOSTED,
    });

    const { barnIBrev, nullstillBarnIBrev } = useBarnIBrevFelter({
        avhengigheter: { årsakFelt: årsak },
        skalFeltetVises: avhengigheter =>
            [
                DokumentÅrsakPerson.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD,
                DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER,
                DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER,
                DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL,
                DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER,
                DokumentÅrsakPerson.KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV,
            ].includes(avhengigheter.årsakFelt.verdi),
    });

    const {
        skjema,
        onSubmit,
        nullstillSkjema: nullstillHeleSkjema,
        settVisfeilmeldinger,
        kanSendeSkjema,
    } = useSkjema<
        {
            årsak: DokumentÅrsak | undefined;
            målform: Målform | undefined;
            fritekster: FeltState<IFritekstFelt>[];
            fritekstAvsnitt: string;
            dokumenter: string[];
            barnMedDeltBosted: IBarnMedOpplysninger[];
            barnIBrev: IBarnMedOpplysninger[];
            avtalerOmDeltBostedPerBarn: Record<string, IsoDatoString[]>;
        },
        string
    >({
        felter: {
            årsak: årsak,
            målform: målform,

            fritekster: fritekster,
            fritekstAvsnitt: fritekstAvsnitt,
            dokumenter: dokumenter,

            barnMedDeltBosted,
            barnIBrev,
            avtalerOmDeltBostedPerBarn: avtalerOmDeltBostedPerBarn,
        },
        skjemanavn: 'Dokumentutsending',
    });

    const nullstillSkjemaUtenomÅrsak = () => {
        skjema.felter.dokumenter.nullstill();
        skjema.felter.fritekster.nullstill();
        skjema.felter.målform.nullstill();
        skjema.felter.fritekstAvsnitt.nullstill();
        nullstillDeltBosted();
        nullstillBarnIBrev();
    };

    const nullstillSkjema = () => {
        nullstillHeleSkjema();
        nullstillDeltBosted();
        nullstillBarnIBrev();
    };

    useEffect(() => {
        nullstillSkjemaUtenomÅrsak();
    }, [årsak.verdi, bruker]);

    const hentSkjemaData = (): IManueltBrevRequestPåFagsak =>
        transformerSkjemaData({
            skjema,
            manuelleBrevmottakerePåFagsak,
            hentDeltBostedMulitiselectVerdierForBarn,
        });

    const skjemaErLåst = () =>
        skjema.submitRessurs.status === RessursStatus.HENTER || hentetDokument.status === RessursStatus.HENTER;

    const brukerHarUtenlandskAdresse = manuelleBrevmottakerePåFagsak.some(
        mottaker => mottaker.type === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE
    );

    const brukerHarUkjentAdresse = () =>
        !brukerHarUtenlandskAdresse &&
        (distribusjonskanal.status !== RessursStatus.SUKSESS ||
            distribusjonskanal.data === Distribusjonskanal.UKJENT ||
            distribusjonskanal.data === Distribusjonskanal.INGEN_DISTRIBUSJON);

    const senderBrev = () => skjema.submitRessurs.status === RessursStatus.HENTER;

    const hentForhåndsvisningPåFagsak = () => {
        const skjemaData = hentSkjemaData();
        settSistBrukteDataVedForhåndsvisning(skjemaData);
        hentForhåndsvisning<IManueltBrevRequestPåFagsak>({
            method: 'POST',
            data: skjemaData,
            url: `/familie-ba-sak/api/dokument/fagsak/${fagsak.id}/forhaandsvis-brev`,
        });
    };

    const sendBrevPåFagsak = () => {
        if (kanSendeSkjema()) {
            onSubmit(
                {
                    method: 'POST',
                    data: hentSkjemaData(),
                    url: `/familie-ba-sak/api/dokument/fagsak/${fagsak.id}/send-brev`,
                },
                () => {
                    settVisInnsendtBrevModal(true);
                    settManuelleBrevmottakerePåFagsak([]);
                    nullstillSkjema();
                }
            );
        }
    };

    const hentSkjemaFeilmelding = () =>
        hentFrontendFeilmelding(hentetDokument) || hentFrontendFeilmelding(skjema.submitRessurs);

    return (
        <DokumentutsendingContext.Provider
            value={{
                hentForhåndsvisningPåFagsak,
                hentSkjemaFeilmelding,
                hentetDokument,
                sendBrevPåFagsak,
                senderBrev,
                settVisInnsendtBrevModal,
                settVisfeilmeldinger,
                skjemaErLåst,
                visForhåndsvisningBeskjed: () => !deepEqual(hentSkjemaData(), sistBrukteDataVedForhåndsvisning),
                visInnsendtBrevModal,
                skjema,
                nullstillSkjema,
                distribusjonskanal,
                brukerHarUtenlandskAdresse,
                brukerHarUkjentAdresse,
                hentDistribusjonskanal,
                dokumentÅrsaker,
            }}
        >
            {children}
        </DokumentutsendingContext.Provider>
    );
}

export function useDokumentutsendingContext() {
    const context = useContext(DokumentutsendingContext);
    if (context === undefined) {
        throw new Error('useDokumentutsendingContext må brukes innenfor en DokumentutsendingProvider');
    }
    return context;
}
