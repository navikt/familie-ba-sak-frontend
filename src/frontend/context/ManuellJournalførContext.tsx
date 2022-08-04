import React, { useEffect, useState } from 'react';

import type { AxiosError } from 'axios';
import createUseContext from 'constate';
import { useNavigate, useParams } from 'react-router-dom';

import { useHttp } from '@navikt/familie-http';
import type { Avhengigheter, FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { IDokumentInfo, Ressurs } from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Journalstatus,
    RessursStatus,
} from '@navikt/familie-typer';

import useDokument from '../hooks/useDokument';
import type { VisningBehandling } from '../komponenter/Fagsak/Saksoversikt/visningBehandling';
import { Behandlingstype, BehandlingÅrsak } from '../typer/behandling';
import type { IBehandlingstema } from '../typer/behandlingstema';
import { utredBehandlingstemaFraOppgave } from '../typer/behandlingstema';
import type { IMinimalFagsak } from '../typer/fagsak';
import { FagsakEier } from '../typer/fagsak';
import type {
    IDataForManuellJournalføring,
    IRestJournalføring,
} from '../typer/manuell-journalføring';
import { JournalpostKanal } from '../typer/manuell-journalføring';
import { type IRestLukkOppgaveOgKnyttJournalpost, OppgavetypeFilter } from '../typer/oppgave';
import type { IPersonInfo } from '../typer/person';
import { Adressebeskyttelsegradering } from '../typer/person';
import type { Tilbakekrevingsbehandlingstype } from '../typer/tilbakekrevingsbehandling';
import { ToggleNavn } from '../typer/toggles';
import { hentAktivBehandlingPåMinimalFagsak } from '../utils/fagsak';
import { kalenderDiff } from '../utils/kalender';
import { useApp } from './AppContext';
import { useFagsakRessurser } from './FagsakContext';

const [ManuellJournalførProvider, useManuellJournalfør] = createUseContext(() => {
    const { innloggetSaksbehandler, toggles } = useApp();
    const { hentFagsakForPerson } = useFagsakRessurser();
    const navigate = useNavigate();
    const { request } = useHttp();
    const { oppgaveId } = useParams<{ oppgaveId: string }>();

    const { hentForhåndsvisning, nullstillDokument, hentetDokument } = useDokument();

    const [minimalFagsak, settMinimalFagsak] = useState<IMinimalFagsak | undefined>(undefined);
    const [dataForManuellJournalføring, settDataForManuellJournalføring] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );

    React.useEffect(() => {
        if (oppgaveId) {
            hentDataForManuellJournalføring(oppgaveId);
            nullstillDokument();
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
        {
            journalpostTittel: string;
            behandlingstema: IBehandlingstema | undefined;
            dokumenter: IDokumentInfo[];
            bruker: IPersonInfo | undefined;
            avsenderNavn: string;
            avsenderIdent: string;
            knyttTilNyBehandling: boolean;
            behandlingstype: Behandlingstype | Tilbakekrevingsbehandlingstype | '';
            behandlingsårsak: BehandlingÅrsak | '';
            tilknyttedeBehandlingIder: number[];
            erEnsligMindreårig: boolean;
            erPåInstitusjon: boolean;
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
            behandlingstema: useFelt<IBehandlingstema | undefined>({
                verdi: undefined,
                avhengigheter: { knyttTilNyBehandling: knyttTilNyBehandling.verdi },
                skalFeltetVises: (avhengigheter: Avhengigheter) =>
                    avhengigheter.knyttTilNyBehandling,
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
            tilknyttedeBehandlingIder: useFelt<number[]>({
                verdi: [],
            }),
            erEnsligMindreårig: useFelt<boolean>({
                verdi: false,
            }),
            erPåInstitusjon: useFelt<boolean>({
                verdi: false,
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

    const endreBruker = async (
        personId: string,
        erEnsligMindreårig = false,
        erPåInstitusjon = false
    ) => {
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

        const restFagsak = await hentFagsakForPerson(
            hentetPerson.data.personIdent,
            erEnsligMindreårig || erPåInstitusjon ? FagsakEier.BARN : FagsakEier.OMSORGSPERSON
        );
        skjema.felter.bruker.validerOgSettFelt(hentetPerson.data);
        if (restFagsak.status === RessursStatus.SUKSESS && restFagsak.data) {
            settMinimalFagsak(restFagsak.data);
        } else {
            settMinimalFagsak(undefined);
        }
        return '';
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

    const hentSorterteBehandlinger = () => {
        return minimalFagsak?.behandlinger.length
            ? minimalFagsak.behandlinger.sort((a, b) =>
                  kalenderDiff(new Date(b.opprettetTidspunkt), new Date(a.opprettetTidspunkt))
              )
            : [];
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
                    }&ferdigstill=true`,
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
                        erEnsligMindreårig: skjema.felter.erEnsligMindreårig.verdi,
                        erPåInstitusjon: skjema.felter.erPåInstitusjon.verdi,
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

    const tilordnetInnloggetSaksbehandler = () =>
        dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
        innloggetSaksbehandler !== undefined &&
        dataForManuellJournalføring.data.oppgave.tilordnetRessurs ===
            innloggetSaksbehandler.navIdent;

    const erLesevisning = () => {
        return (
            dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            (dataForManuellJournalføring.data.journalpost.journalstatus !== Journalstatus.MOTTATT ||
                !tilordnetInnloggetSaksbehandler())
        );
    };

    const kanKnytteJournalpostTilBehandling = () => {
        return dataForManuellJournalføring.status !== RessursStatus.SUKSESS
            ? false
            : dataForManuellJournalføring.data.oppgave.oppgavetype === OppgavetypeFilter.BEH_SED &&
              tilordnetInnloggetSaksbehandler() &&
              toggles[ToggleNavn.brukEøs]
            ? true
            : !erLesevisning();
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
        hentetDokument,
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
        lukkOppgaveOgKnyttJournalpostTilBehandling,
        kanKnytteJournalpostTilBehandling,
    };
});

export { ManuellJournalførProvider, useManuellJournalfør };
