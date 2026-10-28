import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export interface RegistrerDødsfallDatoPayload {
    dødsfallDato: string;
    begrunnelse: string;
    personIdent: string;
}

export async function registrerDødsfall(payload: RegistrerDødsfallDatoPayload, behandlingId: number) {
    return apiClient.post<RegistrerDødsfallDatoPayload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/person/registrer-manuell-dodsfall/${behandlingId}`,
    });
}
