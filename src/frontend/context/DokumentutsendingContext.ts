import { useEffect, useState } from 'react';

import createUseContext from 'constate';
import deepEqual from 'deep-equal';

import { ISODateString } from '@navikt/familie-form-elements';
import {
    Avhengigheter,
    feil,
    FeltState,
    ok,
    useFelt,
    useSkjema,
    Valideringsstatus,
} from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import useDokument from '../hooks/useDokument';
import { hentEnkeltInformasjonsbrevRequest } from '../komponenter/Fagsak/Dokumentutsending/Informasjonsbrev/enkeltInformasjonsbrevUtils';
import {
    Informasjonsbrev,
    ISelectOptionMedBrevtekst,
} from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { IManueltBrevRequestPåFagsak } from '../typer/dokument';
import { ForelderBarnRelasjonRolle, IForelderBarnRelasjon } from '../typer/person';
import { IBarnMedOpplysninger, Målform } from '../typer/søknad';
import { datoformat, formaterIsoDato } from '../utils/formatter';
import { IFritekstFelt } from '../utils/fritekstfelter';
import { erIsoStringGyldig } from '../utils/kalender';
import { hentFrontendFeilmelding } from '../utils/ressursUtils';
import { useFagsakRessurser } from './FagsakContext';

export enum DokumentÅrsak {
    DELT_BOSTED = 'DELT_BOSTED',
    FØDSEL_MINDREÅRIG = 'FØDSEL_MINDREÅRIG',
    FØDSEL_UMYNDIG = 'FØDSEL_UMYNDIG',
    FØDSEL_GENERELL = 'FØDSEL_GENERELL',
    KAN_SØKE = 'KAN_SØKE',
}

export const dokumentÅrsak: Record<DokumentÅrsak, string> = {
    DELT_BOSTED: 'Delt bosted',
    FØDSEL_MINDREÅRIG: 'Fødsel mindreårig',
    FØDSEL_UMYNDIG: 'Fødsel umyndig',
    FØDSEL_GENERELL: 'Fødsel generell',
    KAN_SØKE: 'Kan søke',
};

