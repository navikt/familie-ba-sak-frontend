import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { useBrevModul } from '../../../../context/BrevModulContext';
import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';
import UIModalWrapper from '../../Modal/UIModalWrapper';
import Brevskjema from './Brevskjema';

interface IProps {
    onOkIModalClick: () => void;
}

const Brev = ({ onOkIModalClick }: IProps) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { åpenBehandling } = useBehandling();
    const { navigerTilOpplysningsplikt } = useBrevModul();

    const [visInnsendtBrevModal, settVisInnsendtBrevModal] = React.useState(false);

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;
    const navigate = useNavigate();

    return (
        <div className={'brev'}>
            <Brevskjema
                onSubmitSuccess={() => {
                    settVisInnsendtBrevModal(true);
                }}
            />
            {visInnsendtBrevModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Brevet er sendt',
                        lukkKnapp: false,
                        visModal: visInnsendtBrevModal,
                        actions: [
                            <Button
                                key={'ok'}
                                size={'small'}
                                onClick={() => {
                                    onOkIModalClick();
                                    navigerTilOpplysningsplikt &&
                                        navigate(
                                            `/fagsak/${fagsakId}/${behandlingId}/vilkaarsvurdering`
                                        );
                                    settVisInnsendtBrevModal(false);
                                }}
                                children={'Ok'}
                            />,
                        ],
                    }}
                />
            )}
        </div>
    );
};
export default Brev;
