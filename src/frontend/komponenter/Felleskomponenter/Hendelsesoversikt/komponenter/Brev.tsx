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

const Brev = () => {
    const { åpenBehandling } = useBehandling();
    const { fagsak } = useFagsakRessurser();
    const {
        sendBrev,
        hentForhåndsvisning,
        hentMuligeBrevMaler,
        innsendtBrev,
        hentetForhåndsvisning,
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
                                    // TODO: Må legges til condition på brevmal valgt
                                    // TODO: Sjekk opp hvorfor vi må bruke wrapperen og ikke kan bruke den rene modalen. Kunne da lagt den i brevskjema og hatt tilgang på rett data.
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
