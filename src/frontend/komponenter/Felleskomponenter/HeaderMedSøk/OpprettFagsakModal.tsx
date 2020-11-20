import React from 'react';
import { useApp } from '../../../context/AppContext';
import UIModalWrapper from '../Modal/UIModalWrapper';
import { Knapp } from 'nav-frontend-knapper';
import { Feilmelding, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import useOpprettFagsak from './useOpprettFagsak';
import styled from 'styled-components';
import { IFagsakDeltager } from '../../../typer/fagsakdeltager';

export interface IOpprettFagsakModal {
    lukkModal: () => void;
    deltager: IFagsakDeltager | undefined;
}

const StyledUndertittel = styled(Undertittel)`
    font-size: 1rem;
    margin-bottom: 1.5rem;
`;

const OpprettFagsakModal: React.FC<IOpprettFagsakModal> = ({ lukkModal, deltager }) => {
    const { opprettFagsak, feilmelding, senderInn } = useOpprettFagsak();
    const { sjekkTilgang } = useApp();
    const visModal = !!deltager;

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
                            if (deltager && (await sjekkTilgang(deltager.ident))) {
                                opprettFagsak({
                                    personIdent: deltager.ident,
                                    aktørId: null,
                                });
                                lukkModal();
                            }
                        }}
                        children={'Ja, opprett fagsak'}
                        disabled={senderInn}
                        spinner={senderInn}
                    />,
                ],
                onClose: lukkModal,
                lukkKnapp: true,
                tittel: 'Opprett fagsak',
                visModal,
            }}
        >
            <StyledUndertittel tag={'h3'}>
                Personen har ingen tilknyttet fagsak. Ønsker du å opprette fagsak for denne
                personen?
            </StyledUndertittel>
            {deltager && <Normaltekst>{`${deltager.navn} (${deltager.ident})`}</Normaltekst>}
            {!!feilmelding && <Feilmelding children={feilmelding} />}
        </UIModalWrapper>
    );
};

export default OpprettFagsakModal;
