import React, { useState } from 'react';

import { Button, Dropdown, Fieldset, Modal } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import useEndreBehandlingstema from './useEndreBehandlingstema';
import { BehandlingstemaSelect } from '../../../../../komponenter/BehandlingstemaSelect';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';

interface Props {
    fagsak: IMinimalFagsak;
}

const EndreBehandlingstema = ({ fagsak }: Props) => {
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const [visModal, settVisModal] = useState(false);
    const { skjema, endreBehandlingstema, ressurs, nullstillSkjema } = useEndreBehandlingstema(() =>
        settVisModal(false)
    );

    const lukkEndreBehandlingModal = () => {
        nullstillSkjema();
        settVisModal(false);
    };
    return (
        <>
            <Dropdown.Menu.List.Item
                onClick={() => {
                    settVisModal(true);
                }}
            >
                Endre behandlingstema
            </Dropdown.Menu.List.Item>
            {visModal && (
                <Modal
                    open
                    onClose={lukkEndreBehandlingModal}
                    header={{ heading: 'Endre behandlingstema', size: 'small' }}
                    width={'35rem'}
                    portal
                >
                    <Modal.Body>
                        <Fieldset
                            error={hentFrontendFeilmelding(ressurs)}
                            legend="Endre behandlingstema"
                            hideLegend
                        >
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
            )}
        </>
    );
};

export default EndreBehandlingstema;
