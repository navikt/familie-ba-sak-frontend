import React from 'react';

import { ActionMenu } from '@navikt/ds-react';

import { useFagsakContext } from '../../../../sider/Fagsak/FagsakContext';
import { FagsakType } from '../../../../typer/fagsak';

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
