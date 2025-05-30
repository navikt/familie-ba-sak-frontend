import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    type PropsWithChildren,
} from 'react';

import type { AxiosError } from 'axios';
import { differenceInMilliseconds } from 'date-fns';
import { useNavigate, useParams } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import type {
    Avhengigheter,
    FeiloppsummeringFeil,
    Felt,
    FeltState,
    ISkjema,
} from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import {
    hentDataFraRessurs,
    type IDokumentInfo,
    Journalstatus,
    type Ressurs,
} from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useKlageApi } from '../../api/useKlageApi';
import { useAppContext } from '../../context/AppContext';
import useDokument from '../../hooks/useDokument';
import { Behandlingstype, BehandlingÅrsak } from '../../typer/behandling';
import type { IBehandlingstema } from '../../typer/behandlingstema';
import { behandlingstemaer } from '../../typer/behandlingstema';
import type { IMinimalFagsak } from '../../typer/fagsak';
import { FagsakType } from '../../typer/fagsak';
import {
    type Journalføringsbehandling,
    opprettJournalføringsbehandlingFraBarnetrygdbehandling,
    opprettJournalføringsbehandlingFraKlagebehandling,
} from '../../typer/journalføringsbehandling';
import type { IKlagebehandling } from '../../typer/klage';
import { Klagebehandlingstype } from '../../typer/klage';
import type {
    IDataForManuellJournalføring,
    IRestJournalføring,
    TilknyttetBehandling,
} from '../../typer/manuell-journalføring';
import { JournalpostKanal } from '../../typer/manuell-journalføring';
import {
    type IRestLukkOppgaveOgKnyttJournalpost,
    finnBehandlingstemaFraOppgave,
} from '../../typer/oppgave';
import { OppgavetypeFilter } from '../../typer/oppgave';
import type { IPersonInfo } from '../../typer/person';
import { Adressebeskyttelsegradering } from '../../typer/person';
import type { ISamhandlerInfo } from '../../typer/samhandler';
import type { Tilbakekrevingsbehandlingstype } from '../../typer/tilbakekrevingsbehandling';
import { isoStringTilDate } from '../../utils/dato';
import { hentAktivBehandlingPåMinimalFagsak } from '../../utils/fagsak';
import type { IOpprettBehandlingSkjemaBase } from '../Fagsak/Personlinje/Behandlingsmeny/OpprettBehandling/useOpprettBehandling';
import type { VisningBehandling } from '../Fagsak/Saksoversikt/visningBehandling';

export interface ManuellJournalføringSkjemaFelter extends IOpprettBehandlingSkjemaBase {
    journalpostTittel: string;
    dokumenter: IDokumentInfo[];
    bruker: IPersonInfo | undefined;
    avsenderNavn: string;
    avsenderIdent: string;
    knyttTilNyBehandling: boolean;
    tilknyttedeBehandlinger: TilknyttetBehandling[];
    fagsakType: FagsakType;
    samhandler: ISamhandlerInfo | undefined;
}

interface ManuellJournalføringContextValue {
    dataForManuellJournalføring: Ressurs<IDataForManuellJournalføring>;
    hentetDokument: Ressurs<string>;
    endreBrukerOgSettNormalFagsak: (personIdent: string) => Promise<string | void>;
    erLesevisning: () => boolean;
    minimalFagsak: IMinimalFagsak | undefined;
    hentAktivBehandlingForJournalføring: () => VisningBehandling | undefined;
    hentFeilTilOppsummering: () => FeiloppsummeringFeil[];
    hentSorterteJournalføringsbehandlinger: () => Journalføringsbehandling[];
    journalfør: () => void;
    knyttTilNyBehandling: Felt<boolean>;
    nullstillSkjema: () => void;
    skjema: ISkjema<ManuellJournalføringSkjemaFelter, string>;
    tilbakestillData: () => void;
    valgtDokumentId: string | undefined;
    velgOgHentDokumentData: (dokumentInfoId: string) => void;
    settAvsenderLikBruker: () => void;
    tilbakestillAvsender: () => void;
    lukkOppgaveOgKnyttJournalpostTilBehandling: () => void;
    kanKnytteJournalpostTilBehandling: () => boolean;
    kanKnyttesTilInstitusjonsfagsak: () => boolean;
    institusjonsfagsaker: Ressurs<IMinimalFagsak[]>;
    settMinimalFagsakTilNormalFagsakForPerson: (personIdent?: string) => void;
    settMinimalFagsakTilInstitusjonsfagsak: (orgNummer: string) => void;
    erDigitaltInnsendtDokument: boolean | undefined;
    klageStatus: RessursStatus;
}

