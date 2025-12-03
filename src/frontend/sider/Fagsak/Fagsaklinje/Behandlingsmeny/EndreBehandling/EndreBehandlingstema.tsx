import React from 'react';

import { ActionMenu } from '@navikt/ds-react';

import { FagsakType } from '../../../../../typer/fagsak';
import { useFagsakContext } from '../../../FagsakContext';

interface Props {
    åpneModal: () => void;
}

export function EndreBehandlingstema({ åpneModal }: Props) {
    const { fagsak } = useFagsakContext();

    if (fagsak.fagsakType === FagsakType.INSTITUSJON) {
        return null;
    }

    return <ActionMenu.Item onSelect={åpneModal}>Endre behandlingstema</ActionMenu.Item>;
}
