import { apiClient } from '@api/client/apiClient';
import type { IsoDatoString } from '@utils/dato';

export interface IRegistrertSøknadstidspunktPåPersonDto {
    personIdent: string;
    søknadstidspunkt: IsoDatoString;
}

export async function hentRegistrertSøknadstidspunktPåPerson(behandlingId: number) {
    return apiClient.get<void, IRegistrertSøknadstidspunktPåPersonDto[]>({
        url: `/familie-ba-sak/api/registrert-soknadstidspunkt-paa-person/behandling/${behandlingId}`,
    });
}
