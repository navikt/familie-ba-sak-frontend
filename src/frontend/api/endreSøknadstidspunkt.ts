import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

import { type IRegistrertSøknadstidspunktPåPersonDto } from './hentRegistrertSøknadstidspunktPåPerson';

export interface EndreSøknadstidspunktPayload {
    søknadstidspunktPerPerson: IRegistrertSøknadstidspunktPåPersonDto[];
}

export async function endreSøknadstidspunkt(payload: EndreSøknadstidspunktPayload, behandlingId: number) {
    return apiClient.put<EndreSøknadstidspunktPayload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/registrert-soknadstidspunkt-paa-person/behandling/${behandlingId}`,
    });
}
