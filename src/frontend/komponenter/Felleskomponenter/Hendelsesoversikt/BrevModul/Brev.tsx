import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Modal } from '@navikt/ds-react';

import Brevskjema from './Brevskjema';
import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';

interface IProps {
    onIModalClick: () => void;
}

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
            {visInnsendtBrevModal && (
                <Modal
                    open
                    onClose={() => {
                        settVisInnsendtBrevModal(false);
                        onIModalClick();
                    }}
                    header={{
                        heading: 'Brevet er sendt',
                        size: 'medium',
                    }}
                    portal
                >
                    <Modal.Footer>
                        <Button
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
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};
export default Brev;
