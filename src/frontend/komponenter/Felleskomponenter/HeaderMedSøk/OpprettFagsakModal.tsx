import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import useFagsakApi from '../../Fagsak/useFagsakApi';
import UIModalWrapper from '../Modal/UIModalWrapper';
import { Knapp } from 'nav-frontend-knapper';
import { Feilmelding } from 'nav-frontend-typografi';

export interface IOpprettFagsakModal {
    lukkModal: () => void;
    personIdent: string | undefined;
}

const OpprettFagsakModal: React.FC<IOpprettFagsakModal> = ({ lukkModal, personIdent }) => {
    const [visFeilmeldinger, settVisFeilmeldinger] = useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = useState('');
    const { sjekkTilgang } = useApp();
    const visModal = !!personIdent;

    const { opprettEllerHentFagsak, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

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
                                opprettEllerHentFagsak({
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
            {visFeilmeldinger && <Feilmelding children={opprettelseFeilmelding} />}
        </UIModalWrapper>
    );
};

export default OpprettFagsakModal;
