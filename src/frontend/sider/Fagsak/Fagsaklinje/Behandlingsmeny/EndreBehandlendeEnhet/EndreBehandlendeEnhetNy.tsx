import React from 'react';

import { ActionMenu } from '@navikt/ds-react';

interface Props {
    åpneModal: () => void;
}

export function EndreBehandlendeEnhetNy({ åpneModal }: Props) {
    return <ActionMenu.Item onSelect={() => åpneModal()}>Endre behandlende enhet</ActionMenu.Item>;
}
