import React, { useState } from 'react';

import { Dropdown } from '@navikt/ds-react';

import { SettBehandlingPåVentModal } from './SettBehandlingPåVentModal';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';

const SettEllerOppdaterVenting: React.FC = () => {
    const { behandling } = useBehandling();
    const [visModal, settVisModal] = useState<boolean>(!!behandling.aktivSettPåVent);

    const erBehandlingAlleredePåVent = !!behandling.aktivSettPåVent;

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                {erBehandlingAlleredePåVent
                    ? 'Endre ventende behandling'
                    : 'Sett behandling på vent'}
            </Dropdown.Menu.List.Item>

            {visModal && (
                <SettBehandlingPåVentModal
                    lukkModal={() => settVisModal(false)}
                    behandling={behandling}
                />
            )}
        </>
    );
};

export default SettEllerOppdaterVenting;
