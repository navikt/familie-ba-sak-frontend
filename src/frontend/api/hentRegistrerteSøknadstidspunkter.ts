import { apiClient } from '@api/client/apiClient';
import type { IsoDatoString } from '@utils/dato';

export interface RegistrertSøknadstidspunkt {
    personIdent: string;
    søknadstidspunkt: IsoDatoString;
}

export async function hentRegistrerteSøknadstidspunkter(behandlingId: number) {
    return apiClient.get<void, RegistrertSøknadstidspunkt[]>({
        url: `/familie-ba-sak/api/registrert-soknadstidspunkt-paa-person/behandling/${behandlingId}`,
    });
}
