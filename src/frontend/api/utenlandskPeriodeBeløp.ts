import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { UtenlandskPeriodeBeløpIntervall } from '@typer/eøsPerioder';

export interface OppdaterUtenlandskPeriodeBeløpPayload {
    id: number;
    fom: string;
    tom?: string;
    barnIdenter: string[];
    beløp: string;
    valutakode?: string;
    intervall?: UtenlandskPeriodeBeløpIntervall;
    utbetalingsland?: string;
}

export async function oppdaterUtenlandskPeriodeBeløp(
    payload: OppdaterUtenlandskPeriodeBeløpPayload,
    behandlingId: number
) {
    return apiClient.put<OppdaterUtenlandskPeriodeBeløpPayload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/differanseberegning/utenlandskperidebeløp/${behandlingId}`,
    });
}

export async function slettUtenlandskPeriodeBeløp(behandlingId: number, utenlandskPeriodeBeløpId: number) {
    return apiClient.delete<void, IBehandling>({
        url: `/familie-ba-sak/api/differanseberegning/utenlandskperidebeløp/${behandlingId}/${utenlandskPeriodeBeløpId}`,
    });
}
