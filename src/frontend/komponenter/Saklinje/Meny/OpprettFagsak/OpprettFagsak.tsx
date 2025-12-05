import React from 'react';

import { ActionMenu } from '@navikt/ds-react';

import { ModalType } from '../../../../context/ModalContext';
import { useModal } from '../../../../hooks/useModal';
import { useBrukerContext } from '../../../../sider/Fagsak/BrukerContext';
import { useFagsakContext } from '../../../../sider/Fagsak/FagsakContext';
import { FagsakType, type IMinimalFagsak } from '../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../typer/person';

function finnIdentForOpprettingAvFagsak(fagsak: IMinimalFagsak, bruker: IPersonInfo) {
    if (fagsak.fagsakType === FagsakType.SKJERMET_BARN) {
        return fagsak.fagsakeier;
    }
    return bruker.personIdent;
}

export function OpprettFagsak() {
    const { fagsak } = useFagsakContext();
    const { bruker } = useBrukerContext();

    const { åpneModal } = useModal(ModalType.OPPRETT_FAGSAK);

    return (
        <ActionMenu.Item onClick={() => åpneModal({ ident: finnIdentForOpprettingAvFagsak(fagsak, bruker) })}>
            Opprett ny fagsak
        </ActionMenu.Item>
    );
}
