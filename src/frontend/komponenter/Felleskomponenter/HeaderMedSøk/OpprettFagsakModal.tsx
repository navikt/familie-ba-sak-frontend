import React from 'react';
import { useApp } from '../../../context/AppContext';
import UIModalWrapper from '../Modal/UIModalWrapper';
import { Knapp } from 'nav-frontend-knapper';
import { Feilmelding } from 'nav-frontend-typografi';
import useOpprettFagsak from './useOpprettFagsak';

export interface IOpprettFagsakModal {
    lukkModal: () => void;
    personIdent: string | undefined;
}

const OpprettFagsakModal: React.FC<IOpprettFagsakModal> = ({ lukkModal, personIdent }) => {
    const { opprettFagsak, feilmelding, senderInn } = useOpprettFagsak();
    const { sjekkTilgang } = useApp();
    const visModal = !!personIdent;

    return (
        <UIModalWrapper
            modal={{
                actions: [
                    <Knapp key={'avbryt'} mini={true} onClick={lukkModal} children={'Avbryt'} />,
                    <Knapp
                        key={'bekreft'}
                        type={'hoved'}
                        mini={true}
                        onClick={async () => {
                            if (personIdent && (await sjekkTilgang(personIdent))) {
                                opprettFagsak({
                                    personIdent,
                                    aktørId: null,
                                });
                                lukkModal();
                            }
                        }}
                        children={'Bekreft'}
                        disabled={senderInn}
                        spinner={senderInn}
                    />,
                ],
                onClose: lukkModal,
                lukkKnapp: true,
                tittel:
                    'Personen har ingen tilknyttet fagsak. Ønsker du å opprette fagsak for denne personen?',
                visModal,
            }}
        >
            {!!feilmelding && <Feilmelding children={feilmelding} />}
        </UIModalWrapper>
    );
};

export default OpprettFagsakModal;
