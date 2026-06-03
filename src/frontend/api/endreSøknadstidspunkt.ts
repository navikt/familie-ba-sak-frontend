import type { IBehandling } from '@typer/behandling';
import { RessursResolver } from '@utils/ressursResolver';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { type IRegistrertSøknadstidspunktPåPersonDto } from './hentRegistrertSøknadstidspunktPåPerson';

export interface EndreSøknadstidspunktPayload {
    søknadstidspunktPerPerson: IRegistrertSøknadstidspunktPåPersonDto[];
}

export async function endreSøknadstidspunkt(
    request: FamilieRequest,
    payload: EndreSøknadstidspunktPayload,
    behandlingId: number
) {
    const ressurs = await request<EndreSøknadstidspunktPayload, IBehandling>({
        data: payload,
        method: 'PUT',
        url: `/familie-ba-sak/api/registrert-soknadstidspunkt-paa-person/behandling/${behandlingId}`,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