const ManuellJournalføringContext = createContext<ManuellJournalføringContextValue | undefined>(
    undefined
);

export const ManuellJournalføringProvider = (props: PropsWithChildren) => {
    const { innloggetSaksbehandler } = useAppContext();

    const navigate = useNavigate();
    const { request } = useHttp();
    const { oppgaveId } = useParams<{ oppgaveId: string }>();

    const { hentForhåndsvisning, nullstillDokument, hentetDokument } = useDokument();
    const { hentKlagebehandlingerPåFagsak } = useKlageApi();

    const [minimalFagsak, settMinimalFagsak] = useState<IMinimalFagsak | undefined>(undefined);
    const [klagebehandlinger, settKlagebehandlinger] =
        useState<Ressurs<IKlagebehandling[]>>(byggTomRessurs());
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
                avhengigheter: {
                    knyttTilNyBehandling: knyttTilNyBehandling.verdi,
                    behandlingstype: behandlingstype.verdi,
                },
                skalFeltetVises: (avhengigheter: Avhengigheter) =>
                    avhengigheter.knyttTilNyBehandling &&
                    minimalFagsak?.fagsakType !== FagsakType.INSTITUSJON &&
                    avhengigheter.behandlingstype !== Klagebehandlingstype.KLAGE,
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
            tilknyttedeBehandlinger: useFelt<TilknyttetBehandling[]>({
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

    useEffect(() => {
        hentKlagebehandlingerPåFagsak(minimalFagsak?.id).then(klagebehandlinger =>
            settKlagebehandlinger(klagebehandlinger)
        );
    }, [minimalFagsak]);

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

    const endreBrukerOgSettNormalFagsak = async (personIdent: string) => {
        const hentetPerson = await request<{ ident: string }, IPersonInfo>({
            method: 'POST',
            url: '/familie-ba-sak/api/person',
            data: {
                ident: personIdent,
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
        const journalføringsbehandlingerKlage = (hentDataFraRessurs(klagebehandlinger) ?? []).map(
            klagebehandling => opprettJournalføringsbehandlingFraKlagebehandling(klagebehandling)
        );

        const journalføringsbehandlingerBarnetrygd = (minimalFagsak?.behandlinger ?? []).map(
            barnetrygdbehandling =>
                opprettJournalføringsbehandlingFraBarnetrygdbehandling(barnetrygdbehandling)
        );

        const journalføringsbehandlinger = [
            ...journalføringsbehandlingerKlage,
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

            const nyBehandlingstype = skjema.felter.behandlingstype.verdi;
            const nyBehandlingsårsak = skjema.felter.behandlingsårsak.verdi;
            const { verdi: behandlingstema } = skjema.felter.behandlingstema;

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
                        kategori: behandlingstema?.kategori ?? null,
                        underkategori: behandlingstema?.underkategori ?? null,
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
                        tilknyttedeBehandlinger: skjema.felter.tilknyttedeBehandlinger.verdi,
                        opprettOgKnyttTilNyBehandling: skjema.felter.knyttTilNyBehandling.verdi,
                        // TODO her bør vi forbedre APIET slik at disse verdiene ikke er påkrevd. Blir kun brukt om opprettOgKnyttTilNyBehandling=true
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
                skjema.felter.tilknyttedeBehandlinger.verdi.length > 0 ||
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
                            tilknyttedeBehandlinger: skjema.felter.tilknyttedeBehandlinger.verdi,
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

    return (
        <ManuellJournalføringContext.Provider
            value={{
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
                klageStatus: klagebehandlinger.status,
            }}
        >
            {props.children}
        </ManuellJournalføringContext.Provider>
    );
};

export const useManuellJournalføringContext = () => {
    const context = useContext(ManuellJournalføringContext);

    if (context === undefined) {
        throw new Error(
            'useManuellJournalførContext må brukes innenfor en ManuellJournalførProvider'
        );
    }

    return context;
};
