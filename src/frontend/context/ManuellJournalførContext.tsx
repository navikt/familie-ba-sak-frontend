import React, { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import createUseContext from 'constate';
import { useHistory, useParams } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import { Avhengigheter, feil, FeltState, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    IDokumentInfo,
    Journalstatus,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { VisningBehandling } from '../komponenter/Fagsak/Saksoversikt/visningBehandling';
import { Behandlingstype, BehandlingÅrsak } from '../typer/behandling';
import {
    IBehandlingstema,
    isIBehandlingstema,
    utredBehandlingstemaFraOppgave,
} from '../typer/behandlingstema';
import { IMinimalFagsak } from '../typer/fagsak';
import {
    IDataForManuellJournalføring,
    IRestJournalføring,
    JournalpostKanal,
} from '../typer/manuell-journalføring';
import { Adressebeskyttelsegradering, IPersonInfo } from '../typer/person';
import { Tilbakekrevingsbehandlingstype } from '../typer/tilbakekrevingsbehandling';
import { hentAktivBehandlingPåMinimalFagsak } from '../utils/fagsak';
import { kalenderDiff } from '../utils/kalender';
import { useApp } from './AppContext';
import { useFagsakRessurser } from './FagsakContext';

const [ManuellJournalførProvider, useManuellJournalfør] = createUseContext(() => {
    const { innloggetSaksbehandler } = useApp();
    const { hentFagsakForPerson } = useFagsakRessurser();
    const history = useHistory();
    const { request } = useHttp();
    const { oppgaveId } = useParams<{ oppgaveId: string }>();

    const [dokumentData, settDokumentData] = React.useState(byggTomRessurs<string>());

    const [minimalFagsak, settMinimalFagsak] = useState<IMinimalFagsak | undefined>(undefined);
    const [dataForManuellJournalføring, settDataForManuellJournalføring] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );

    React.useEffect(() => {
        if (oppgaveId) {
            hentDataForManuellJournalføring(oppgaveId);
            settDokumentData(byggTomRessurs());
        }
    }, [oppgaveId]);

    const knyttTilNyBehandling = useFelt<boolean>({
        verdi: false,
    });

    const behandlingstype = useFelt<Behandlingstype | Tilbakekrevingsbehandlingstype | ''>({
        verdi: '',
        valideringsfunksjon: felt => {
            return felt.verdi !== ''
                ? ok(felt)
                : feil(felt, 'Velg type behandling som skal opprettes fra nedtrekkslisten');
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            const knyttTilNyBehandling = avhengigheter.knyttTilNyBehandling;
            return knyttTilNyBehandling;
        },
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
        {
            journalpostTittel: string;
            behandlingstema: IBehandlingstema | '';
            dokumenter: IDokumentInfo[];
            bruker: IPersonInfo | undefined;
            avsenderNavn: string;
            avsenderIdent: string;
            knyttTilNyBehandling: boolean;
            behandlingstype: Behandlingstype | Tilbakekrevingsbehandlingstype | '';
            behandlingsårsak: BehandlingÅrsak | '';
            tilknyttedeBehandlingIder: number[];
        },
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
            behandlingstema: useFelt<IBehandlingstema | ''>({
                verdi: '',
                valideringsfunksjon: (felt: FeltState<IBehandlingstema | ''>) =>
                    isIBehandlingstema(felt.verdi)
                        ? ok(felt)
                        : feil(felt, 'Behandlingstema må settes.'),
            }),
            dokumenter: useFelt<IDokumentInfo[]>({
                verdi: [],
                valideringsfunksjon: (felt: FeltState<IDokumentInfo[]>) => {
                    return !felt.verdi.some((dokument: IDokumentInfo) => dokument.tittel === '')
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
                valideringsfunksjon: (felt: FeltState<string>) => {
                    return felt.verdi !== ''
                        ? ok(felt)
                        : feil(felt, 'Avsenders ident er ikke satt');
                },
            }),
            knyttTilNyBehandling,
            behandlingstype,
            behandlingsårsak,
            tilknyttedeBehandlingIder: useFelt<number[]>({
                verdi: [],
            }),
        },
        skjemanavn: 'Opprett behandling modal',
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
                utredBehandlingstemaFraOppgave(dataForManuellJournalføring.data.oppgave)
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

    const tilbakestillData = () => {
        nullstillSkjema();
    };

    const endreBruker = async (personId: string) => {
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

        const restFagsak = await hentFagsakForPerson(hentetPerson.data.personIdent);
        if (restFagsak.status === RessursStatus.SUKSESS) {
            skjema.felter.bruker.validerOgSettFelt(hentetPerson.data);
            settMinimalFagsak(restFagsak.data);
            return '';
        } else {
            return 'Ukjent feil ved henting av fagsak.';
        }
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
                    const førsteDokument =
                        hentetDataForManuellJournalføring.data.journalpost.dokumenter?.find(
                            () => true
                        );
                    settValgtDokumentId(førsteDokument?.dokumentInfoId);
                    hentOgVisDokument(
                        hentetDataForManuellJournalføring.data.journalpost.journalpostId,
                        førsteDokument?.dokumentInfoId
                    );
                }
            })
            .catch((_error: AxiosError) => {
                settDataForManuellJournalføring(
                    byggFeiletRessurs('Ukjent feil ved henting av oppgave')
                );
            });
    };

    const hentOgVisDokument = async (
        journalpostId: string | undefined,
        dokumentInfoId: string | undefined
    ) => {
        if (!journalpostId || !dokumentInfoId) {
            return;
        }

        settDokumentData(byggHenterRessurs());
        return request<void, string>({
            method: 'GET',
            url: `/familie-ba-sak/api/journalpost/${journalpostId}/hent/${dokumentInfoId}`,
            påvirkerSystemLaster: false,
        })
            .then((hentetDokumentData: Ressurs<string>) => {
                if (hentetDokumentData.status === RessursStatus.SUKSESS) {
                    settDokumentData(
                        byggDataRessurs(`data:application/pdf;base64,${hentetDokumentData.data}`)
                    );
                } else if (
                    hentetDokumentData.status === RessursStatus.FEILET ||
                    hentetDokumentData.status === RessursStatus.FUNKSJONELL_FEIL ||
                    hentetDokumentData.status === RessursStatus.IKKE_TILGANG
                ) {
                    settDokumentData(hentetDokumentData);
                } else {
                    settDokumentData(
                        byggFeiletRessurs('Ukjent feil, kunne ikke generere forhåndsvisning.')
                    );
                }
            })
            .catch((_error: AxiosError) => {
                settDokumentData(byggFeiletRessurs('Ukjent feil ved henting av dokument'));
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

    const hentSorterteBehandlinger = () => {
        return dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            dataForManuellJournalføring.data.minimalFagsak?.behandlinger.length
            ? dataForManuellJournalføring.data.minimalFagsak.behandlinger.sort((a, b) =>
                  kalenderDiff(new Date(b.opprettetTidspunkt), new Date(a.opprettetTidspunkt))
              )
            : [];
    };

    const journalfør = async () => {
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
                    }&ferdigstill=true`,
                    data: {
                        journalpostTittel: skjema.felter.journalpostTittel.verdi,
                        kategori: isIBehandlingstema(behandlingstema)
                            ? behandlingstema.kategori
                            : null,
                        underkategori: isIBehandlingstema(behandlingstema)
                            ? behandlingstema.underkategori
                            : null,
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
                    },
                },
                (fagsakId: Ressurs<string>) => {
                    if (fagsakId.status === RessursStatus.SUKSESS && fagsakId.data !== '') {
                        history.push(`/fagsak/${fagsakId.data}/saksoversikt`);
                    } else if (fagsakId.status === RessursStatus.SUKSESS) {
                        history.push('/oppgaver');
                    }
                    return fagsakId;
                }
            );
        }
    };

    const erLesevisning = () => {
        return (
            dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            dataForManuellJournalføring.data.journalpost.journalstatus !== Journalstatus.MOTTATT
        );
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

    return {
        dataForManuellJournalføring,
        dokumentData,
        endreBruker,
        erLesevisning,
        minimalFagsak,
        hentAktivBehandlingForJournalføring,
        hentFeilTilOppsummering,
        hentSorterteBehandlinger,
        journalfør,
        knyttTilNyBehandling,
        nullstillSkjema,
        skjema,
        tilbakestillData,
        valgtDokumentId,
        velgOgHentDokumentData,
        settAvsenderLikBruker,
        tilbakestillAvsender,
    };
});

export { ManuellJournalførProvider, useManuellJournalfør };
