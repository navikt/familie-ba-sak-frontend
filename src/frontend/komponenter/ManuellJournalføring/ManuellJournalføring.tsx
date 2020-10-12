import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import Lukknapp from 'nav-frontend-lukknapp';
import PanelBase from 'nav-frontend-paneler';
import { Input, Select } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
    ManuellJournalføringProvider,
    useManuellJournalføring,
} from '../../context/ManuellJournalføringContext';
import {
    BehandlingKategori,
    Behandlingstype,
    BehandlingUnderkategori,
} from '../../typer/behandling';
import { IFagsak } from '../../typer/fagsak';
import {
    Dokumenttype,
    dokumenttyper,
    IDataForManuellJournalføring,
    ILogiskVedlegg,
    Journalstatus,
} from '../../typer/manuell-journalføring';
import { IPerson } from '../../typer/person';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import { randomUUID } from '../../utils/commons';
import HentPerson from '../Felleskomponenter/HentPerson/HentPerson';
import UIModalWrapper from '../Felleskomponenter/Modal/UIModalWrapper';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import { KnyttTilBehandling } from './KnyttTilBehandling';

const ManuellJournalføringContent: React.FC = () => {
    const history = useHistory();
    const {
        dataForManuellJournalføring,
        dokumenttype,
        hentAktivBehandlingForJournalføring,
        logiskeVedlegg,
        manueltJournalfør,
        opprettBehandling,
        opprettFagsak,
        person,
        senderInn,
        settDataForManuellJournalføring,
        settDokumenttype,
        settLogiskeVedlegg,
        settPerson,
        tilknyttedeBehandlingIder,
        validerSkjema,
    } = useManuellJournalføring();

    const [visModal, settVisModal] = React.useState<boolean>(false);
    const [opprettBehandlingFeilmelding, settOpprettBehandlingFeilmelding] = useState<
        string | undefined
    >(undefined);

    const behandlinger =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
        dataForManuellJournalføring.data.fagsak?.behandlinger;

    const onClickOpprett = async (data: IDataForManuellJournalføring) => {
        const søker = data.person?.personIdent ?? '';
        if (søker === '') {
            settOpprettBehandlingFeilmelding(
                'Klarer ikke opprette behandling fordi journalpost mangler bruker. Hent bruker før opprettelse av behandling'
            );
        } else {
            const fagsak: IFagsak | undefined = !data.fagsak
                ? await opprettFagsak({
                      personIdent: data.person?.personIdent ?? null,
                      aktørId: null,
                  })
                      .then((response: Ressurs<IFagsak>) =>
                          response.status === RessursStatus.SUKSESS ? response.data : undefined
                      )
                      .catch(() => undefined)
                : data.fagsak;

            if (fagsak) {
                const behandlingType =
                    behandlinger && behandlinger.length > 0
                        ? Behandlingstype.REVURDERING
                        : Behandlingstype.FØRSTEGANGSBEHANDLING;

                const fagsakMedBehandling: Ressurs<IFagsak> = await opprettBehandling({
                    behandlingType: behandlingType,
                    søkersIdent: søker,
                    kategori: BehandlingKategori.NASJONAL, // TODO: Utvides/fjernes fra opprettelse
                    underkategori: BehandlingUnderkategori.ORDINÆR, // TODO: Utvides/fjernes fra opprettelse
                }).then((response: Ressurs<IFagsak>) => response);

                if (
                    dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
                    fagsakMedBehandling.status === RessursStatus.SUKSESS
                ) {
                    settDataForManuellJournalføring({
                        status: RessursStatus.SUKSESS,
                        data: {
                            ...dataForManuellJournalføring.data,
                            fagsak: fagsakMedBehandling.data,
                        },
                    });
                } else if (fagsakMedBehandling.status === RessursStatus.FEILET) {
                    settOpprettBehandlingFeilmelding(fagsakMedBehandling.frontendFeilmelding);
                } else {
                    settOpprettBehandlingFeilmelding('Opprettelse av behandling feilet.');
                }
            } else {
                settOpprettBehandlingFeilmelding('Opprettelse av behandling feilet.');
            }
        }
    };

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            return dataForManuellJournalføring.data.journalpost.journalstatus ===
                Journalstatus.MOTTATT ? (
                <Skjemasteg
                    className={'journalføring'}
                    tittel={'Registrere journalpost: Barnetrygd'}
                    forrigeKnappTittel={'Avbryt'}
                    forrigeOnClick={() => {
                        history.push(`/oppgaver`);
                    }}
                    nesteKnappTittel={'Journalfør'}
                    nesteOnClick={() => {
                        if (tilknyttedeBehandlingIder.length < 1) {
                            settVisModal(true);
                        } else {
                            manueltJournalfør();
                        }
                    }}
                    senderInn={senderInn}
                >
                    <br />
                    <Undertittel children={'Bruker'} />
                    <HentPerson
                        person={person}
                        settPerson={(hentetPerson: Ressurs<IPerson>) => {
                            settPerson(hentetPerson);
                            validerSkjema();
                        }}
                    />
                    <br />
                    <Select
                        bredde={'xl'}
                        id={'manuell-journalføring-dokumenttype'}
                        label={'Dokumenttittel'}
                        value={dokumenttype}
                        onChange={event => {
                            settDokumenttype(event.target.value as Dokumenttype);
                            validerSkjema();
                        }}
                    >
                        {Object.keys(dokumenttyper).map((key: string) => {
                            return (
                                <option aria-selected={dokumenttype === key} key={key} value={key}>
                                    {dokumenttyper[key].navn}
                                </option>
                            );
                        })}
                    </Select>
                    <br />
                    <PanelBase className={'panel--gra'}>
                        <Undertittel children={'Annet innhold'} />
                        {logiskeVedlegg.map((logiskVedlegg: ILogiskVedlegg, index: number) => {
                            return (
                                <div key={index} className={'journalføring__logisk-vedlegg'}>
                                    <Input
                                        className={'journalføring__logisk-vedlegg--input'}
                                        label={'Tittel'}
                                        value={logiskVedlegg.tittel}
                                        bredde={'XXL'}
                                        onChange={event => {
                                            settLogiskeVedlegg(
                                                logiskeVedlegg.map((lVedlegg: ILogiskVedlegg) => {
                                                    if (
                                                        lVedlegg.logiskVedleggId ===
                                                        logiskVedlegg.logiskVedleggId
                                                    ) {
                                                        return {
                                                            ...lVedlegg,
                                                            tittel: event.target.value,
                                                        };
                                                    } else {
                                                        return lVedlegg;
                                                    }
                                                })
                                            );
                                        }}
                                    />
                                    <Lukknapp
                                        onClick={() => {
                                            settLogiskeVedlegg(
                                                logiskeVedlegg.filter(
                                                    (lVedlegg: ILogiskVedlegg) =>
                                                        lVedlegg.logiskVedleggId !==
                                                        logiskVedlegg.logiskVedleggId
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            );
                        })}

                        <br />
                        <Knapp
                            mini={true}
                            onClick={() => {
                                settLogiskeVedlegg([
                                    ...logiskeVedlegg,
                                    {
                                        logiskVedleggId: randomUUID(),
                                        tittel: '',
                                    },
                                ]);
                            }}
                        >
                            Legg til innhold
                        </Knapp>
                    </PanelBase>
                    <br />
                    <br />
                    <KnyttTilBehandling
                        aktivBehandling={hentAktivBehandlingForJournalføring()}
                        dataForManuellJournalføring={dataForManuellJournalføring.data}
                        onClickOpprett={onClickOpprett}
                        opprettBehandlingFeilmelding={opprettBehandlingFeilmelding}
                    />
                    {visModal && (
                        <UIModalWrapper
                            modal={{
                                className: 'søknad-modal',
                                tittel: 'Ønsker du å journalføre uten å knytte til behandling?',
                                lukkKnapp: false,
                                visModal: visModal,
                                actions: [
                                    <Knapp
                                        key={'ja'}
                                        type={'hoved'}
                                        mini={true}
                                        onClick={() => {
                                            settVisModal(false);
                                            manueltJournalfør();
                                        }}
                                        children={'Ja, journalfør'}
                                    />,
                                    <Knapp
                                        key={'nei'}
                                        mini={true}
                                        onClick={() => {
                                            settVisModal(false);
                                        }}
                                        children={
                                            behandlinger && behandlinger.length > 0
                                                ? hentAktivBehandlingForJournalføring()
                                                    ? 'Nei, velg behandling'
                                                    : 'Nei, velg/opprett behandling'
                                                : 'Nei, opprett behandling'
                                        }
                                    />,
                                ],
                            }}
                        >
                            <Normaltekst className={'søknad-modal__fjern-vilkår-advarsel'}>
                                Du har valgt å journalføre uten å knytte dokumentet til en spesifikk
                                behandling. Journalposten knyttes kun til personen.
                                <br />
                                (Tilsvarende "Knytt til generell sak" i Gosys).
                            </Normaltekst>
                        </UIModalWrapper>
                    )}
                </Skjemasteg>
            ) : (
                <AlertStripeAdvarsel
                    children={`Journalposten har status ${dataForManuellJournalføring.data.journalpost.journalstatus}. Kan bare manuelt journalføre journalposter med status MOTTATT.`}
                />
            );
        case RessursStatus.FEILET:
            return <AlertStripeFeil children={dataForManuellJournalføring.frontendFeilmelding} />;
        default:
            return <div />;
    }
};

const ManuellJournalføring: React.FC = () => {
    return (
        <ManuellJournalføringProvider>
            <ManuellJournalføringContent />
        </ManuellJournalføringProvider>
    );
};

export default ManuellJournalføring;
