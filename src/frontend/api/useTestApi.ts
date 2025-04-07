import { useHttp } from '@navikt/familie-http';
import { byggTomRessurs, type Ressurs } from '@navikt/familie-typer';

export const useTestApi = () => {
    const { request } = useHttp();

    const opprettRevurderingKlage = (fagsakId: number | undefined): Promise<Ressurs<never>> => {
        if (!fagsakId) {
            return Promise.resolve(byggTomRessurs());
        }

        const klagebehandlingId = '07eb0c27-3b41-46c8-bd46-85bb07c94512';

        return request<void, never>({
            method: 'POST',
            url: `/familie-ba-sak/api/klage/fagsak/${fagsakId}/klagebehandling/${klagebehandlingId}/opprett-revurdering-klage`,
            påvirkerSystemLaster: true,
        });
    };

    return {
        opprettRevurderingKlage,
    };
};
