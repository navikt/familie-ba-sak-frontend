import React from 'react';

import { ActionMenu } from '@navikt/ds-react';

import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';

interface Props {
    åpneModal: () => void;
}

export function TaBehandlingAvVent({ åpneModal }: Props) {
    const { behandling } = useBehandlingContext();

    if (behandling.aktivSettPåVent === undefined || behandling.aktivSettPåVent === null) {
        return null;
    }

    return <ActionMenu.Item onSelect={åpneModal}>Fortsett behandling</ActionMenu.Item>;
}
