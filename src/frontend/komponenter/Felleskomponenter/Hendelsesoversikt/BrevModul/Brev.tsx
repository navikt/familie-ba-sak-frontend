import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Heading, Modal } from '@navikt/ds-react';

import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';
import Brevskjema from './Brevskjema';

interface IProps {
    onIModalClick: () => void;
}

const KnappHøyre = styled(Button)`
    margin-left: 1rem;
`;

const Knapperad = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: center;
`;

const Brev = ({ onIModalClick }: IProps) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const navigate = useNavigate();

    const [visInnsendtBrevModal, settVisInnsendtBrevModal] = React.useState(false);

    return (
        <div className={'brev'}>
            <Brevskjema
                onSubmitSuccess={() => {
                    settVisInnsendtBrevModal(true);
                }}
            />
            <Modal
                open={visInnsendtBrevModal}
                onClose={() => {
                    settVisInnsendtBrevModal(false);
                    onIModalClick();
                }}
            >
                <Modal.Content>
                    <Heading size="medium" level={'2'}>
                        Brevet er sendt
                    </Heading>
                    <Knapperad>
                        <Button
                            variant={'secondary'}
                            key={'til oppgavebenken'}
                            size={'medium'}
                            onClick={() => {
                                onIModalClick();
                                navigate('/oppgaver');
                            }}
                            children={'Se oppgavebenk'}
                        />
                        <KnappHøyre
                            variant={'secondary'}
                            key={'til saksoversikt'}
                            size={'medium'}
                            onClick={() => {
                                onIModalClick();
                                navigate(`/fagsak/${fagsakId}/saksoversikt`);
                                settVisInnsendtBrevModal(false);
                            }}
                            children={'Se saksoversikt'}
                        />
                    </Knapperad>
                </Modal.Content>
            </Modal>
        </div>
    );
};
export default Brev;
