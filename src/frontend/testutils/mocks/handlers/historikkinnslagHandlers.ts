import type { HistorikkinnslagDto } from '@api/hentHistorikkinnslag';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { LoggType } from '@typer/logg';
import { HttpResponse, http } from 'msw';

export const historikkinnslagHandlers = [
    http.get<{ behandlingId: string }>('/familie-ba-sak/api/logg/:behandlingId', ({ params }) => {
        const historikkinnslag: HistorikkinnslagDto[] = [
            {
                id: 1,
                opprettetAv: 'Sak Behandler',
                opprettetTidspunkt: '2025-01-01T13:00:00.000',
                behandlingId: Number(params.behandlingId),
                type: LoggType.BEHANDLING_OPPRETTET,
                tittel: 'Behandling opprettet',
                rolle: 'SAKSBEHANDLER',
                tekst: '',
            },
        ];
        return HttpResponse.json(byggSuksessRessurs(historikkinnslag));
    }),
];
