import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';

import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';

const Modaltekst = styled(BodyShort)`
    margin: 2rem 0;
`;

const KnappHøyre = styled(Button)`
    margin-left: 1rem;
`;

const Knapperad = styled.div`
    display: flex;
    justify-content: center;
`;

interface Props {
    visModal: boolean;
    settVisModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BehandlingSendtTilTotrinnskontrollModal: React.FunctionComponent<Props> = ({
    visModal,
    settVisModal,
}) => {
    const navigate = useNavigate();
    const { fagsakId } = useSakOgBehandlingParams();

    return (
        <Modal
            open={visModal}
            onClose={() => settVisModal(false)}
            closeButton={true}
            shouldCloseOnOverlayClick={false}
        >
            <Modal.Content>
                <Heading size={'medium'} level={'2'}>
                    Totrinnskontroll
                </Heading>
                <Modaltekst>Behandlingen er nå sendt til totrinnskontroll</Modaltekst>
                <Knapperad>
                    <Button
                        key={'oppgavebenk'}
                        variant={'secondary'}
                        size={'medium'}
                        onClick={() => {
                            settVisModal(false);
                            navigate('/oppgaver');
                        }}
                        children={'Gå til oppgavebenken'}
                    />
                    <KnappHøyre
                        key={'saksoversikt'}
                        variant={'secondary'}
                        size={'medium'}
                        onClick={() => {
                            settVisModal(false);
                            navigate(`/fagsak/${fagsakId}/saksoversikt`);
                            window.location.reload();
                        }}
                        children={'Gå til saksoversikten'}
                    />
                </Knapperad>
            </Modal.Content>
        </Modal>
    );
};
