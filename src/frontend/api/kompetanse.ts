import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { KompetanseAktivitet, KompetanseResultat } from '@typer/eøsPerioder';

export interface OppdaterKompetansePayload {
    id: number;
    fom: string;
    tom?: string;
    barnIdenter: string[];
    søkersAktivitet?: KompetanseAktivitet;
    søkersAktivitetsland?: string;
    annenForeldersAktivitet?: KompetanseAktivitet;
    annenForeldersAktivitetsland?: string;
    barnetsBostedsland?: string;
    resultat?: KompetanseResultat;
    erAnnenForelderOmfattetAvNorskLovgivning?: boolean;
}

export async function oppdaterKompetanse(payload: OppdaterKompetansePayload, behandlingId: number) {
    return apiClient.put<OppdaterKompetansePayload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/kompetanse/${behandlingId}`,
    });
}

export async function slettKompetanse(behandlingId: number, kompetanseId: number) {
    return apiClient.delete<void, IBehandling>({
        url: `/familie-ba-sak/api/kompetanse/${behandlingId}/${kompetanseId}`,
    });
}
