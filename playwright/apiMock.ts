import type { Page, Request as PlaywrightRequest, Route } from '@playwright/test';
import { getResponse, type RequestHandler } from 'msw';

const API_PREFIKSER = ['/familie-ba-sak/', '/user/', '/redirect/', '/version', '/logg'];
const TILLATTE_EKSTERNE_RESSURSER = ['https://cdn.nav.no/aksel/'];
const NAIS_META_TAGS_PLASSHOLDER = '{{{NAIS_META_TAGS}}}';

export interface ApiMock {
    /**
     * Overstyrer svaret fra ett eller flere endepunkter i resten av testen, tilsvarende server.use() i vitest.
     *
     * De nye handlerne legges foran standardhandlerne fra `testutils/mocks/handlers`. msw bruker den første handleren
     * som matcher metode og URL, så en handler for samme endepunkt vinner over standardhandleren. Standardhandleren
     * fjernes ikke, og endepunkter som ikke overstyres svarer som før.
     *
     * Overstyringen gjelder bare requester som sendes etter kallet, så kall `use` før `page.goto` eller handlingen som
     * utløser requesten. Hver test får sin egen `apiMock`, så overstyringer lekker ikke mellom tester.
     *
     * @example
     * apiMock.use(
     *     http.get('/familie-ba-sak/api/fagsaker/minimal/:fagsakId', () =>
     *         HttpResponse.json(byggFeiletRessurs('Fant ikke fagsak.'))
     *     )
     * );
     */
    use: (...handlers: RequestHandler[]) => void;
    /** API-kall (`METODE /sti`) som ingen handler matchet. Fixturen feiler testen hvis listen ikke er tom. */
    ubehandledeKall: string[];
}

function erApiKall(url: URL): boolean {
    return API_PREFIKSER.some(prefiks => url.pathname.startsWith(prefiks));
}

function erTillattEksternRessurs(url: URL): boolean {
    return TILLATTE_EKSTERNE_RESSURSER.some(prefiks => url.href.startsWith(prefiks));
}

async function tilFetchRequest(request: PlaywrightRequest): Promise<Request> {
    const headers = Object.entries(await request.allHeaders()).filter(([navn]) => !navn.startsWith(':'));
    const body = request.postDataBuffer();

    return new Request(request.url(), {
        method: request.method(),
        headers,
        body: body && !['GET', 'HEAD'].includes(request.method()) ? new Uint8Array(body) : undefined,
    });
}

async function svarMedMock(route: Route, handlers: RequestHandler[], appOrigin: string, ubehandledeKall: string[]) {
    const request = route.request();
    const respons = await getResponse(handlers, await tilFetchRequest(request), { baseUrl: appOrigin });

    if (!respons) {
        const kall = `${request.method()} ${decodeURIComponent(new URL(request.url()).pathname)}`;
        ubehandledeKall.push(kall);
        return route.fulfill({ status: 501, body: `Mangler mock-handler for ${kall}` });
    }

    return route.fulfill({
        status: respons.status,
        headers: Object.fromEntries(respons.headers),
        body: Buffer.from(await respons.arrayBuffer()),
    });
}

// index.html inneholder en plassholder som BFF-en vanligvis erstatter. Uten BFF-en må den fjernes for at den ikke skal
// rendres som tekst i toppen av siden.
async function fjernNaisMetaTagsPlassholder(route: Route) {
    const respons = await route.fetch();
    const html = await respons.text();
    return route.fulfill({ response: respons, body: html.replace(NAIS_META_TAGS_PLASSHOLDER, '') });
}

/**
 * Avskjærer alle requester fra siden:
 * - Kall mot BFF-en besvares av msw-handlers. Kall uten handler registreres i `ubehandledeKall`.
 * - Kall til andre domener blokkeres (bortsett fra Aksel-fonter), slik at testene ikke er avhengige av eksterne tjenester.
 * - Øvrige requester (statiske filer fra vite preview) slippes gjennom.
 */
export async function settOppApiMock(
    page: Page,
    appOrigin: string,
    standardHandlers: RequestHandler[]
): Promise<ApiMock> {
    let handlers = [...standardHandlers];
    const ubehandledeKall: string[] = [];

    await page.route('**/*', async route => {
        const request = route.request();
        const url = new URL(request.url());

        if (url.origin !== appOrigin) {
            return erTillattEksternRessurs(url) ? route.fallback() : route.abort('blockedbyclient');
        }
        if (erApiKall(url)) {
            return svarMedMock(route, handlers, appOrigin, ubehandledeKall);
        }
        if (request.resourceType() === 'document') {
            return fjernNaisMetaTagsPlassholder(route);
        }
        return route.fallback();
    });

    return {
        use: (...nyeHandlers) => {
            handlers = [...nyeHandlers, ...handlers];
        },
        ubehandledeKall,
    };
}
