import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { RessursStatus } from '@navikt/familie-typer';
import UIModalWrapper from '../../Modal/UIModalWrapper';
import Brevskjema from './Brevskjema';
import { useHistory } from 'react-router';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useBrevModul } from '../../../../context/BrevModulContext';

interface IProps {
    onOkIModalClick: () => void;
}

const Brev = ({ onOkIModalClick }: IProps) => {
    const { åpenBehandling } = useBehandling();
    const { fagsak } = useFagsakRessurser();
    const {
        hentForhåndsvisning,
        hentetForhåndsvisning,
        hentMuligeBrevMaler,
        navigerTilOpplysningsplikt,
    } = useBrevModul();
    const [visInnsendtBrevModal, settVisInnsendtBrevModal] = React.useState(false);

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;
    const fagsakId = fagsak.status === RessursStatus.SUKSESS && fagsak.data.id;
    const history = useHistory();

    return (
        <div className={'brev'}>
            <Brevskjema
                forhåndsvisningOnClick={hentForhåndsvisning}
                hentetForhåndsvisning={hentetForhåndsvisning}
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
                                            `/fagsak/${fagsakId}/${behandlingId}/opplysningsplikt`
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
