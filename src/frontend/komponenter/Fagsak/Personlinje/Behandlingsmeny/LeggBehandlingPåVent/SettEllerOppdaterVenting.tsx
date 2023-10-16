import React, { useState } from 'react';

import { Dropdown } from '@navikt/ds-react';

import { SettBehandlingPåVentModal } from './SettBehandlingPåVentModal';
import type { IBehandling } from '../../../../../typer/behandling';

interface IProps {
    behandling: IBehandling;
}

const SettEllerOppdaterVenting: React.FC<IProps> = ({ behandling }) => {
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
