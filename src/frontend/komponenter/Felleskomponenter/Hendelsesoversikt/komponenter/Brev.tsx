import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { useEffect } from 'react';
import { RessursStatus } from '@navikt/familie-typer';
import UIModalWrapper from '../../Modal/UIModalWrapper';
import Brevskjema from '../../BrevModul/BrevSkjema';
import useBrevModul from '../useBrevModul';
import { useHistory } from 'react-router';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { TypeBrev } from '../../BrevModul/typer';

const Brev = () => {
    const { åpenBehandling } = useBehandling();
    const { fagsak } = useFagsakRessurser();
    const {
        sendBrev,
        hentForhåndsvisning,
        hentMuligeBrevMaler,
        innsendtBrev,
        hentetForhåndsvisning,
        brevmal,
    } = useBrevModul();

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;
    const fagsakId = fagsak.status === RessursStatus.SUKSESS && fagsak.data.id;
    const history = useHistory();

    const [visInnsendtBrevModal, settVisInnsendtBrevModal] = React.useState(false);

    useEffect(() => {
        if (innsendtBrev.status === RessursStatus.SUKSESS) {
            settVisInnsendtBrevModal(true);
        }
    }, [innsendtBrev]);

    return (
        <div className={'brev'}>
            <Brevskjema
                sendBrevOnClick={sendBrev}
                innsendtBrev={innsendtBrev}
                forhåndsvisningOnClick={hentForhåndsvisning}
                hentetForhåndsvisning={hentetForhåndsvisning}
                brevMaler={hentMuligeBrevMaler()}
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
                                    brevmal === TypeBrev.OPPLYSNINGER &&
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
