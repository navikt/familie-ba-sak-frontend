import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export interface RegistrerDødsfallDatoPayload {
    dødsfallDato: string;
    begrunnelse: string;
    personIdent: string;
}

export async function registrerDødsfall(
    request: FamilieRequest,
    payload: RegistrerDødsfallDatoPayload,
    behandlingId: number
) {
    const ressurs = await request<RegistrerDødsfallDatoPayload, IBehandling>({
        data: payload,
        method: 'POST',
        url: `/familie-ba-sak/api/person/registrer-manuell-dodsfall/${behandlingId}`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
