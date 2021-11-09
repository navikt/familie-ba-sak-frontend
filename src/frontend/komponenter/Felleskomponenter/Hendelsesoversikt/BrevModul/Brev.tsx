import * as React from 'react';

import { useHistory } from 'react-router';

import { Knapp } from 'nav-frontend-knapper';

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
    const { hentMuligeBrevMaler, navigerTilOpplysningsplikt } = useBrevModul();

    const [visInnsendtBrevModal, settVisInnsendtBrevModal] = React.useState(false);

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;
    const history = useHistory();

    return (
        <div className={'brev'}>
            <Brevskjema
                brevMaler={hentMuligeBrevMaler()}
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
                            <Knapp
                                key={'ok'}
                                mini={true}
                                onClick={() => {
                                    onOkIModalClick();
                                    navigerTilOpplysningsplikt &&
                                        history.push(
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
