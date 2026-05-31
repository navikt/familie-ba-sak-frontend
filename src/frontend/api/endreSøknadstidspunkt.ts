import type { IBehandling } from '@typer/behandling';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IRegistrertSøknadstidspunktDto } from './hentRegistrertSøknadstidspunkt';
import { RessursResolver } from '../utils/ressursResolver';

export interface EndreSøknadstidspunktPayload {
    søknadstidspunktPerPerson: IRegistrertSøknadstidspunktDto[];
}

export const endreSøknadstidspunkt = async (
    request: FamilieRequest,
    behandlingId: number,
    payload: EndreSøknadstidspunktPayload
) => {
    const ressurs = await request<EndreSøknadstidspunktPayload, IBehandling>({
        data: payload,
        method: 'PUT',
        url: `/familie-ba-sak/api/registrert-soknadstidspunkt/behandling/${behandlingId}`,
    });

    return RessursResolver.resolveToPromise(ressurs);
};
