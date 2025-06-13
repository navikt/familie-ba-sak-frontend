import React from 'react';

import { Dropdown } from '@navikt/ds-react';

import { ModalType } from '../../../../../context/ModalContext';
import { useModal } from '../../../../../hooks/useModal';
import type { IPersonInfo } from '../../../../../typer/person';

interface IProps {
    personInfo: IPersonInfo;
}

const OpprettFagsak: React.FC<IProps> = ({ personInfo }) => {
    const { åpneModal } = useModal(ModalType.OPPRETT_FAGSAK);

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => åpneModal({ ident: personInfo.personIdent })}>
                Opprett ny fagsak
            </Dropdown.Menu.List.Item>
        </>
    );
};

export default OpprettFagsak;
