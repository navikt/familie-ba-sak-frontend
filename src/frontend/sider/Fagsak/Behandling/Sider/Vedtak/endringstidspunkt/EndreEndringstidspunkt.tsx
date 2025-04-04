import React, { useState } from 'react';

import { CalendarIcon } from '@navikt/aksel-icons';
import { Dropdown } from '@navikt/ds-react';

import { OppdaterEndringstidspunktModal } from './OppdaterEndringstidspunktModal';
import type { IBehandling } from '../../../../../../typer/behandling';

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
                <CalendarIcon fontSize={'1.4rem'} />
                Oppdater endringstidspunkt
            </Dropdown.Menu.List.Item>

            {visModal && (
                <OppdaterEndringstidspunktModal
                    lukkModal={() => settVisModal(false)}
                    behandlingId={åpenBehandling.behandlingId}
                />
            )}
        </>
    );
};

export default EndreEndringstidspunkt;
