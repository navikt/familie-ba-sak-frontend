import React from 'react';

import { ActionMenu } from '@navikt/ds-react';

import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { BehandlingStatus } from '../../../../typer/behandling';

interface Props {
    åpneModal: () => void;
}

export function SettEllerOppdaterVenting({ åpneModal }: Props) {
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
