import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';

import type { VedtaksbegrunnelseTekster } from '../typer/vilkår';

export const useBegrunnelseApi = () => {
    const { request } = useHttp();

    const hentAlleBegrunnelser = (): Promise<Ressurs<VedtaksbegrunnelseTekster>> => {
        return request<void, VedtaksbegrunnelseTekster>({
            method: 'GET',
            url: `/familie-ba-sak/api/vilkaarsvurdering/vilkaarsbegrunnelser`,
            påvirkerSystemLaster: true,
        });
    };

    return {
        hentAlleBegrunnelser,
    };
};
