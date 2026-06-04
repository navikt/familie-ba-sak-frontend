import { NotFound } from '@komponenter/Error/NotFound';
import { RouteError } from '@komponenter/Error/RouteError';
import { Behandling } from '@sider/Fagsak/Behandling/Behandling';
import { behandlingRoutes } from '@sider/Fagsak/Behandling/BehandlingRoutes';
import { HentOgSettBehandlingProvider } from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { Dokumenter } from '@sider/Fagsak/Dokumenter/Dokumenter';
import { Dokumentutsending } from '@sider/Fagsak/Dokumentutsending/Dokumentutsending';
import { DokumentutsendingProvider } from '@sider/Fagsak/Dokumentutsending/DokumentutsendingContext';
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
            <DokumentutsendingProvider>
                <Dokumentutsending />
            </DokumentutsendingProvider>
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
