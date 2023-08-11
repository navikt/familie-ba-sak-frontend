import React, { useState } from 'react';

import { Calender } from '@navikt/ds-icons';
import { Dropdown } from '@navikt/ds-react';

import { OppdaterEndringstidspunktModal } from './OppdaterEndringstidspunktModal';
import type { IBehandling } from '../../../../../typer/behandling';

interface Props {
    åpenBehandling: IBehandling;
}

const EndreEndringstidspunkt: React.FC<Props> = ({ åpenBehandling }) => {
    const [visModal, settVisModal] = useState(false);
    return (
        <>
            <Dropdown.Menu.List.Item
                onClick={() => {
                    settVisModal(true);
                }}
            >
                <Calender />
                Oppdater endringstidspunkt
            </Dropdown.Menu.List.Item>

            <OppdaterEndringstidspunktModal
                visModal={visModal}
                lukkModal={() => settVisModal(false)}
                behandlingId={åpenBehandling.behandlingId}
            />
        </>
    );
};

export default EndreEndringstidspunkt;
