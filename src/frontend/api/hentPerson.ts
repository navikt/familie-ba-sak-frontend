import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';
import { RessursStatus } from '@navikt/familie-typer';

import type { IPersonInfo } from '../typer/person';
import { RessursResolver } from '../utils/ressursResolver';

interface RequestParams {
    ident: string;
}

export async function hentPerson(request: FamilieRequest, ident: string) {
    const ressurs = await request<RequestParams, IPersonInfo>({
        method: 'POST',
        url: '/familie-ba-sak/api/person',
        data: { ident },
    });
    if (ressurs.status === RessursStatus.SUKSESS && ressurs.data.harTilgang === false) {
        return Promise.reject(new Error('Du har ikke tilgang til person.'));
    }
    return RessursResolver.resolveToPromise(ressurs);
}
