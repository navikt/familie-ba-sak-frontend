import { Path } from '@app/path';
import { NotFound } from '@komponenter/Error/NotFound';
import { RouteError } from '@komponenter/Error/RouteError';
import { Fagsak } from '@sider/Fagsak/Fagsak';
import { fagsakRoutes } from '@sider/Fagsak/FagsakRoutes';
import { Infotrygd } from '@sider/Infotrygd/Infotrygd';
import ManuellJournalføring from '@sider/ManuellJournalføring/ManuellJournalføring';
import { Oppgavebenk } from '@sider/Oppgavebenk/Oppgavebenk';
import { Samhandler } from '@sider/Samhandler/Samhandler';
import { createBrowserRouter, Navigate } from 'react-router';

import { AppContainer } from './AppContainer';

export const appRoutes = createBrowserRouter([
    {
        path: '/',
        element: <AppContainer />,
        errorElement: <RouteError />,
        children: [
            {
                index: true,
                element: <Navigate to={Path.oppgaver} replace={true} />,
            },
            {
                path: 'fagsak/:fagsakId',
                element: <Fagsak />,
                errorElement: <RouteError />,
                children: fagsakRoutes,
            },
            {
                path: 'oppgaver',
                element: <Oppgavebenk />,
            },
            {
                path: 'oppgaver/journalfor/:oppgaveId',
                element: <ManuellJournalføring />,
            },
            {
                path: 'infotrygd',
                element: <Infotrygd />,
            },
            {
                path: 'samhandler',
                element: <Samhandler />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
