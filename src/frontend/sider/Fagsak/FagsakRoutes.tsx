import { NotFound } from '@komponenter/Error/NotFound';
import { RouteError } from '@komponenter/Error/RouteError';
import { Behandling } from '@sider/Fagsak/Behandling/Behandling';
import { behandlingRoutes } from '@sider/Fagsak/Behandling/BehandlingRoutes';
import { HentOgSettBehandlingProvider } from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { Dokumenter } from '@sider/Fagsak/Dokumenter/Dokumenter';
import { DokumentContainer } from '@sider/Fagsak/Dokumentutsending/DokumentContainer';
import { Dokumentutsending } from '@sider/Fagsak/Dokumentutsending/Dokumentutsending';
import { Infotrygd } from '@sider/Fagsak/Infotrygd/Infotrygd';
import { RedirectTilSaksoversikt } from '@sider/Fagsak/Saksoversikt/RedirectTilSaksoversikt';
import { Saksoversikt } from '@sider/Fagsak/Saksoversikt/Saksoversikt';
import type { RouteObject } from 'react-router';

export const fagsakRoutes: RouteObject[] = [
    {
        index: true,
        element: <RedirectTilSaksoversikt />,
    },
    {
        path: 'saksoversikt',
        element: <Saksoversikt />,
    },
    {
        path: 'dokumentutsending',
        element: (
            <DokumentContainer>
                <Dokumentutsending />
            </DokumentContainer>
        ),
    },
    {
        path: 'dokumenter',
        element: <Dokumenter />,
    },
    {
        path: 'infotrygd',
        element: <Infotrygd />,
    },
    {
        path: ':behandlingId',
        element: (
            <HentOgSettBehandlingProvider>
                <Behandling />
            </HentOgSettBehandlingProvider>
        ),
        errorElement: <RouteError />,
        children: behandlingRoutes,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];
