import React from 'react';

import { ChevronDownIcon } from '@navikt/aksel-icons';
import { Button, Dropdown } from '@navikt/ds-react';

import MenyvalgBehandling from './MenyvalgBehandling';
import { MenyvalgFagsak } from './MenyvalgFagsak';
import type { IBehandling } from '../../../../typer/behandling';
import { BehandlingStatus } from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../typer/person';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak: IMinimalFagsak;
    behandling?: IBehandling;
}

const Behandlingsmeny: React.FC<IProps> = ({ bruker, minimalFagsak, behandling }) => {
    const skalViseMenyvalgForBehandling =
        behandling && behandling.status !== BehandlingStatus.AVSLUTTET;

    return (
        <Dropdown>
            <Button
                variant="secondary"
                size="small"
                icon={<ChevronDownIcon />}
                iconPosition={'right'}
                as={Dropdown.Toggle}
            >
                Meny
            </Button>
            <Dropdown.Menu>
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
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Behandlingsmeny;
