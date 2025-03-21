import { useEffect, useState } from 'react';

import createUseContext from 'constate';
import deepEqual from 'deep-equal';

import type { Avhengigheter, FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import useDokument from '../hooks/useDokument';
import {
    Informasjonsbrev,
    opplysningsdokumenter,
} from '../sider/Fagsak/Behandling/Høyremeny/Hendelsesoversikt/BrevModul/typer';
import type { ISelectOptionMedBrevtekst } from '../sider/Fagsak/Behandling/Høyremeny/Hendelsesoversikt/BrevModul/typer';
import { hentEnkeltInformasjonsbrevRequest } from '../sider/Fagsak/Dokumentutsending/Informasjonsbrev/enkeltInformasjonsbrevUtils';
import { useFagsakContext } from '../sider/Fagsak/FagsakContext';
import { Mottaker } from '../sider/Fagsak/Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import type { IManueltBrevRequestPåFagsak } from '../typer/dokument';
import { Distribusjonskanal } from '../typer/dokument';
import type { IBarnMedOpplysninger } from '../typer/søknad';
import { Målform } from '../typer/søknad';
import { useBarnIBrevFelter } from '../utils/barnIBrevFelter';
import type { IsoDatoString } from '../utils/dato';
import { Datoformat, isoStringTilFormatertString } from '../utils/dato';
import { useDeltBostedFelter } from '../utils/deltBostedSkjemaFelter';
import type { IFritekstFelt } from '../utils/fritekstfelter';
import { hentFrontendFeilmelding } from '../utils/ressursUtils';

export enum DokumentÅrsak {
    DELT_BOSTED = 'DELT_BOSTED',
    FØDSEL_MINDREÅRIG = 'FØDSEL_MINDREÅRIG',
    FØDSEL_VERGEMÅL = 'FØDSEL_VERGEMÅL',
    FØDSEL_GENERELL = 'FØDSEL_GENERELL',
    KAN_SØKE = 'KAN_SØKE',
    KAN_SØKE_EØS = 'KAN_SØKE_EØS',
    TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER = 'TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER',
    TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER = 'TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER',
    TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL = 'TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL',
    TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER = 'TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER',
    TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD = 'TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD',
    KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV = 'KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV',
}

export const dokumentÅrsak: Record<DokumentÅrsak, string> = {
    DELT_BOSTED: 'Delt bosted',
    FØDSEL_MINDREÅRIG: 'Fødsel mindreårig',
    FØDSEL_VERGEMÅL: 'Fødsel vergemål',
    FØDSEL_GENERELL: 'Fødsel generell',
    KAN_SØKE: 'Kan søke',
    KAN_SØKE_EØS: 'Kan søke EØS',
    TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER:
        'Til forelder omfattet norsk lovgivning - har fått en søknad fra annen forelder',
    TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER:
        'Til forelder omfattet norsk lovgivning - har gjort vedtak til annen forelder',
    TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL:
        'Til forelder omfattet norsk lovgivning - varsel om årlig kontroll',
    TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER:
        'Til forelder omfattet norsk lovgivning - henter ikke registeropplysninger',
    TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD:
        'Til forelder med selvstendig rett vi har fått F016 - kan søke om barnetrygd',
    KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV: 'Kan ha rett til pengestøtte fra Nav',
};

export const [DokumentutsendingProvider, useDokumentutsending] = createUseContext(
    ({ fagsakId }: { fagsakId: number }) => {
        const { bruker, manuelleBrevmottakerePåFagsak, settManuelleBrevmottakerePåFagsak } =
            useFagsakContext();
        const [visInnsendtBrevModal, settVisInnsendtBrevModal] = useState(false);
        const { hentForhåndsvisning, hentetDokument, distribusjonskanal, hentDistribusjonskanal } =
            useDokument();

        const [sistBrukteDataVedForhåndsvisning, settSistBrukteDataVedForhåndsvisning] = useState<
            IManueltBrevRequestPåFagsak | undefined
        >(undefined);

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
                    fritekst =>
                        fritekst.valideringsstatus === Valideringsstatus.FEIL ||
                        fritekst.verdi.tekst.length === 0
                )
                    ? feil(felt, '')
                    : ok(felt);
            },
            avhengigheter: { årsakFelt: årsak },
            skalFeltetVises: avhengigheter => {
                return avhengigheter.årsakFelt.verdi === DokumentÅrsak.KAN_SØKE;
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
                return avhengigheter.årsakFelt.verdi === DokumentÅrsak.KAN_SØKE;
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
            skalFeltetVises: avhengigheter =>
                avhengigheter.årsakFelt.verdi === DokumentÅrsak.DELT_BOSTED,
        });

        const { barnIBrev, nullstillBarnIBrev } = useBarnIBrevFelter({
            avhengigheter: { årsakFelt: årsak },
            skalFeltetVises: avhengigheter =>
                [
                    DokumentÅrsak.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD,
                    DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER,
                    DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER,
                    DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL,
                    DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER,
                    DokumentÅrsak.KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV,
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
        }, [årsak.verdi, bruker.status]);

        const hentDeltBostedSkjemaData = (målform: Målform): IManueltBrevRequestPåFagsak => {
            const barnIBrev = skjema.felter.barnMedDeltBosted.verdi.filter(barn => barn.merket);

            return {
                multiselectVerdier: barnIBrev.flatMap(hentDeltBostedMulitiselectVerdierForBarn),
                barnIBrev: barnIBrev.map(barn => barn.ident),
                mottakerMålform: målform,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_DELT_BOSTED,
                manuelleBrevmottakere: manuelleBrevmottakerePåFagsak,
            };
        };

        const hentBarnIBrevSkjemaData = (
            brevmal: Informasjonsbrev,
            målform: Målform
        ): IManueltBrevRequestPåFagsak => {
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
                mottakerMålform: målform,
                brevmal: brevmal,
                manuelleBrevmottakere: manuelleBrevmottakerePåFagsak,
            };
        };

        const hentKanSøkeSkjemaData = (målform: Målform): IManueltBrevRequestPåFagsak => {
            const fritekster = skjema.felter.fritekster.verdi.map(
                fritekstFelt => fritekstFelt.verdi.tekst
            );

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

        const hentSkjemaData = (): IManueltBrevRequestPåFagsak => {
            const dokumentÅrsak = skjema.felter.årsak.verdi;
            if (bruker.status === RessursStatus.SUKSESS && dokumentÅrsak) {
                switch (dokumentÅrsak) {
                    case DokumentÅrsak.DELT_BOSTED:
                        return hentDeltBostedSkjemaData(målform.verdi ?? Målform.NB);

                    case DokumentÅrsak.FØDSEL_MINDREÅRIG:
                        return hentEnkeltInformasjonsbrevRequest({
                            målform: målform.verdi ?? Målform.NB,
                            brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_MINDREÅRIG,
                            manuelleBrevmottakerePåFagsak,
                        });
                    case DokumentÅrsak.FØDSEL_VERGEMÅL:
                        return hentEnkeltInformasjonsbrevRequest({
                            målform: målform.verdi ?? Målform.NB,
                            brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_VERGEMÅL,
                            manuelleBrevmottakerePåFagsak,
                        });
                    case DokumentÅrsak.FØDSEL_GENERELL:
                        return hentEnkeltInformasjonsbrevRequest({
                            målform: målform.verdi ?? Målform.NB,
                            brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_GENERELL,
                            manuelleBrevmottakerePåFagsak,
                        });
                    case DokumentÅrsak.KAN_SØKE:
                        return hentKanSøkeSkjemaData(målform.verdi ?? Målform.NB);
                    case DokumentÅrsak.KAN_SØKE_EØS:
                        return hentEnkeltInformasjonsbrevRequest({
                            målform: målform.verdi ?? Målform.NB,
                            brevmal: Informasjonsbrev.INFORMASJONSBREV_KAN_SØKE_EØS,
                            manuelleBrevmottakerePåFagsak,
                        });

                    case DokumentÅrsak.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD:
                        return hentBarnIBrevSkjemaData(
                            Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD,
                            målform.verdi ?? Målform.NB
                        );
                    case DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER:
                        return hentBarnIBrevSkjemaData(
                            Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER,
                            målform.verdi ?? Målform.NB
                        );
                    case DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER:
                        return hentBarnIBrevSkjemaData(
                            Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER,
                            målform.verdi ?? Målform.NB
                        );
                    case DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL:
                        return hentBarnIBrevSkjemaData(
                            Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL,
                            målform.verdi ?? Målform.NB
                        );
                    case DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER:
                        return hentBarnIBrevSkjemaData(
                            Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER,
                            målform.verdi ?? Målform.NB
                        );
                    case DokumentÅrsak.KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV:
                        return hentBarnIBrevSkjemaData(
                            Informasjonsbrev.INFORMASJONSBREV_KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV,
                            målform.verdi ?? Målform.NB
                        );
                }
            } else {
                throw Error('Bruker ikke hentet inn og vi kan ikke sende inn skjema');
            }
        };

        const skjemaErLåst = () =>
            skjema.submitRessurs.status === RessursStatus.HENTER ||
            hentetDokument.status === RessursStatus.HENTER;

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
                url: `/familie-ba-sak/api/dokument/fagsak/${fagsakId}/forhaandsvis-brev`,
            });
        };

        const sendBrevPåFagsak = () => {
            if (kanSendeSkjema()) {
                onSubmit(
                    {
                        method: 'POST',
                        data: hentSkjemaData(),
                        url: `/familie-ba-sak/api/dokument/fagsak/${fagsakId}/send-brev`,
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
            hentFrontendFeilmelding(hentetDokument) ||
            hentFrontendFeilmelding(skjema.submitRessurs);

        return {
            fagsakId,
            hentForhåndsvisningPåFagsak,
            hentSkjemaFeilmelding,
            hentetDokument,
            sendBrevPåFagsak,
            senderBrev,
            settVisInnsendtBrevModal,
            settVisfeilmeldinger,
            skjemaErLåst,
            visForhåndsvisningBeskjed: () =>
                !deepEqual(hentSkjemaData(), sistBrukteDataVedForhåndsvisning),
            visInnsendtBrevModal,
            skjema,
            nullstillSkjema,
            distribusjonskanal,
            brukerHarUtenlandskAdresse,
            brukerHarUkjentAdresse,
            hentDistribusjonskanal,
        };
    }
);
