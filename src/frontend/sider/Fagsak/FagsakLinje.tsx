import React from 'react';

import { useLocation, Link as ReactRouterLink } from 'react-router';

import { FileTextIcon, HouseIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack } from '@navikt/ds-react';

import type { IMinimalFagsak } from '../../typer/fagsak';
import type { IPersonInfo } from '../../typer/person';
import Behandlingsmeny from './Personlinje/Behandlingsmeny/Behandlingsmeny';
import type { IBehandling } from '../../typer/behandling';

interface FagsaklinjeProps {
    bruker: IPersonInfo;
    minimalFagsak: IMinimalFagsak;
    behandling?: IBehandling;
}

const aktivFaneStyle = (fanenavn: string, pathname: string) => {
    const urlSplit = pathname.split('/');
    const sluttenPåUrl = urlSplit[urlSplit.length - 1];
    return sluttenPåUrl === fanenavn ? { textDecoration: 'underline' } : {};
};

const FagsakLinje = ({ minimalFagsak, bruker, behandling }: FagsaklinjeProps) => {
    const { pathname } = useLocation();

    return (
        <Box borderWidth="0 0 1 0" borderColor="border-subtle">
            <HStack paddingInline="2 4" paddingBlock="2" justify="space-between">
                <HStack>
                    <Button
                        as={ReactRouterLink}
                        size="small"
                        variant="tertiary"
                        icon={<HouseIcon />}
                        to={`/fagsak/${minimalFagsak.id}/saksoversikt`}
                        style={aktivFaneStyle('saksoversikt', pathname)}
                    >
                        Saksoversikt
                    </Button>
                    <Button
                        as={ReactRouterLink}
                        size="small"
                        variant="tertiary"
                        icon={<MagnifyingGlassIcon />}
                        to="infotrygd"
                        style={aktivFaneStyle('infotrygd', pathname)}
                    >
                        Infotrygd
                    </Button>
                    <Button
                        as={ReactRouterLink}
                        size="small"
                        variant="tertiary"
                        icon={<FileTextIcon />}
                        to={`/fagsak/${minimalFagsak.id}/dokumenter`}
                        style={aktivFaneStyle('dokumenter', pathname)}
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
