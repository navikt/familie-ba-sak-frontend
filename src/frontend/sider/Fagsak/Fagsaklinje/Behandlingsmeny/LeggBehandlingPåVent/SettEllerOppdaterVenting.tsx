import React, { useState } from 'react';

import { Dropdown } from '@navikt/ds-react';

import { SettBehandlingPåVentModal } from './SettBehandlingPåVentModal';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';

const SettEllerOppdaterVenting: React.FC = () => {
    const { behandling } = useBehandlingContext();
    const [visModal, settVisModal] = useState<boolean>(!!behandling.aktivSettPåVent);

    const erBehandlingAlleredePåVent = !!behandling.aktivSettPåVent;

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                {erBehandlingAlleredePåVent ? 'Endre ventende behandling' : 'Sett behandling på vent'}
            </Dropdown.Menu.List.Item>

            {visModal && <SettBehandlingPåVentModal lukkModal={() => settVisModal(false)} />}
        </>
    );
};

export default SettEllerOppdaterVenting;