export const [DokumentutsendingProvider, useDokumentutsending] = createUseContext(
    ({ fagsakId }: { fagsakId: number }) => {
        const { bruker } = useFagsakRessurser();
        const [visInnsendtBrevModal, settVisInnsendtBrevModal] = useState(false);
        const { hentForhåndsvisning, hentetDokument } = useDokument();

        const [sistBrukteDataVedForhåndsvisning, settSistBrukteDataVedForhåndsvisning] = useState<
            IManueltBrevRequestPåFagsak | undefined
        >(undefined);

        const målform = useFelt<Målform | undefined>({
            verdi: Målform.NB,
        });

        const årsak = useFelt<DokumentÅrsak>({
            verdi: DokumentÅrsak.DELT_BOSTED,
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
            valideringsfunksjon: (
                felt: FeltState<ISelectOptionMedBrevtekst[]>,
                avhengigheter?: Avhengigheter
            ) => {
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

        const barnaMedOpplysninger = useFelt<IBarnMedOpplysninger[]>({
            verdi: [],
            valideringsfunksjon: felt => {
                return felt.verdi.some((barn: IBarnMedOpplysninger) => barn.merket)
                    ? ok(felt)
                    : feil(felt, 'Du må velge barn');
            },
            avhengigheter: { årsakFelt: årsak },
            skalFeltetVises: avhengigheter => {
                return avhengigheter.årsakFelt.verdi === DokumentÅrsak.DELT_BOSTED;
            },
        });

        const avtalerOmDeltBostedPerBarn = useFelt<Record<string, ISODateString[]>>({
            verdi: {},
            valideringsfunksjon: (felt, avhengigheter) => {
                const barnaMedOpplysninger = avhengigheter?.verdi ?? [];

                return barnaMedOpplysninger
                    .filter((barn: IBarnMedOpplysninger) => barn.merket)
                    .some((barn: IBarnMedOpplysninger) =>
                        felt.verdi[barn.ident]?.some(
                            avtaleDato => avtaleDato.length === 0 || !erIsoStringGyldig(avtaleDato)
                        )
                    )
                    ? feil(felt, 'Minst én av barna mangler avtale om delt bosted')
                    : ok(felt);
            },
            avhengigheter: barnaMedOpplysninger,
        });
        const {
            skjema,
            onSubmit,
            nullstillSkjema: nullstillHeleSkjema,
            settVisfeilmeldinger,
        } = useSkjema<
            {
                årsak: DokumentÅrsak;
                målform: Målform | undefined;
                fritekster: FeltState<IFritekstFelt>[];
                dokumenter: ISelectOptionMedBrevtekst[];
                barnaMedOpplysninger: IBarnMedOpplysninger[];
                avtalerOmDeltBostedPerBarn: Record<string, ISODateString[]>;
            },
            string
        >({
            felter: {
                årsak: årsak,
                målform: målform,

                fritekster: fritekster,
                dokumenter: dokumenter,

                barnaMedOpplysninger,
                avtalerOmDeltBostedPerBarn: avtalerOmDeltBostedPerBarn,
            },
            skjemanavn: 'Dokumentutsending',
        });

        const nullstillBarnaMedOpplysninger = () => {
            if (bruker.status === RessursStatus.SUKSESS) {
                skjema.felter.barnaMedOpplysninger.validerOgSettFelt(
                    bruker.data.forelderBarnRelasjon
                        .filter(
                            (relasjon: IForelderBarnRelasjon) =>
                                relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN
                        )
                        .map(
                            (relasjon: IForelderBarnRelasjon): IBarnMedOpplysninger => ({
                                merket: false,
                                ident: relasjon.personIdent,
                                navn: relasjon.navn,
                                fødselsdato: relasjon.fødselsdato,
                                manueltRegistrert: false,
                                erFolkeregistrert: true,
                            })
                        ) ?? []
                );
            }
        };

        const nullstillSkjemaUtenomÅrsak = () => {
            skjema.felter.dokumenter.nullstill();
            skjema.felter.fritekster.nullstill();
            skjema.felter.målform.nullstill();
            skjema.felter.avtalerOmDeltBostedPerBarn.nullstill();
            nullstillBarnaMedOpplysninger();
        };

        const nullstillSkjema = () => {
            nullstillHeleSkjema();
            nullstillBarnaMedOpplysninger();
        };

        useEffect(() => {
            nullstillSkjemaUtenomÅrsak();
        }, [årsak.verdi, bruker.status]);

        const hentDeltBostedSkjemaData = (målform: Målform): IManueltBrevRequestPåFagsak => {
            if (bruker.status === RessursStatus.SUKSESS) {
                const barnIBrev = skjema.felter.barnaMedOpplysninger.verdi.filter(
                    barn => barn.merket
                );

                return {
                    mottakerIdent: bruker.data.personIdent,
                    multiselectVerdier: barnIBrev.flatMap(barn => {
                        const avtalerOmDeltBosted =
                            skjema.felter.avtalerOmDeltBostedPerBarn.verdi[barn.ident] ?? [];

                        return avtalerOmDeltBosted.map(
                            avtaletidspunktDeltBosted =>
                                `Barn født ${formaterIsoDato(
                                    barn.fødselsdato,
                                    datoformat.DATO
                                )}. Avtalen gjelder fra ${formaterIsoDato(
                                    avtaletidspunktDeltBosted,
                                    datoformat.DATO_FORLENGET
                                )}.`
                        );
                    }),
                    barnIBrev: barnIBrev.map(barn => barn.ident),
                    mottakerMålform: målform,
                    mottakerNavn: bruker.data.navn,
                    brevmal: Informasjonsbrev.INFORMASJONSBREV_DELT_BOSTED,
                };
            } else {
                throw Error('Bruker ikke hentet inn og vi kan ikke sende inn skjema');
            }
        };

        const hentKanSøkeSkjemaData = (målform: Målform): IManueltBrevRequestPåFagsak => {
            if (bruker.status === RessursStatus.SUKSESS) {
                const fritekster = skjema.felter.fritekster.verdi.map(
                    fritekstFelt => fritekstFelt.verdi.tekst
                );

                const dokumenter = skjema.felter.dokumenter.verdi.map(dokumentOption => {
                    if (!dokumentOption.brevtekst) {
                        throw new Error('Dokumentoptionen mangler brevtekst');
                    }
                    return dokumentOption.brevtekst[målform];
                });

                return {
                    mottakerIdent: bruker.data.personIdent,
                    multiselectVerdier: dokumenter.concat(fritekster),
                    barnIBrev: [],
                    mottakerMålform: målform,
                    mottakerNavn: bruker.data.navn,
                    brevmal: Informasjonsbrev.INFORMASJONSBREV_KAN_SØKE,
                };
            } else {
                throw Error('Bruker ikke hentet inn og vi kan ikke sende inn skjema');
            }
        };

        const hentSkjemaData = (): IManueltBrevRequestPåFagsak => {
            if (bruker.status === RessursStatus.SUKSESS) {
                switch (skjema.felter.årsak.verdi) {
                    case DokumentÅrsak.DELT_BOSTED:
                        return hentDeltBostedSkjemaData(målform.verdi ?? Målform.NB);

                    case DokumentÅrsak.FØDSEL_MINDREÅRIG:
                        return hentEnkeltInformasjonsbrevRequest({
                            bruker: bruker,
                            målform: målform.verdi ?? Målform.NB,
                            brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_MINDREÅRIG,
                        });
                    case DokumentÅrsak.FØDSEL_UMYNDIG:
                        return hentEnkeltInformasjonsbrevRequest({
                            bruker: bruker,
                            målform: målform.verdi ?? Målform.NB,
                            brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_UMYNDIG,
                        });
                    case DokumentÅrsak.FØDSEL_GENERELL:
                        return hentEnkeltInformasjonsbrevRequest({
                            bruker: bruker,
                            målform: målform.verdi ?? Målform.NB,
                            brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_GENERELL,
                        });
                    case DokumentÅrsak.KAN_SØKE:
                        return hentKanSøkeSkjemaData(målform.verdi ?? Målform.NB);
                }
            } else {
                throw Error('Bruker ikke hentet inn og vi kan ikke sende inn skjema');
            }
        };

        const skjemaErLåst = () =>
            skjema.submitRessurs.status === RessursStatus.HENTER ||
            hentetDokument.status === RessursStatus.HENTER;

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
            return onSubmit(
                {
                    method: 'POST',
                    data: hentSkjemaData(),
                    url: `/familie-ba-sak/api/dokument/fagsak/${fagsakId}/send-brev`,
                },
                () => {
                    settVisInnsendtBrevModal(true);
                    nullstillSkjema();
                }
            );
        };

        const hentSkjemaFeilmelding = () =>
            hentFrontendFeilmelding(hentetDokument) ||
            hentFrontendFeilmelding(skjema.submitRessurs);

        return {
            fagsakId,
            hentForhåndsvisningPåFagsak,
            hentSkjemaFeilmelding,
            hentetForhåndsvisning: hentetDokument,
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
        };
    }
);
