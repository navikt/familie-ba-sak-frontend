import React from 'react';

import styled from 'styled-components';

import { ChevronDownIcon } from '@navikt/aksel-icons';
import { Button, Dropdown } from '@navikt/ds-react';
import { hentDataFraRessurs } from '@navikt/familie-typer';

import MenyvalgBehandling from './MenyvalgBehandling';
import MenyvalgFagsak from './MenyvalgFagsak';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../typer/person';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak: IMinimalFagsak;
}

const PosisjonertMenyknapp = styled(Button)`
    margin-left: 3rem;
`;

const StyletDropdownMenu = styled(Dropdown.Menu)`
    width: 30ch;
`;

const Behandlingsmeny: React.FC<IProps> = ({ bruker, minimalFagsak }) => {
    const { åpenBehandling: åpenBehandlingRessurs, erBehandlingAvsluttet } = useBehandling();
    const { behandlingId: behandlingIdFraURL } = useSakOgBehandlingParams();

    const åpenBehandling = hentDataFraRessurs(åpenBehandlingRessurs);

    const skalViseMenyvalgForBehandling =
        !!behandlingIdFraURL && !!åpenBehandling && !erBehandlingAvsluttet;

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
                            åpenBehandling={åpenBehandling}
                        />
                    )}
                </Dropdown.Menu.List>
            </StyletDropdownMenu>
        </Dropdown>
    );
};

export default Behandlingsmeny;
