import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { IBehandling } from '../typer/behandling';
import { RessursResolver } from '../utils/ressursResolver';

export async function oppdaterRegisteropplysninger(
    request: FamilieRequest,
    behandlingId: number,
    påvirkerSystemLaster: boolean = false
): Promise<IBehandling> {
    const ressurs = await request<void, IBehandling>({
        method: 'GET', // Dette burde kanskje ikke være GET?
        url: `/familie-ba-sak/api/person/oppdater-registeropplysninger/${behandlingId}`,
        påvirkerSystemLaster: påvirkerSystemLaster,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
