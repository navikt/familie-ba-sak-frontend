import React from 'react';

import { Dropdown } from '@navikt/ds-react';

import { ModalType } from '../../../../../context/ModalContext';
import { useModal } from '../../../../../hooks/useModal';
import { FagsakType, type IMinimalFagsak } from '../../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../../typer/person';

interface Props {
    fagsak: IMinimalFagsak;
    bruker: IPersonInfo;
}

function finnIdentForOpprettingAvFagsak(fagsak: IMinimalFagsak, bruker: IPersonInfo) {
    if (fagsak.fagsakType === FagsakType.SKJERMET_BARN) {
        return fagsak.fagsakeier;
    }
    return bruker.personIdent;
}

export function OpprettFagsak({ fagsak, bruker }: Props) {
    const { åpneModal } = useModal(ModalType.OPPRETT_FAGSAK);

    return (
        <>
            <Dropdown.Menu.List.Item
                onClick={() => åpneModal({ ident: finnIdentForOpprettingAvFagsak(fagsak, bruker) })}
            >
                Opprett ny fagsak
            </Dropdown.Menu.List.Item>
        </>
    );
}
