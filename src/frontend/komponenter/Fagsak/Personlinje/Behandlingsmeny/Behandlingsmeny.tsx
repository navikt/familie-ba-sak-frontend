import React from 'react';

import styled from 'styled-components';

import { ChevronDownIcon } from '@navikt/aksel-icons';
import { Button, Dropdown } from '@navikt/ds-react';

import MenyvalgBehandling from './MenyvalgBehandling';
import MenyvalgFagsak from './MenyvalgFagsak';
import type { IBehandling } from '../../../../typer/behandling';
import { BehandlingStatus } from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../typer/person';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak: IMinimalFagsak;
    behandling?: IBehandling;
}

const PosisjonertMenyknapp = styled(Button)`
    margin-left: 3rem;
`;

const StyletDropdownMenu = styled(Dropdown.Menu)`
    width: 30ch;
`;

const Behandlingsmeny: React.FC<IProps> = ({ bruker, minimalFagsak, behandling }) => {
    const skalViseMenyvalgForBehandling =
        behandling && behandling.status !== BehandlingStatus.AVSLUTTET;

    return (
        <Dropdown>
            <PosisjonertMenyknapp
                variant="secondary"
                size="small"
                icon={<ChevronDownIcon />}
                iconPosition={'right'}
                forwardedAs={Dropdown.Toggle}
            >
                Meny
            </PosisjonertMenyknapp>
            <StyletDropdownMenu>
                <Dropdown.Menu.List>
                    <MenyvalgFagsak minimalFagsak={minimalFagsak} bruker={bruker} />
                    {skalViseMenyvalgForBehandling && <Dropdown.Menu.Divider />}
                    {skalViseMenyvalgForBehandling && (
                        <MenyvalgBehandling
                            minimalFagsak={minimalFagsak}
                            åpenBehandling={behandling}
                        />
                    )}
                </Dropdown.Menu.List>
            </StyletDropdownMenu>
        </Dropdown>
    );
};

export default Behandlingsmeny;
