import { byggSuksessRessurs } from '@navikt/familie-typer';
import type { VisningBehandling } from '@sider/Fagsak/Saksoversikt/visningBehandling';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagSaksbehandler } from '@testutils/testdata/saksbehandlerTestdata';
import { BehandlingResultat, BehandlingStatus, BehandlingSteg, type IBehandling } from '@typer/behandling';
import type { IMinimalFagsak } from '@typer/fagsak';
import type { ITilbakekreving } from '@typer/simulering';
import { TotrinnskontrollBeslutning } from '@typer/totrinnskontroll';
import type { IRestPersonResultat } from '@typer/vilkår';
import { HttpResponse, http, type RequestHandler } from 'msw';

const BEHANDLING_URL = '/familie-ba-sak/api/behandlinger/:behandlingId';

// msw matcher mot URL-kodet sti, så æøå må kodes.
function stegUrl(steg: string) {
    return encodeURI(`${BEHANDLING_URL}/steg/${steg}`);
}

export type Stegkall =
    | 'registrer-søknad'
    | 'vilkårsvurdering'
    | 'behandlingsresultat'
    | 'tilbakekreving'
    | 'send-til-beslutter'
    | 'iverksett-vedtak';

/**
 * - `hent`: behandlingen slik den er nå, etter alle kall som har endret den.
 * - `oppdater`: endrer behandlingen direkte, f.eks. fra en handler som overstyres i én test.
 */
export interface Behandlingsmock {
    hent: () => IBehandling;
    oppdater: (endringer: Partial<IBehandling>) => IBehandling;
    handlers: RequestHandler[];
}

/**
 * - `fagsak`: fagsaken behandlingen hører til. Behandlingen legges inn i (eller erstatter) fagsakens behandlinger.
 * - `opprettes`: behandlingen finnes ikke på fagsaken før appen har kalt `POST /behandlinger`.
 * - `etterSteg`: endringer som legges på behandlingen etter at backend har tatt imot et stegkall, i tillegg til nytt
 *   steg.
 */
interface Valg {
    fagsak?: IMinimalFagsak;
    opprettes?: boolean;
    etterSteg?: Partial<Record<Stegkall, Partial<IBehandling>>>;
}

/**
 * Lager en behandling som lever gjennom hele testen og endres når appen kaller stegendepunktene, omtrent slik backend
 * gjør. Det gjør det mulig å teste flyten mellom stegene uten å sette opp et nytt svar for hvert kall.
 *
 * Fagsaken mockes også, fordi appen sender saksbehandler tilbake til fagsaken hvis behandlingen ikke er en av
 * fagsakens behandlinger. `POST /behandlinger` svarer med behandlingen slik den er når kallet gjøres, så startverdien
 * er behandlingen som blir opprettet.
 */
