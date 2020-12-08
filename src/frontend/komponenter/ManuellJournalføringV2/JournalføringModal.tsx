import React from 'react';

import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import UIModalWrapper from '../Felleskomponenter/Modal/UIModalWrapper';

export const JournalføringModal: React.FC = () => {
    const {
        visModal,
        settVisModal,
        manueltJournalfør,
        senderInn,
        dataForManuellJournalføring,
        hentAktivBehandlingForJournalføring,
    } = useManuellJournalføringV2();

    const behandlinger =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
        dataForManuellJournalføring.data.fagsak?.behandlinger;

    return (
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
                Du har valgt å journalføre uten å knytte dokumentet til en spesifikk behandling.
                Journalposten knyttes kun til personen.
                <br />
                (Tilsvarende "Knytt til generell sak" i Gosys).
            </Normaltekst>
        </UIModalWrapper>
    );
};
