import { Link as ReactRouterLink, useLocation } from 'react-router';

import { FileTextIcon, HouseIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack } from '@navikt/ds-react';

import { Behandlingsmeny } from './Meny/Behandlingsmeny';
import { useSaksbehandler } from '../../hooks/useSaksbehandler';
import { useFagsakContext } from '../../sider/Fagsak/FagsakContext';

function lagAktivFaneStyle(fanenavn: string, pathname: string) {
    const urlSplit = pathname.split('/');
    const sluttenPåUrl = urlSplit[urlSplit.length - 1];
    return sluttenPåUrl === fanenavn ? { textDecoration: 'underline' } : {};
}

export function Behandlingslinje() {
    const { fagsak } = useFagsakContext();
    const { pathname } = useLocation();
    const saksbehandler = useSaksbehandler();

    return (
        <Box borderWidth={'0 0 1 0'} borderColor={'neutral-subtle'}>
            <HStack paddingInline={'space-8 space-16'} paddingBlock={'space-4'} justify={'space-between'}>
                <HStack>
                    <Button
                        as={ReactRouterLink}
                        size={'small'}
                        variant={'tertiary'}
                        icon={<HouseIcon />}
                        to={`/fagsak/${fagsak.id}/saksoversikt`}
                        style={lagAktivFaneStyle('saksoversikt', pathname)}
                    >
                        Saksoversikt
                    </Button>
                    <Button
                        as={ReactRouterLink}
                        size={'small'}
                        variant={'tertiary'}
                        icon={<MagnifyingGlassIcon />}
                        to={`/fagsak/${fagsak.id}/infotrygd`}
                        style={lagAktivFaneStyle('infotrygd', pathname)}
                    >
                        Infotrygd
                    </Button>
                    <Button
                        as={ReactRouterLink}
                        size={'small'}
                        variant={'tertiary'}
                        icon={<FileTextIcon />}
                        to={`/fagsak/${fagsak.id}/dokumenter`}
                        style={lagAktivFaneStyle('dokumenter', pathname)}
                    >
                        Dokumenter
                    </Button>
                </HStack>
                {saksbehandler.harSkrivetilgang && <Behandlingsmeny />}
            </HStack>
        </Box>
    );
}
