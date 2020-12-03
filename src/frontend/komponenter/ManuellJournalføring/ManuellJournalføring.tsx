import React, { useEffect } from 'react';

import { useHistory } from 'react-router';

import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import Lukknapp from 'nav-frontend-lukknapp';
import PanelBase from 'nav-frontend-paneler';
import { Input, Select } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { Journalstatus, Ressurs, RessursStatus } from '@navikt/familie-typer';

import {
    ManuellJournalføringProvider,
    useManuellJournalføring,
} from '../../context/ManuellJournalføringContext';
import { Dokumenttype, dokumenttyper, ILogiskVedlegg } from '../../typer/manuell-journalføring';
import { IPersonInfo } from '../../typer/person';
import { useAmplitude } from '../../utils/amplitude';
import { randomUUID } from '../../utils/commons';
import HentPerson from '../Felleskomponenter/HentPerson/HentPerson';
import UIModalWrapper from '../Felleskomponenter/Modal/UIModalWrapper';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import { KnyttTilBehandling } from './KnyttTilBehandling';
import { Dokumenter } from './Dokumenter';
import styled from 'styled-components';

const PageSplit = styled.div`
    display: flex;
    flex-direction: row;
`;

const Bakgrunn = styled.div`
    margin-left: 40px;
    width: 90%;
    height: 90vh;
`;

const ManuellJournalføringContent: React.FC = () => {
    const history = useHistory();
    const { loggSidevisning } = useAmplitude();
    const {
        dataForManuellJournalføring,
        dokumenttype,
        hentAktivBehandlingForJournalføring,
        logiskeVedlegg,
        manueltJournalfør,
        person,
        senderInn,
        settDokumenttype,
        settLogiskeVedlegg,
        settPerson,
        tilknyttedeBehandlingIder,
        validerSkjema,
        visDokument,
        dokumentData,
    } = useManuellJournalføring();

    const [visModal, settVisModal] = React.useState<boolean>(false);

    useEffect(() => {
        loggSidevisning('journalføring');
    }, [history.location.pathname]);

    const behandlinger =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
        dataForManuellJournalføring.data.fagsak?.behandlinger;

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            return dataForManuellJournalføring.data.journalpost.journalstatus ===
                Journalstatus.MOTTATT ? (
                <PageSplit>
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
                            settPerson={(hentetPerson: Ressurs<IPersonInfo>) => {
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
                                    <option
                                        aria-selected={dokumenttype === key}
                                        key={key}
                                        value={key}
                                    >
                                        {dokumenttyper[key].navn}
                                    </option>
                                );
                            })}
                        </Select>
                        <br />
                        <Dokumenter></Dokumenter>
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
                                                    logiskeVedlegg.map(
                                                        (lVedlegg: ILogiskVedlegg) => {
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
                                                        }
                                                    )
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
                                            spinner={senderInn}
                                            disabled={senderInn}
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
                                    Du har valgt å journalføre uten å knytte dokumentet til en
                                    spesifikk behandling. Journalposten knyttes kun til personen.
                                    <br />
                                    (Tilsvarende "Knytt til generell sak" i Gosys).
                                </Normaltekst>
                            </UIModalWrapper>
                        )}
                    </Skjemasteg>
                    {visDokument && dokumentData.status === RessursStatus.SUKSESS && (
                        <Bakgrunn>
                            <iframe
                                title={'dokument'}
                                src={dokumentData.data}
                                width={'100%'}
                                height={'100%'}
                            ></iframe>
                        </Bakgrunn>
                    )}
                </PageSplit>
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
