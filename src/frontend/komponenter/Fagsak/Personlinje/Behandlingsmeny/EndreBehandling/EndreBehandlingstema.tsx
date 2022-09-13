import React, { useState } from 'react';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Button } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { BehandlingstemaSelect } from '../../../../Felleskomponenter/BehandlingstemaSelect';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import useEndreBehandlingstema from './useEndreBehandlingstema';

const EndreBehandlingstema: React.FC = () => {
    const [visModal, settVisModal] = useState(false);
    const { skjema, endreBehandlingstema, ressurs, nullstillSkjema } = useEndreBehandlingstema(() =>
        settVisModal(false)
    );

    const { erLesevisning, åpenBehandling } = useBehandling();

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
                <SkjemaGruppe feil={hentFrontendFeilmelding(ressurs)}>
                    <SkjultLegend>Endre behandligstema</SkjultLegend>
                    <BehandlingstemaSelect
                        behandlingstema={skjema.felter.behandlingstema}
                        erLesevisning={erLesevisning()}
                        label="Behandlingstema"
                    />
                </SkjemaGruppe>
            </UIModalWrapper>
        </>
    );
};

export default EndreBehandlingstema;
