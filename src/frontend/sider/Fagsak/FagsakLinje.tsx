import React from 'react';

import { useLocation } from 'react-router';

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

const aktivFaneStyle = (fanenavn: string) => {
    const location = useLocation();
    const urlSplit = location.pathname.split('/');
    const sluttenPåUrl = urlSplit[urlSplit.length - 1];
    return sluttenPåUrl === fanenavn ? { textDecoration: 'underline' } : {};
};

const FagsakLinje: React.FunctionComponent<FagsaklinjeProps> = ({
    minimalFagsak,
    bruker,
    behandling,
}) => {
    return (
        <Box borderWidth={'0 0 1 0'} borderColor="border-subtle">
            <HStack paddingInline={'2 4'} paddingBlock={'2'} justify={'space-between'}>
                <HStack>
                    <Button
                        as="a"
                        size={'small'}
                        variant={'tertiary'}
                        icon={<HouseIcon />}
                        href={`/fagsak/${minimalFagsak.id}/saksoversikt`}
                        style={aktivFaneStyle('saksoversikt')}
                    >
                        Saksoversikt
                    </Button>
                    <Button
                        as="a"
                        size={'small'}
                        variant={'tertiary'}
                        icon={<MagnifyingGlassIcon />}
                        href={'infotrygd'}
                        style={aktivFaneStyle('infotrygd')}
                    >
                        Infotrygd
                    </Button>
                    <Button
                        as="a"
                        size={'small'}
                        variant={'tertiary'}
                        icon={<FileTextIcon />}
                        href={`/fagsak/${minimalFagsak.id}/dokumenter`}
                        style={aktivFaneStyle('dokumenter')}
                    >
                        Dokumenter
                    </Button>
                </HStack>
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
