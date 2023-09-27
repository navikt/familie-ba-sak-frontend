import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Dropdown } from '@navikt/ds-react';

import OpprettBehandling from './OpprettBehandling/OpprettBehandling';
import OpprettFagsak from './OpprettFagsak/OpprettFagsak';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../typer/person';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak: IMinimalFagsak;
}
const MenyvalgFagsak = ({ bruker, minimalFagsak }: IProps) => {
    const navigate = useNavigate();
    return (
        <>
            <OpprettBehandling minimalFagsak={minimalFagsak} />
            {!!bruker && <OpprettFagsak personInfo={bruker} />}
            <Dropdown.Menu.List.Item
                onClick={() => navigate(`/fagsak/${minimalFagsak.id}/dokumentutsending`)}
            >
                Send informasjonsbrev
            </Dropdown.Menu.List.Item>
        </>
    );
};

export default MenyvalgFagsak;
