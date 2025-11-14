import React from 'react';

import { ActionMenu } from '@navikt/ds-react';

import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';

interface Props {
    åpneModal: () => void;
}

export function SettEllerOppdaterVentingNy({ åpneModal }: Props) {
    const { behandling } = useBehandlingContext();

    const erBehandlingAlleredePåVent = !!behandling.aktivSettPåVent;

    return (
        <ActionMenu.Item onSelect={åpneModal}>
            {erBehandlingAlleredePåVent ? 'Endre ventende behandling' : 'Sett behandling på vent'}
        </ActionMenu.Item>
    );
}
