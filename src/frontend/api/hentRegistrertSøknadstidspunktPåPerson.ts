import type { IsoDatoString } from '@utils/dato';
import { RessursResolver } from '@utils/ressursResolver';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

export interface IRegistrertSøknadstidspunktPåPersonDto {
    personIdent: string;
    søknadstidspunkt: IsoDatoString;
}

export async function hentRegistrertSøknadstidspunktPåPerson(request: FamilieRequest, behandlingId: number) {
    const ressurs = await request<void, IRegistrertSøknadstidspunktPåPersonDto[]>({
        method: 'GET',
        url: `/familie-ba-sak/api/registrert-soknadstidspunkt-paa-person/behandling/${behandlingId}`,
    });

    return RessursResolver.resolveToPromise(ressurs);
}
