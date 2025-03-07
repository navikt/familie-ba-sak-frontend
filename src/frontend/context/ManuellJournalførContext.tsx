import React, { useEffect, useState } from 'react';

import type { AxiosError } from 'axios';
import createUseContext from 'constate';
import { differenceInMilliseconds } from 'date-fns';
import { useNavigate, useParams } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import type { Avhengigheter, FeltState, ISkjema } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    type IDokumentInfo,
    Journalstatus,
    type Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useApp } from './AppContext';
import useDokument from '../hooks/useDokument';
import type { IOpprettBehandlingSkjemaBase } from '../komponenter/Fagsak/Personlinje/Behandlingsmeny/OpprettBehandling/useOpprettBehandling';
import type { VisningBehandling } from '../komponenter/Fagsak/Saksoversikt/visningBehandling';
import { Behandlingstype, BehandlingÅrsak } from '../typer/behandling';
import type { IBehandlingstema } from '../typer/behandlingstema';
import { behandlingstemaer } from '../typer/behandlingstema';
import type { IMinimalFagsak } from '../typer/fagsak';
import { FagsakType } from '../typer/fagsak';
import {
    type Journalføringsbehandling,
    opprettJournalføringsbehandlingFraBarnetrygdbehandling,
    opprettJournalføringsbehandlingFraKlagebehandling,
} from '../typer/journalføringsbehandling';
import { type IKlagebehandling, type Klagebehandlingstype } from '../typer/klage';
import type {
    IDataForManuellJournalføring,
    IRestJournalføring,
} from '../typer/manuell-journalføring';
import { JournalpostKanal } from '../typer/manuell-journalføring';
import {
    erOppgaveJournalførKlage,
    finnBehandlingstemaFraOppgave,
    type IRestLukkOppgaveOgKnyttJournalpost,
    OppgavetypeFilter,
} from '../typer/oppgave';
import type { IPersonInfo } from '../typer/person';
import { Adressebeskyttelsegradering } from '../typer/person';
import type { ISamhandlerInfo } from '../typer/samhandler';
import type { Tilbakekrevingsbehandlingstype } from '../typer/tilbakekrevingsbehandling';
import { ToggleNavn } from '../typer/toggles';
import { isoStringTilDate } from '../utils/dato';
import { hentAktivBehandlingPåMinimalFagsak } from '../utils/fagsak';

export interface ManuellJournalføringSkjemaFelter extends IOpprettBehandlingSkjemaBase {
    journalpostTittel: string;
    dokumenter: IDokumentInfo[];
    bruker: IPersonInfo | undefined;
    avsenderNavn: string;
    avsenderIdent: string;
    knyttTilNyBehandling: boolean;
    tilknyttedeBehandlingIder: string[];
    fagsakType: FagsakType;
    samhandler: ISamhandlerInfo | undefined;
}

function finnNyBehandlingstype(
    skjema: ISkjema<ManuellJournalføringSkjemaFelter, string>,
    kanBehandleKlage: boolean
): Behandlingstype | Tilbakekrevingsbehandlingstype | Klagebehandlingstype | undefined {
    const behandlingstype = skjema.felter.behandlingstype.verdi;
    const knyttTilNyBehandling = skjema.felter.knyttTilNyBehandling.verdi;
    if (!kanBehandleKlage) {
        return behandlingstype === '' ? Behandlingstype.FØRSTEGANGSBEHANDLING : behandlingstype;
    }
    if (!knyttTilNyBehandling || behandlingstype === '') {
        return undefined;
    }
    return behandlingstype;
}

function finnNyBehandlingsårsak(
    nyBehandlingstype:
        | Behandlingstype
        | Tilbakekrevingsbehandlingstype
        | Klagebehandlingstype
        | undefined,
    skjema: ISkjema<ManuellJournalføringSkjemaFelter, string>,
    kanBehandleKlage: boolean
): BehandlingÅrsak | undefined {
    const behandlingsårsak = skjema.felter.behandlingsårsak.verdi;
    const knyttTilNyBehandling = skjema.felter.knyttTilNyBehandling.verdi;
    if (!kanBehandleKlage) {
        if (
            nyBehandlingstype === Behandlingstype.FØRSTEGANGSBEHANDLING ||
            behandlingsårsak === '' ||
            nyBehandlingstype === undefined
        ) {
            return BehandlingÅrsak.SØKNAD;
        }
        return behandlingsårsak;
    }
    if (!knyttTilNyBehandling || behandlingsårsak === '') {
        return undefined;
    }
    return behandlingsårsak;
}

