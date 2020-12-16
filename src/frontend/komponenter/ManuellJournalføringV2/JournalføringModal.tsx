import React from 'react';

import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import UIModalWrapper from '../Felleskomponenter/Modal/UIModalWrapper';

interface JournalføringModalProps {
    gjemme: () => void;
    settFeilmelding: (feilmelding: string) => void;
}

export const JournalføringModal: React.FC<JournalføringModalProps> = ({
    gjemme,
    settFeilmelding,
}) => {
    const {
        journalfør,
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
                            journalfør()
                                .then(fagsak => {
                                    if (
                                        fagsak.status === RessursStatus.FEILET ||
                                        fagsak.status === RessursStatus.FUNKSJONELL_FEIL
                                    ) {
                                        settFeilmelding(
                                            `Feil ved manuelt journalfør: ${fagsak.frontendFeilmelding}`
                                        );
                                    }
                                })
                                .finally(() => {
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
