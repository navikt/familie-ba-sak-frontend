import React from 'react';

import { ActionMenu } from '@navikt/ds-react';

import { BehandlingStatus } from '../../../../../typer/behandling';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';

interface Props {
    åpneModal: () => void;
}

export function SettEllerOppdaterVentingNy({ åpneModal }: Props) {
    const { behandling } = useBehandlingContext();

    if (behandling.status !== BehandlingStatus.UTREDES) {
        return null;
    }

    const erBehandlingAlleredePåVent = !!behandling.aktivSettPåVent;

    return (
        <ActionMenu.Item onSelect={åpneModal}>
            {erBehandlingAlleredePåVent ? 'Endre ventende behandling' : 'Sett behandling på vent'}
        </ActionMenu.Item>
    );
}
