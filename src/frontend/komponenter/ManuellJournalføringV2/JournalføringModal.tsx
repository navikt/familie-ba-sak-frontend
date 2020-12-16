import React from 'react';

import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import UIModalWrapper from '../Felleskomponenter/Modal/UIModalWrapper';

interface JournalføringModalProps {
    gjemme: () => void;
}

export const JournalføringModal: React.FC<JournalføringModalProps> = ({ gjemme }) => {
    const {
        manueltJournalfør,
        hentSortertBehandlinger,
        hentAktivBehandlingForJournalføring,
    } = useManuellJournalføringV2();

    const [senderInn, settSenderInn] = React.useState(false);
    const behandlinger = hentSortertBehandlinger();

    return (
        <UIModalWrapper
            modal={{
                className: 'søknad-modal',
                tittel: 'Ønsker du å journalføre uten å knytte til behandling?',
                lukkKnapp: false,
                visModal: true,
                actions: [
                    <Knapp
                        key={'ja'}
                        type={'hoved'}
                        mini={true}
                        spinner={senderInn}
                        disabled={senderInn}
                        onClick={() => {
                            settSenderInn(true);
                            manueltJournalfør()
                                .then(() => {
                                    settSenderInn(false);
                                    gjemme();
                                })
                                .catch(() => {
                                    settSenderInn(false);
                                    gjemme();
                                });
                        }}
                        children={'Ja, journalfør'}
                    />,
                    <Knapp
                        key={'nei'}
                        mini={true}
                        onClick={() => {
                            gjemme();
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
