import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Heading, Modal } from '@navikt/ds-react';

import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';
import Brevskjema from './Brevskjema';

interface IProps {
    onIModalClick: () => void;
}

const StyledModalContent = styled(Modal)`
    padding: 2.5rem;
    width: 35rem;
`;

const StyledModalHeader = styled(Heading)`
    margin-bottom: 2rem;
`;

const KnappHøyre = styled(Button)`
    margin-left: 1rem;
`;

const Knapperad = styled.div`
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
            <StyledModalContent
                open={visInnsendtBrevModal}
                onClose={() => {
                    settVisInnsendtBrevModal(false);
                    onIModalClick();
                }}
            >
                <StyledModalHeader size="medium" level={'2'}>
                    Brevet er sendt
                </StyledModalHeader>
                <Knapperad>
                    <Button
                        variant={'secondary'}
                        key={'til oppgavebenken'}
                        size={'medium'}
                        onClick={() => {
                            onIModalClick();
                            navigate('/oppgaver');
                        }}
                        children={'Gå til oppgavebenken'}
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
                        children={'Gå til saksoversikt'}
                    />
                </Knapperad>
            </StyledModalContent>
        </div>
    );
};
export default Brev;
