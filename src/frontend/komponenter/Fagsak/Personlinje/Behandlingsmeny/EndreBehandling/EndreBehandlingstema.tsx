import React, { useState } from 'react';

import { Button, Fieldset } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { useFagsakContext } from '../../../../../context/fagsak/FagsakContext';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { BehandlingstemaSelect } from '../../../../Felleskomponenter/BehandlingstemaSelect';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import useEndreBehandlingstema from './useEndreBehandlingstema';

const EndreBehandlingstema: React.FC = () => {
    const [visModal, settVisModal] = useState(false);
    const { skjema, endreBehandlingstema, ressurs, nullstillSkjema } = useEndreBehandlingstema(() =>
        settVisModal(false)
    );
    const { minimalFagsak: minimalFagsakRessurs } = useFagsakContext();

    const minimalFagsak = hentDataFraRessurs(minimalFagsakRessurs);

    const { vurderErLesevisning, åpenBehandling } = useBehandling();

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

            <UIModalWrapper
                modal={{
                    actions: [
                        <Button
                            key={'avbryt'}
                            variant="secondary"
                            size="small"
                            onClick={lukkEndreBehandlingModal}
                            children={'Avbryt'}
                        />,
                        <Button
                            key={'bekreft'}
                            variant="primary"
                            size="small"
                            onClick={() => {
                                if (åpenBehandling.status === RessursStatus.SUKSESS) {
                                    endreBehandlingstema(åpenBehandling.data.behandlingId);
                                }
                            }}
                            children={'Bekreft'}
                            loading={ressurs.status === RessursStatus.HENTER}
                        />,
                    ],
                    onClose: lukkEndreBehandlingModal,
                    lukkKnapp: true,
                    tittel: 'Endre behandlingstema',
                    visModal,
                }}
            >
                <Fieldset
                    error={hentFrontendFeilmelding(ressurs)}
                    legend="Endre behandlingstema"
                    hideLegend
                >
                    <BehandlingstemaSelect
                        behandlingstema={skjema.felter.behandlingstema}
                        fagsakType={minimalFagsak?.fagsakType}
                        erLesevisning={vurderErLesevisning()}
                        label="Behandlingstema"
                    />
                </Fieldset>
            </UIModalWrapper>
        </>
    );
};

export default EndreBehandlingstema;
