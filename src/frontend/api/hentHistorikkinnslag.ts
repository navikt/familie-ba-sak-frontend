import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { BehandlerRolle } from '../typer/behandling';
import type { LoggType } from '../typer/logg';
import { RessursResolver } from '../utils/ressursResolver';

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

export async function hentHistorikkinnslag(request: FamilieRequest, behandlingId: number) {
    const ressurs = await request<void, HistorikkinnslagDto[]>({
        method: 'GET',
        url: `/familie-ba-sak/api/logg/${behandlingId}`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
