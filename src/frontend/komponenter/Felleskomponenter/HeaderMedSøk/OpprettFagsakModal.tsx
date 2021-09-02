import React from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Feilmelding, Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { ISøkeresultat } from '@navikt/familie-header';

import { useApp } from '../../../context/AppContext';
import { formaterIdent } from '../../../utils/formatter';
import UIModalWrapper from '../Modal/UIModalWrapper';
import useOpprettFagsak from './useOpprettFagsak';

export interface IOpprettFagsakModal {
    lukkModal: () => void;
    søkeresultat: ISøkeresultat | undefined;
}

const StyledUndertittel = styled(Undertittel)`
    font-size: 1rem;
    margin-bottom: 1.5rem;
`;

const OpprettFagsakModal: React.FC<IOpprettFagsakModal> = ({ lukkModal, søkeresultat }) => {
    const { opprettFagsak, feilmelding, senderInn, settSenderInn } = useOpprettFagsak();
    const { sjekkTilgang } = useApp();
    const visModal = !!søkeresultat;

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
                            settSenderInn(true);
                            if (søkeresultat && (await sjekkTilgang(søkeresultat.ident))) {
                                opprettFagsak(
                                    {
                                        personIdent: søkeresultat.ident,
                                        aktørId: null,
                                    },
                                    lukkModal
                                );
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
            {søkeresultat && (
                <Normaltekst>{`${søkeresultat.navn} (${formaterIdent(
                    søkeresultat.ident
                )})`}</Normaltekst>
            )}
            {!!feilmelding && <Feilmelding children={feilmelding} />}
        </UIModalWrapper>
    );
};

export default OpprettFagsakModal;
