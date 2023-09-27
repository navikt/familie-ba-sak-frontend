import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { BodyShort, Button, Modal } from '@navikt/ds-react';

import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';

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
            header={{ heading: 'Totrinnskontroll', size: 'medium' }}
        >
            <Modal.Body>
                <BodyShort>Behandlingen er nå sendt til totrinnskontroll</BodyShort>
            </Modal.Body>
            <Modal.Footer>
                <Button
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
            </Modal.Footer>
        </Modal>
    );
};
