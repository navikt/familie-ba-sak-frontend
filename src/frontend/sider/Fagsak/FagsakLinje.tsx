import React from 'react';

import { FileTextIcon, HouseIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack, Spacer } from '@navikt/ds-react';

import type { IMinimalFagsak } from '../../typer/fagsak';
import type { IPersonInfo } from '../../typer/person';
import Behandlingsmeny from './Personlinje/Behandlingsmeny/Behandlingsmeny';
import type { IBehandling } from '../../typer/behandling';

interface FagsaklinjeProps {
    bruker: IPersonInfo;
    minimalFagsak: IMinimalFagsak;
    behandling?: IBehandling;
}

const FagsakLinje: React.FunctionComponent<FagsaklinjeProps> = ({
    minimalFagsak,
    bruker,
    behandling,
}) => {
    return (
        <Box borderWidth={'0 0 1 0'} borderColor="border-subtle">
            <HStack paddingInline={'2 4'} paddingBlock={'2'}>
                <Button
                    as="a"
                    size={'small'}
                    variant={'tertiary'}
                    icon={<HouseIcon />}
                    href={`/fagsak/${minimalFagsak.id}/saksoversikt`}
                >
                    Saksoversikt
                </Button>
                <Button
                    as="a"
                    size={'small'}
                    variant={'tertiary'}
                    icon={<MagnifyingGlassIcon />}
                    href={'infotrygd'}
                >
                    Infotrygd
                </Button>
                <Button
                    as="a"
                    size={'small'}
                    variant={'tertiary'}
                    icon={<FileTextIcon />}
                    href={`/fagsak/${minimalFagsak.id}/dokumenter`}
                >
                    Dokumenter
                </Button>
                <Spacer />
                <Behandlingsmeny
                    minimalFagsak={minimalFagsak}
                    bruker={bruker}
                    behandling={behandling}
                />
            </HStack>
        </Box>
    );
};

export default FagsakLinje;
