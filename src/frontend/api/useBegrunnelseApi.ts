import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';

import type { AlleBegrunnelser } from '../typer/vilkår';

export const useBegrunnelseApi = () => {
    const { request } = useHttp();

    const hentAlleBegrunnelser = (): Promise<Ressurs<AlleBegrunnelser>> => {
        return request<void, AlleBegrunnelser>({
            method: 'GET',
            url: `/familie-ba-sak/api/vilkaarsvurdering/vilkaarsbegrunnelser`,
            påvirkerSystemLaster: true,
        });
    };

    return {
        hentAlleBegrunnelser,
    };
};