export function lagBehandlingsmock(
    startbehandling: IBehandling,
    { fagsak = lagFagsak(), opprettes = false, etterSteg = {} }: Valg = {}
): Behandlingsmock {
    let behandling = startbehandling;
    let erOpprettet = !opprettes;

    function hentFagsak(): IMinimalFagsak {
        const andreBehandlinger = fagsak.behandlinger.filter(it => it.behandlingId !== behandling.behandlingId);
        return {
            ...fagsak,
            behandlinger: erOpprettet ? [...andreBehandlinger, tilVisningBehandling(behandling)] : andreBehandlinger,
        };
    }

    function oppdater(endringer: Partial<IBehandling>) {
        behandling = { ...behandling, ...endringer };
        return behandling;
    }

    function fullførSteg(stegkall: Stegkall, endringer: Partial<IBehandling>) {
        return HttpResponse.json(byggSuksessRessurs(oppdater({ ...endringer, ...etterSteg[stegkall] })));
    }

    const handlers: RequestHandler[] = [
        http.get('/familie-ba-sak/api/fagsaker/minimal/:fagsakId', () =>
            HttpResponse.json(byggSuksessRessurs(hentFagsak()))
        ),
        http.get(BEHANDLING_URL, () => HttpResponse.json(byggSuksessRessurs(behandling))),
        http.put(`${BEHANDLING_URL}/oppdatert-valutakurs`, () => HttpResponse.json(byggSuksessRessurs(behandling))),
        http.post('/familie-ba-sak/api/behandlinger', () => {
            erOpprettet = true;
            return HttpResponse.json(byggSuksessRessurs(behandling));
        }),
        http.put<never, IRestPersonResultat>(
            '/familie-ba-sak/api/vilkaarsvurdering/:behandlingId/:vilkaarId',
            async ({ request }) => {
                const { personIdent, vilkårResultater } = await request.json();
                const personResultater = behandling.personResultater.map(personResultat =>
                    personResultat.personIdent !== personIdent
                        ? personResultat
                        : {
                              ...personResultat,
                              vilkårResultater: personResultat.vilkårResultater.map(
                                  vilkårResultat =>
                                      vilkårResultater.find(oppdatert => oppdatert.id === vilkårResultat.id) ??
                                      vilkårResultat
                              ),
                          }
                );
                return HttpResponse.json(byggSuksessRessurs(oppdater({ personResultater })));
            }
        ),
        http.post(stegUrl('registrer-søknad'), () =>
            fullførSteg('registrer-søknad', { steg: BehandlingSteg.VILKÅRSVURDERING })
        ),
        http.post(stegUrl('vilkårsvurdering'), () =>
            fullførSteg('vilkårsvurdering', { steg: BehandlingSteg.BEHANDLINGSRESULTAT })
        ),
        http.post(stegUrl('behandlingsresultat'), () =>
            fullførSteg('behandlingsresultat', {
                steg: BehandlingSteg.VURDER_TILBAKEKREVING,
                resultat:
                    behandling.resultat === BehandlingResultat.IKKE_VURDERT
                        ? BehandlingResultat.INNVILGET
                        : behandling.resultat,
            })
        ),
        http.post(stegUrl('tilbakekreving'), async ({ request }) => {
            const body = await request.text();
            const tilbakekreving: ITilbakekreving | undefined = body ? JSON.parse(body) : undefined;
            return fullførSteg('tilbakekreving', { steg: BehandlingSteg.SEND_TIL_BESLUTTER, tilbakekreving });
        }),
        http.post(stegUrl('send-til-beslutter'), () => {
            const saksbehandler = lagSaksbehandler();
            return fullførSteg('send-til-beslutter', {
                steg: BehandlingSteg.BESLUTTE_VEDTAK,
                status: BehandlingStatus.FATTER_VEDTAK,
                totrinnskontroll: {
                    saksbehandler: saksbehandler.displayName,
                    saksbehandlerId: saksbehandler.navIdent,
                    godkjent: false,
                    opprettetTidspunkt: '2025-01-02T10:00:00.000',
                },
            });
        }),
        http.post<never, { beslutning: TotrinnskontrollBeslutning }>(
            stegUrl('iverksett-vedtak'),
            async ({ request }) => {
                const { beslutning } = await request.json();
                // Backend beholder totrinnskontrollen og setter beslutter, men mocken vet ikke hvem som er innlogget.
                const totrinnskontroll = behandling.totrinnskontroll && {
                    ...behandling.totrinnskontroll,
                    godkjent: beslutning === TotrinnskontrollBeslutning.GODKJENT,
                };
                if (beslutning === TotrinnskontrollBeslutning.UNDERKJENT) {
                    return fullførSteg('iverksett-vedtak', {
                        steg: BehandlingSteg.SEND_TIL_BESLUTTER,
                        status: BehandlingStatus.UTREDES,
                        totrinnskontroll,
                    });
                }
                return fullførSteg('iverksett-vedtak', {
                    steg: BehandlingSteg.IVERKSETT_MOT_OPPDRAG,
                    status: BehandlingStatus.IVERKSETTER_VEDTAK,
                    totrinnskontroll,
                });
            }
        ),
    ];

    return { hent: () => behandling, oppdater, handlers };
}

function tilVisningBehandling(behandling: IBehandling): VisningBehandling {
    return {
        aktiv: true,
        behandlingId: behandling.behandlingId,
        opprettetTidspunkt: behandling.opprettetTidspunkt,
        aktivertTidspunkt: behandling.opprettetTidspunkt,
        resultat: behandling.resultat,
        status: behandling.status,
        type: behandling.type,
        kategori: behandling.kategori,
        underkategori: behandling.underkategori,
        vedtaksdato: behandling.vedtak?.vedtaksdato || undefined,
        årsak: behandling.årsak,
    };
}
