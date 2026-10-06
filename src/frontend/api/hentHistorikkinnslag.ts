import { apiClient } from '@api/client/apiClient';

import type { BehandlerRolle } from '@typer/behandling';
import type { LoggType } from '@typer/logg';

export interface HistorikkinnslagDto {
    id: number;
    opprettetAv: string;
    opprettetTidspunkt: string;
    behandlingId: number;
    type: LoggType;
    tittel: string;
    rolle: keyof typeof BehandlerRolle;
    tekst: string;
}

export async function hentHistorikkinnslag(behandlingId: number): Promise<HistorikkinnslagDto[]> {
    return apiClient.get<void, HistorikkinnslagDto[]>({
        url: `/familie-ba-sak/api/logg/${behandlingId}`,
    });
}
