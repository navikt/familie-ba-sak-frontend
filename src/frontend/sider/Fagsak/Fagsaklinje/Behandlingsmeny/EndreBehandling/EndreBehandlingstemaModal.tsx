import React from 'react';

import { Button, Fieldset, Modal } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import useEndreBehandlingstema from './useEndreBehandlingstema';
import { BehandlingstemaSelect } from '../../../../../komponenter/BehandlingstemaSelect';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';
import { useFagsakContext } from '../../../FagsakContext';

interface Props {
    lukkModal: () => void;
}

export function EndreBehandlingstemaModal({ lukkModal }: Props) {
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const { skjema, endreBehandlingstema, ressurs, nullstillSkjema } = useEndreBehandlingstema(() => lukkModal());
    const { fagsak } = useFagsakContext();

    const lukkEndreBehandlingModal = () => {
        nullstillSkjema();
        lukkModal();
    };
    return (
        <Modal
            open
            onClose={lukkEndreBehandlingModal}
            header={{ heading: 'Endre behandlingstema', size: 'small' }}
            width={'35rem'}
            portal
        >
            <Modal.Body>
                <Fieldset error={hentFrontendFeilmelding(ressurs)} legend="Endre behandlingstema" hideLegend>
                    <BehandlingstemaSelect
                        behandlingstema={skjema.felter.behandlingstema}
                        fagsakType={fagsak.fagsakType}
                        erLesevisning={vurderErLesevisning()}
                    />
                </Fieldset>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    key={'bekreft'}
                    variant="primary"
                    size="small"
                    onClick={() => {
                        endreBehandlingstema(behandling.behandlingId);
                    }}
                    children={'Bekreft'}
                    loading={ressurs.status === RessursStatus.HENTER}
                />
                <Button
                    key={'avbryt'}
                    variant="secondary"
                    size="small"
                    onClick={lukkEndreBehandlingModal}
                    children={'Avbryt'}
                />
            </Modal.Footer>
        </Modal>
    );
}
