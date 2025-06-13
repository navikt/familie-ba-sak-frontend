import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import type { SettAktivBrukerIModiaContextDTO } from '../typer/modiaContext';
import { RessursResolver } from '../utils/ressursResolver';

export async function settAktivBrukerIModiaContext(request: FamilieRequest, personIdent: string) {
    const ressurs = await request<SettAktivBrukerIModiaContextDTO, void>({
        url: '/familie-ba-sak/api/modia-context/sett-aktiv-bruker',
        method: 'POST',
        data: { personIdent },
    });
    return RessursResolver.resolveToPromise(ressurs);
}
