import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

import { type RegistrertSøknadstidspunkt } from './hentRegistrerteSøknadstidspunkter';

export interface EndreSøknadstidspunktPayload {
    søknadstidspunktPerPerson: RegistrertSøknadstidspunkt[];
}

export async function endreSøknadstidspunkt(payload: EndreSøknadstidspunktPayload, behandlingId: number) {
    return apiClient.put<EndreSøknadstidspunktPayload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/registrert-soknadstidspunkt-paa-person/behandling/${behandlingId}`,
    });
}
