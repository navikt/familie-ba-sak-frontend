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

type Id = string | number;

export const Path = {
    root: '/',
    oppgaver: '/oppgaver',
    journalfør: (oppgaveId: Id) => `/oppgaver/journalfor/${oppgaveId}`,
    infotrygd: '/infotrygd',
    samhandler: '/samhandler',
    fagsak: (fagsakId: Id) => {
        const fagsakBase = `/fagsak/${fagsakId}`;
        return {
            root: fagsakBase,
            saksoversikt: `${fagsakBase}/saksoversikt`,
            dokumentutsending: `${fagsakBase}/dokumentutsending`,
            dokumenter: `${fagsakBase}/dokumenter`,
            infotrygd: `${fagsakBase}/infotrygd`,
            behandling: (behandlingId: Id) => {
                const behandlingBase = `/${fagsakBase}/${behandlingId}`;
                return {
                    root: behandlingBase,
                    registrerInstitusjon: `${behandlingBase}/registrer-institusjon`,
                    registrerSøknad: `${behandlingBase}/registrer-soknad`,
                    filtreringsregler: `${behandlingBase}/filtreringsregler`,
                    vilkårsvurdering: `${behandlingBase}/vilkaarsvurdering`,
                    tilkjentYtelse: `${behandlingBase}/tilkjent-ytelse`,
                    simulering: `${behandlingBase}/simulering`,
                    vedtak: `${behandlingBase}/vedtak`,
                } as const;
            },
        } as const;
    },
} as const;

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
