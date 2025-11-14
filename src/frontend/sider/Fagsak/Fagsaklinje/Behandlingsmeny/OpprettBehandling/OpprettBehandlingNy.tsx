import React from 'react';

import { ActionMenu } from '@navikt/ds-react';

interface Props {
    åpneModal: () => void;
}

export function OpprettBehandlingNy({ åpneModal }: Props) {
    return <ActionMenu.Item onSelect={åpneModal}>Opprett behandling</ActionMenu.Item>;
}