const [ManuellJournalførProvider, useManuellJournalfør] = createUseContext(() => {
    const { innloggetSaksbehandler, toggles } = useApp();

    const navigate = useNavigate();
    const { request } = useHttp();
    const { oppgaveId } = useParams<{ oppgaveId: string }>();

    const { hentForhåndsvisning, nullstillDokument, hentetDokument } = useDokument();

    const [minimalFagsak, settMinimalFagsak] = useState<IMinimalFagsak | undefined>(undefined);
    const [erKlage, settErKlage] = useState<boolean>(false);
    const [klagebehandlinger, settKlagebehandlinger] = useState<IKlagebehandling[] | undefined>(
        undefined
    );
    const [dataForManuellJournalføring, settDataForManuellJournalføring] =
        useState(byggTomRessurs<IDataForManuellJournalføring>());
    const [erDigitaltInnsendtDokument, settErDigialtInnsendtDokument] = useState<
        boolean | undefined
    >(undefined);
    const [institusjonsfagsaker, settInstitusjonsfagsaker] =
        useState<Ressurs<IMinimalFagsak[]>>(byggTomRessurs<IMinimalFagsak[]>());

    useEffect(() => {
        if (oppgaveId) {
            hentDataForManuellJournalføring(oppgaveId);
            nullstillDokument();
        }
    }, [oppgaveId]);

    const knyttTilNyBehandling = useFelt<boolean>({
        verdi: false,
    });

    const behandlingstype = useFelt<
        Behandlingstype | Tilbakekrevingsbehandlingstype | Klagebehandlingstype | ''
    >({
        verdi: '',
        valideringsfunksjon: felt => {
            return felt.verdi !== ''
                ? ok(felt)
                : feil(felt, 'Velg type behandling som skal opprettes fra nedtrekkslisten');
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => avhengigheter.knyttTilNyBehandling,
        avhengigheter: { knyttTilNyBehandling: knyttTilNyBehandling.verdi },
    });

    const behandlingsårsak = useFelt<BehandlingÅrsak | ''>({
        verdi: '',
        valideringsfunksjon: felt => {
            return felt.verdi !== ''
                ? ok(felt)
                : feil(felt, 'Velg årsak for opprettelse av behandlingen fra nedtrekkslisten');
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            const knyttTilNyBehandling = avhengigheter.knyttTilNyBehandling;
            const behandlingstypeVerdi = avhengigheter.behandlingstype;
            return knyttTilNyBehandling && behandlingstypeVerdi === Behandlingstype.REVURDERING;
        },
        avhengigheter: {
            behandlingstype: behandlingstype.verdi,
            knyttTilNyBehandling: knyttTilNyBehandling.verdi,
        },
    });

    const [valgtDokumentId, settValgtDokumentId] = React.useState<string | undefined>(undefined);
    const { skjema, nullstillSkjema, onSubmit, hentFeilTilOppsummering } = useSkjema<
        ManuellJournalføringSkjemaFelter,
        string
    >({
        felter: {
            journalpostTittel: useFelt<string>({
                verdi: '',
                valideringsfunksjon: (felt: FeltState<string>) => {
                    return felt.verdi !== ''
                        ? ok(felt)
                        : feil(felt, 'Journalposttittel kan ikke være tom');
                },
            }),
            behandlingstema: useFelt<IBehandlingstema | undefined>({
                verdi:
                    minimalFagsak?.fagsakType === FagsakType.INSTITUSJON
                        ? behandlingstemaer.NASJONAL_INSTITUSJON
                        : undefined,
                avhengigheter: { knyttTilNyBehandling: knyttTilNyBehandling.verdi },
                skalFeltetVises: (avhengigheter: Avhengigheter) =>
                    avhengigheter.knyttTilNyBehandling &&
                    minimalFagsak?.fagsakType !== FagsakType.INSTITUSJON &&
                    !erKlage,
                valideringsfunksjon: (felt: FeltState<IBehandlingstema | undefined>) =>
                    felt.verdi ? ok(felt) : feil(felt, 'Behandlingstema må settes.'),
            }),
            dokumenter: useFelt<IDokumentInfo[]>({
                verdi: [],
                valideringsfunksjon: (felt: FeltState<IDokumentInfo[]>) => {
                    return !felt.verdi.some(
                        (dokument: IDokumentInfo) =>
                            dokument.tittel === undefined || dokument.tittel === ''
                    )
                        ? ok(felt)
                        : feil(felt, 'Tittel på minst ett dokument er ikke satt');
                },
            }),
            bruker: useFelt<IPersonInfo | undefined>({
                verdi: undefined,
                valideringsfunksjon: (felt: FeltState<IPersonInfo | undefined>) => {
                    return felt.verdi !== undefined ? ok(felt) : feil(felt, 'Bruker er ikke satt');
                },
            }),
            avsenderNavn: useFelt<string>({
                verdi: '',
                valideringsfunksjon: (felt: FeltState<string>) => {
                    return felt.verdi !== '' ? ok(felt) : feil(felt, 'Avsenders navn er ikke satt');
                },
            }),
            avsenderIdent: useFelt<string>({
                verdi: '',
            }),
            knyttTilNyBehandling,
            behandlingstype,
            behandlingsårsak,
            tilknyttedeBehandlingIder: useFelt<string[]>({
                verdi: [],
            }),
            fagsakType: useFelt<FagsakType>({
                verdi: minimalFagsak?.fagsakType || FagsakType.NORMAL,
            }),
            samhandler: useFelt<ISamhandlerInfo | undefined>({
                verdi: undefined,
            }),
        },
        skjemanavn: 'Journalfør dokument',
    });

    useEffect(() => {
        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            skjema.felter.dokumenter.validerOgSettFelt(
                dataForManuellJournalføring.data.journalpost.dokumenter ?? []
            );

            skjema.felter.journalpostTittel.validerOgSettFelt(
                dataForManuellJournalføring.data.journalpost.tittel ?? ''
            );

            skjema.felter.behandlingstema.validerOgSettFelt(
                finnBehandlingstemaFraOppgave(dataForManuellJournalføring.data.oppgave)
            );

            skjema.felter.avsenderNavn.validerOgSettFelt(
                dataForManuellJournalføring.data.journalpost.avsenderMottaker?.navn ?? ''
            );

            skjema.felter.avsenderIdent.validerOgSettFelt(
                dataForManuellJournalføring.data.journalpost.avsenderMottaker?.id ?? ''
            );

            skjema.felter.bruker.validerOgSettFelt(dataForManuellJournalføring.data.person);

            if (dataForManuellJournalføring.data.minimalFagsak) {
                settMinimalFagsak(dataForManuellJournalføring.data.minimalFagsak);
            }
            settKlagebehandlinger(dataForManuellJournalføring.data.klagebehandlinger);
            settErKlage(erOppgaveJournalførKlage(dataForManuellJournalføring.data.oppgave));
        }
    }, [dataForManuellJournalføring]);

    useEffect(() => {
        if (skjema.felter.bruker.verdi) {
            hentInstitusjonsfagsakerForPerson(skjema.felter.bruker.verdi.personIdent).then(
                fagsaker => {
                    settInstitusjonsfagsaker(fagsaker);
                }
            );
        }
    }, [skjema.felter.bruker.verdi]);

    const tilbakestillData = () => {
        nullstillSkjema();
    };

    const settMinimalFagsakTilInstitusjonsfagsak = (orgNummer: string) => {
        if (institusjonsfagsaker.status === RessursStatus.SUKSESS) {
            const institusjonsfagsak = institusjonsfagsaker.data.find(
                fagsak => fagsak.institusjon?.orgNummer === orgNummer
            );
            settMinimalFagsak(institusjonsfagsak);
        } else settMinimalFagsak(undefined);
    };

    const settMinimalFagsakTilNormalFagsakForPerson = async (personIdent?: string) => {
        if (personIdent === undefined) {
            settMinimalFagsak(undefined);
        } else {
            const restFagsak = await hentNormalFagsakForPerson(personIdent);
            if (restFagsak.status === RessursStatus.SUKSESS && restFagsak.data) {
                settMinimalFagsak(restFagsak.data);
            } else {
                settMinimalFagsak(undefined);
            }
        }
    };

    const endreBrukerOgSettNormalFagsak = async (personId: string) => {
        const hentetPerson = await request<void, IPersonInfo>({
            method: 'GET',
            url: '/familie-ba-sak/api/person',
            headers: {
                personIdent: personId,
            },
        });

        if (hentetPerson.status !== RessursStatus.SUKSESS) {
            return 'Ukjent feil ved henting av person';
        } else if (!hentetPerson.data.harTilgang) {
            if (
                hentetPerson.data.adressebeskyttelseGradering ===
                Adressebeskyttelsegradering.FORTROLIG
            ) {
                return 'Brukeren har diskresjonskode fortrolig adresse. Avbryt journalføringen og endre enhet.';
            } else if (
                hentetPerson.data.adressebeskyttelseGradering ===
                    Adressebeskyttelsegradering.STRENGT_FORTROLIG ||
                hentetPerson.data.adressebeskyttelseGradering ===
                    Adressebeskyttelsegradering.STRENGT_FORTROLIG_UTLAND
            ) {
                return 'Brukeren har diskresjonskode strengt fortrolig adresse. Avbryt journalføringen og tildel ny saksbehandler.';
            } else {
                return 'Du har ikke tilgang til denne brukeren.';
            }
        }

        skjema.felter.bruker.validerOgSettFelt(hentetPerson.data);
        return settMinimalFagsakTilNormalFagsakForPerson(hentetPerson.data.personIdent);
    };

    const hentDataForManuellJournalføring = async (oppgaveId: string) => {
        settDataForManuellJournalføring(byggHenterRessurs());
        return request<void, IDataForManuellJournalføring>({
            method: 'GET',
            url: `/familie-ba-sak/api/oppgave/${oppgaveId}`,
            påvirkerSystemLaster: true,
        })
            .then((hentetDataForManuellJournalføring: Ressurs<IDataForManuellJournalføring>) => {
                settDataForManuellJournalføring(hentetDataForManuellJournalføring);

                if (hentetDataForManuellJournalføring.status === RessursStatus.SUKSESS) {
                    settErDigialtInnsendtDokument(
                        hentetDataForManuellJournalføring.data.journalpost.kanal ===
                            JournalpostKanal.NAV_NO
                    );
                    const førsteDokument =
                        hentetDataForManuellJournalføring.data.journalpost.dokumenter?.find(
                            () => true
                        );
                    settValgtDokumentId(førsteDokument?.dokumentInfoId);
                    hentOgVisDokument(
                        hentetDataForManuellJournalføring.data.journalpost.journalpostId,
                        førsteDokument?.dokumentInfoId
                    );
                } else {
                    settErDigialtInnsendtDokument(undefined);
                }
            })
            .catch((_error: AxiosError) => {
                settDataForManuellJournalføring(
                    byggFeiletRessurs('Ukjent feil ved henting av oppgave')
                );
                settErDigialtInnsendtDokument(undefined);
            });
    };

    const hentOgVisDokument = async (
        journalpostId: string | undefined,
        dokumentInfoId: string | undefined
    ) => {
        if (!journalpostId || !dokumentInfoId) {
            return;
        }

        hentForhåndsvisning({
            method: 'GET',
            url: `/familie-ba-sak/api/journalpost/${journalpostId}/hent/${dokumentInfoId}`,
            påvirkerSystemLaster: false,
        });
    };

    const velgOgHentDokumentData = (dokumentInfoId: string) => {
        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            hentOgVisDokument(
                dataForManuellJournalføring.data.journalpost.journalpostId,
                dokumentInfoId
            );
            settValgtDokumentId(dokumentInfoId);
        }
    };

    const hentAktivBehandlingForJournalføring = (): VisningBehandling | undefined => {
        let aktivBehandling = undefined;
        if (
            dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            dataForManuellJournalføring.data.minimalFagsak
        ) {
            aktivBehandling = hentAktivBehandlingPåMinimalFagsak(
                dataForManuellJournalføring.data.minimalFagsak
            );
        }
        return aktivBehandling;
    };

    const hentSorterteJournalføringsbehandlinger = (): Journalføringsbehandling[] => {
        const journalføringsbehandlingerKlage = (klagebehandlinger ?? []).map(klagebehandling =>
            opprettJournalføringsbehandlingFraKlagebehandling(klagebehandling)
        );

        const journalføringsbehandlingerBarnetrygd = (minimalFagsak?.behandlinger ?? []).map(
            barnetrygdbehandling =>
                opprettJournalføringsbehandlingFraBarnetrygdbehandling(barnetrygdbehandling)
        );

        const journalføringsbehandlinger = [
            ...(toggles[ToggleNavn.kanBehandleKlage] ? journalføringsbehandlingerKlage : []),
            ...journalføringsbehandlingerBarnetrygd,
        ];

        return journalføringsbehandlinger.sort((behandling1, behandling2) =>
            differenceInMilliseconds(
                isoStringTilDate(behandling2.opprettetTidspunkt),
                isoStringTilDate(behandling1.opprettetTidspunkt)
            )
        );
    };

    const journalfør = () => {
        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            const erDigitalKanal =
                dataForManuellJournalføring.data.journalpost.kanal === JournalpostKanal.NAV_NO;

            const kanBehandleKlage = toggles[ToggleNavn.kanBehandleKlage];
            const nyBehandlingstype = finnNyBehandlingstype(skjema, kanBehandleKlage);
            const nyBehandlingsårsak = finnNyBehandlingsårsak(
                nyBehandlingstype,
                skjema,
                kanBehandleKlage
            );

            //SKAN_IM-kanalen benytter logiske vedlegg, NAV_NO-kanalen gjør ikke. For sistnevnte må titlene konkateneres.
            onSubmit<IRestJournalføring>(
                {
                    method: 'POST',
                    url: `/familie-ba-sak/api/journalpost/${
                        dataForManuellJournalføring.data.journalpost.journalpostId
                    }/journalfør/${oppgaveId}?journalfoerendeEnhet=${
                        innloggetSaksbehandler?.enhet ?? '9999'
                    }`,
                    data: {
                        journalpostTittel: skjema.felter.journalpostTittel.verdi,
                        kategori: skjema.felter.behandlingstema.verdi?.kategori ?? null,
                        underkategori: skjema.felter.behandlingstema.verdi?.underkategori ?? null,
                        bruker: {
                            navn: skjema.felter.bruker.verdi?.navn ?? '',
                            id: skjema.felter.bruker.verdi?.personIdent ?? '',
                        },
                        avsender: {
                            navn: skjema.felter.avsenderNavn.verdi,
                            id: skjema.felter.avsenderIdent.verdi,
                        },
                        datoMottatt: dataForManuellJournalføring.data.journalpost.datoMottatt,
                        dokumenter: skjema.felter.dokumenter.verdi.map(dokument => {
                            const exsisterendeLogiskeVedlegg =
                                dataForManuellJournalføring.data.journalpost.dokumenter?.find(
                                    it => it.dokumentInfoId === dokument.dokumentInfoId
                                )?.logiskeVedlegg;

                            const tittelsammenkobling = dokument.logiskeVedlegg
                                .map(current => current.tittel)
                                .reduce(
                                    (previous, current) => `${previous}, ${current}`,
                                    dokument.tittel ?? ''
                                );

                            return {
                                dokumentTittel: erDigitalKanal
                                    ? tittelsammenkobling
                                    : dokument.tittel,
                                dokumentInfoId: dokument.dokumentInfoId || '0',
                                eksisterendeLogiskeVedlegg: exsisterendeLogiskeVedlegg,
                                logiskeVedlegg: erDigitalKanal
                                    ? exsisterendeLogiskeVedlegg
                                    : dokument.logiskeVedlegg,
                            };
                        }),
                        knyttTilFagsak:
                            skjema.felter.tilknyttedeBehandlingIder.verdi.length > 0 ||
                            skjema.felter.knyttTilNyBehandling.verdi,
                        tilknyttedeBehandlingIder: skjema.felter.tilknyttedeBehandlingIder.verdi,
                        opprettOgKnyttTilNyBehandling: skjema.felter.knyttTilNyBehandling.verdi,
                        nyBehandlingstype: nyBehandlingstype,
                        nyBehandlingsårsak: nyBehandlingsårsak,
                        navIdent: innloggetSaksbehandler?.navIdent ?? '',
                        fagsakType: skjema.felter.fagsakType.verdi,
                        institusjon:
                            skjema.felter.samhandler && skjema.felter.samhandler.verdi?.orgNummer
                                ? {
                                      orgNummer: skjema.felter.samhandler.verdi?.orgNummer,
                                      tssEksternId: skjema.felter.samhandler.verdi?.tssEksternId,
                                  }
                                : null,
                    },
                },
                (fagsakId: Ressurs<string>) => {
                    if (fagsakId.status === RessursStatus.SUKSESS && fagsakId.data !== '') {
                        navigate(`/fagsak/${fagsakId.data}/saksoversikt`);
                    } else if (fagsakId.status === RessursStatus.SUKSESS) {
                        navigate('/oppgaver');
                    }
                }
            );
        }
    };

    const lukkOppgaveOgKnyttJournalpostTilBehandling = () => {
        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            const nyBehandlingstype = skjema.felter.behandlingstype.verdi;
            const nyBehandlingsårsak = skjema.felter.behandlingsårsak.verdi;
            const { verdi: behandlingstema } = skjema.felter.behandlingstema;

            const knyttJournalpostTilFagsak =
                skjema.felter.tilknyttedeBehandlingIder.verdi.length > 0 ||
                skjema.felter.knyttTilNyBehandling.verdi;

            if (!knyttJournalpostTilFagsak) {
                onSubmit<void>(
                    {
                        method: 'GET',
                        url: `/familie-ba-sak/api/oppgave/${oppgaveId}/ferdigstill`,
                    },
                    (respons: Ressurs<string>) => {
                        if (respons.status === RessursStatus.SUKSESS) {
                            navigate('/oppgaver');
                        }
                    }
                );
            } else {
                onSubmit<IRestLukkOppgaveOgKnyttJournalpost>(
                    {
                        method: 'POST',
                        url: `/familie-ba-sak/api/oppgave/${oppgaveId}/ferdigstillOgKnyttjournalpost`,
                        data: {
                            journalpostId:
                                dataForManuellJournalføring.data.journalpost.journalpostId,
                            opprettOgKnyttTilNyBehandling: skjema.felter.knyttTilNyBehandling.verdi,
                            tilknyttedeBehandlingIder:
                                skjema.felter.tilknyttedeBehandlingIder.verdi,
                            kategori: behandlingstema?.kategori ?? null,
                            underkategori: behandlingstema?.underkategori ?? null,
                            bruker: {
                                navn: skjema.felter.bruker.verdi?.navn ?? '',
                                id: skjema.felter.bruker.verdi?.personIdent ?? '',
                            },
                            datoMottatt: dataForManuellJournalføring.data.journalpost.datoMottatt,
                            nyBehandlingstype:
                                nyBehandlingstype === ''
                                    ? Behandlingstype.FØRSTEGANGSBEHANDLING
                                    : nyBehandlingstype,
                            nyBehandlingsårsak:
                                nyBehandlingstype === Behandlingstype.FØRSTEGANGSBEHANDLING
                                    ? BehandlingÅrsak.SØKNAD
                                    : nyBehandlingsårsak === ''
                                      ? BehandlingÅrsak.SØKNAD
                                      : nyBehandlingsårsak,
                            navIdent: innloggetSaksbehandler?.navIdent ?? '',
                        },
                    },
                    (fagsakId: Ressurs<string>) => {
                        if (fagsakId.status === RessursStatus.SUKSESS && fagsakId.data !== '') {
                            navigate(`/fagsak/${fagsakId.data}/saksoversikt`);
                        } else if (fagsakId.status === RessursStatus.SUKSESS) {
                            navigate('/oppgaver');
                        }
                    }
                );
            }
        }
    };

    const erTilordnetInnloggetSaksbehandler = () =>
        dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
        innloggetSaksbehandler !== undefined &&
        dataForManuellJournalføring.data.oppgave.tilordnetRessurs ===
            innloggetSaksbehandler.navIdent;

    const erLesevisning = () => {
        return (
            dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            (dataForManuellJournalføring.data.journalpost.journalstatus !== Journalstatus.MOTTATT ||
                !erTilordnetInnloggetSaksbehandler())
        );
    };

    const kanKnytteJournalpostTilBehandling = () => {
        if (dataForManuellJournalføring.status !== RessursStatus.SUKSESS) {
            return false;
        }
        if (
            dataForManuellJournalføring.data.oppgave.oppgavetype === OppgavetypeFilter.BEH_SED &&
            erTilordnetInnloggetSaksbehandler()
        ) {
            return true;
        }
        return !erLesevisning();
    };

    const kanKnyttesTilInstitusjonsfagsak = () => {
        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            return dataForManuellJournalføring.data.oppgave.oppgavetype === OppgavetypeFilter.JFR;
        }
        return false;
    };

    const settAvsenderLikBruker = () => {
        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            skjema.felter.avsenderNavn.validerOgSettFelt(
                dataForManuellJournalføring.data.person?.navn ?? ''
            );
            skjema.felter.avsenderIdent.validerOgSettFelt(
                dataForManuellJournalføring.data.person?.personIdent ?? ''
            );
        }
    };

    const tilbakestillAvsender = () => {
        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            skjema.felter.avsenderNavn.validerOgSettFelt(
                dataForManuellJournalføring.data.journalpost.avsenderMottaker?.navn ?? ''
            );

            skjema.felter.avsenderIdent.validerOgSettFelt(
                dataForManuellJournalføring.data.journalpost.avsenderMottaker?.id ?? ''
            );
        }
    };

    const hentInstitusjonsfagsakerForPerson = async (personId: string) => {
        return request<{ personIdent: string }, IMinimalFagsak[]>({
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker/hent-fagsaker-paa-person`,
            data: {
                personIdent: personId,
                fagsakTyper: [FagsakType.INSTITUSJON],
            },
        }).then((fagsaker: Ressurs<IMinimalFagsak[]>) => {
            return fagsaker;
        });
    };

    const hentNormalFagsakForPerson = async (personId: string) => {
        return request<{ personIdent: string }, IMinimalFagsak | undefined>({
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker/hent-fagsak-paa-person`,
            data: {
                personIdent: personId,
            },
        }).then((fagsak: Ressurs<IMinimalFagsak | undefined>) => {
            return fagsak;
        });
    };

    return {
        dataForManuellJournalføring,
        hentetDokument,
        endreBrukerOgSettNormalFagsak,
        erLesevisning,
        minimalFagsak,
        hentAktivBehandlingForJournalføring,
        hentFeilTilOppsummering,
        hentSorterteJournalføringsbehandlinger,
        journalfør,
        knyttTilNyBehandling,
        nullstillSkjema,
        skjema,
        tilbakestillData,
        valgtDokumentId,
        velgOgHentDokumentData,
        settAvsenderLikBruker,
        tilbakestillAvsender,
        lukkOppgaveOgKnyttJournalpostTilBehandling,
        kanKnytteJournalpostTilBehandling,
        kanKnyttesTilInstitusjonsfagsak,
        institusjonsfagsaker,
        settMinimalFagsakTilNormalFagsakForPerson,
        settMinimalFagsakTilInstitusjonsfagsak,
        erDigitaltInnsendtDokument,
    };
});

export { ManuellJournalførProvider, useManuellJournalfør };
