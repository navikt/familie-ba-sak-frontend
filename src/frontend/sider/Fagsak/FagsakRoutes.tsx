import { RouteError } from '@komponenter/Error/RouteError';
import { Fagsaklinje } from '@komponenter/Saklinje/Fagsaklinje';
import { BehandlingContainer } from '@sider/Fagsak/Behandling/BehandlingContainer';
import { behandlingRoutes } from '@sider/Fagsak/Behandling/BehandlingRoutes';
import { HentOgSettBehandlingProvider } from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { Dokumentutsending } from '@sider/Fagsak/Dokumentutsending/Dokumentutsending';
import { DokumentutsendingProvider } from '@sider/Fagsak/Dokumentutsending/DokumentutsendingContext';
import { InfotrygdFagsak } from '@sider/Fagsak/Infotrygd/InfotrygdFagsak';
import { JournalpostListe } from '@sider/Fagsak/journalposter/JournalpostListe';
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
        element: (
            <>
                <Fagsaklinje />
                <Saksoversikt />
            </>
        ),
    },
    {
        path: 'dokumentutsending',
        element: (
            <>
                <Fagsaklinje />
                <DokumentutsendingProvider>
                    <Dokumentutsending />
                </DokumentutsendingProvider>
            </>
        ),
    },
    {
        path: 'dokumenter',
        element: (
            <>
                <Fagsaklinje />
                <JournalpostListe />
            </>
        ),
    },
    {
        path: 'infotrygd',
        element: (
            <>
                <Fagsaklinje />
                <InfotrygdFagsak />
            </>
        ),
    },
    {
        path: ':behandlingId',
        element: (
            <HentOgSettBehandlingProvider>
                <BehandlingContainer />
            </HentOgSettBehandlingProvider>
        ),
        errorElement: <RouteError />,
        children: behandlingRoutes,
    },
];
