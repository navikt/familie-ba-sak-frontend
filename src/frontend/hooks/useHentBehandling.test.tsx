import { byggSuksessRessurs } from '@navikt/familie-typer';
import { QueryClient } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { skruPåAlleToggles } from '@testutils/mocks/handlers/featureToggleHandlers';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagBrevmottakerBehandling } from '@testutils/testdata/brevmottakerTestdata';
import { lagGrunnlagPerson } from '@testutils/testdata/personTestdata';
import { lagRegisterhistorikk } from '@testutils/testdata/registerhistorikkTestdata';
import { lagSaksbehandler } from '@testutils/testdata/saksbehandlerTestdata';
import { lagUtbetalingsperiode, lagUtbetalingsperiodeDetalj } from '@testutils/testdata/vedtaksperiodeTestdata';
import { TestProviders } from '@testutils/testrender';
import { BehandlingSteg, type IBehandling } from '@typer/behandling';
import { BehandlingUnderkategori } from '@typer/behandlingstema';
import { Brevmottakertype } from '@typer/brevmottaker';
import { FeatureToggle, type FeatureToggles } from '@typer/featureToggles';
import { PersonType } from '@typer/person';
import type { Saksbehandler } from '@typer/saksbehandler';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { describe, expect, test } from 'vitest';

import { HentBehandlingQueryKeyFactory, useHentBehandling } from './useHentBehandling';

interface RenderOptions {
    behandlingId: number | undefined;
    queryClient?: QueryClient;
    saksbehandler?: Saksbehandler;
    featureToggles?: FeatureToggles;
}

const VEILEDER_GRUPPE = '93a26831-9866-4410-927b-74ff51a9107c';
const BESLUTTER_GRUPPE = '9449c153-5a1e-44a7-84c6-7cc7a8867233';

function lagQueryClient() {
    return new QueryClient({ defaultOptions: { queries: { retry: false } } });
}

function renderUseHentBehandling({
    behandlingId,
    queryClient = lagQueryClient(),
    saksbehandler = lagSaksbehandler(),
    featureToggles = skruPåAlleToggles(),
}: RenderOptions) {
    server.use(
        http.get('/user/profile', () => HttpResponse.json(saksbehandler)),
        http.post('/familie-ba-sak/api/feature/er-toggler-enabled', () =>
            HttpResponse.json(byggSuksessRessurs(featureToggles))
        )
    );
    const wrapper = ({ children }: PropsWithChildren) => (
        <TestProviders queryClient={queryClient} saksbehandler={saksbehandler} featureToggles={featureToggles}>
            {children}
        </TestProviders>
    );
    return renderHook(() => useHentBehandling(behandlingId), { wrapper });
}

function mockHentBehandling(behandling: IBehandling) {
    server.use(
        http.get(`/familie-ba-sak/api/behandlinger/${behandling.behandlingId}`, () =>
            HttpResponse.json(byggSuksessRessurs(behandling))
        )
    );
}

function lagBehandlingMedPersondata(): IBehandling {
    const søker = lagGrunnlagPerson({
        type: PersonType.SØKER,
        navn: 'Ekte Søker',
        fødselsdato: '1990-01-01',
        registerhistorikk: lagRegisterhistorikk({
            bostedsadresse: [{ verdi: 'Ekte gate 1' }, { verdi: 'Ekte gate 2' }],
            oppholdsadresse: [{ verdi: 'Ekte oppholdsgate 1' }],
            deltBosted: [{ verdi: 'Ekte delt gate 1' }],
            dødsboadresse: [{ verdi: 'Ekte dødsbogate 1' }],
        }),
    });
    const eldsteBarn = lagGrunnlagPerson({
        type: PersonType.BARN,
        navn: 'Ekte Eldste Barn',
        fødselsdato: '2018-01-01',
    });
    const yngsteBarn = lagGrunnlagPerson({
        type: PersonType.BARN,
        navn: 'Ekte Yngste Barn',
        fødselsdato: '2020-01-01',
    });
    return lagBehandling({
        personer: [søker, eldsteBarn, yngsteBarn],
        søknadsgrunnlag: {
            underkategori: BehandlingUnderkategori.ORDINÆR,
            søkerMedOpplysninger: { ident: søker.personIdent, målform: undefined },
            barnaMedOpplysninger: [
                {
                    ident: '1',
                    navn: 'Ekte Eldste Barn',
                    fødselsdato: '2018-01-01',
                    inkludertISøknaden: true,
                    manueltRegistrert: false,
                    erFolkeregistrert: true,
                },
                {
                    ident: '2',
                    navn: 'Ekte Yngste Barn',
                    fødselsdato: '2020-01-01',
                    inkludertISøknaden: true,
                    manueltRegistrert: false,
                    erFolkeregistrert: true,
                },
            ],
            endringAvOpplysningerBegrunnelse: '',
        },
        utbetalingsperioder: [
            lagUtbetalingsperiode({
                utbetalingsperiodeDetaljer: [
                    lagUtbetalingsperiodeDetalj({ person: søker }),
                    lagUtbetalingsperiodeDetalj({ person: eldsteBarn }),
                    lagUtbetalingsperiodeDetalj({ person: yngsteBarn }),
                ],
            }),
        ],
        brevmottakere: [
            lagBrevmottakerBehandling({
                type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE,
                navn: 'Ekte Mottaker',
                adresselinje1: 'Ekte mottakergate 1',
                adresselinje2: 'Ekte mottakergate 2',
            }),
        ],
    });
}

describe('useHentBehandling', () => {
    test('skal vente på ferskt behandlingssteg ved gjenåpning av en nylig besøkt behandling', async () => {
        const behandling = lagBehandling({ steg: BehandlingSteg.REGISTRERE_SØKNAD });
        const queryClient = lagQueryClient();
        const queryKey = HentBehandlingQueryKeyFactory.behandling(behandling.behandlingId);

        mockHentBehandling(behandling);

        const førsteBesøk = renderUseHentBehandling({ behandlingId: behandling.behandlingId, queryClient });

        await waitFor(() => expect(førsteBesøk.result.current.isSuccess).toBe(true));
        expect(førsteBesøk.result.current.data?.steg).toBe(BehandlingSteg.REGISTRERE_SØKNAD);
        expect(queryClient.getQueryData(queryKey)).toEqual(behandling);

        førsteBesøk.unmount();
        await waitFor(() => expect(queryClient.getQueryData(queryKey)).toBeUndefined());

        mockHentBehandling({ ...behandling, steg: BehandlingSteg.VILKÅRSVURDERING });

        const gjenåpnet = renderUseHentBehandling({ behandlingId: behandling.behandlingId, queryClient });

        expect(gjenåpnet.result.current.isPending).toBe(true);
        expect(gjenåpnet.result.current.data).toBeUndefined();
        await waitFor(() => expect(gjenåpnet.result.current.isSuccess).toBe(true));
        expect(gjenåpnet.result.current.data?.steg).toBe(BehandlingSteg.VILKÅRSVURDERING);
    });

    test('skal hente behandlingen med GET når saksbehandler ikke er beslutter', async () => {
        const behandling = lagBehandling();
        mockHentBehandling(behandling);

        const { result } = renderUseHentBehandling({
            behandlingId: behandling.behandlingId,
            saksbehandler: lagSaksbehandler(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(behandling);
    });

    test('skal oppdatere valutakurs med PUT når saksbehandler er beslutter', async () => {
        const behandling = lagBehandling();
        server.use(
            http.put(`/familie-ba-sak/api/behandlinger/${behandling.behandlingId}/oppdatert-valutakurs`, () =>
                HttpResponse.json(byggSuksessRessurs(behandling))
            )
        );

        const { result } = renderUseHentBehandling({
            behandlingId: behandling.behandlingId,
            saksbehandler: lagSaksbehandler({ groups: [BESLUTTER_GRUPPE] }),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(behandling);
    });

    test('skal ikke hente behandling når behandlingId mangler', () => {
        const { result } = renderUseHentBehandling({ behandlingId: undefined });

        expect(result.current.isPending).toBe(true);
        expect(result.current.fetchStatus).toBe('idle');
    });

    test('skal obfuskere persondata uten å endre behandlingen i cachen', async () => {
        const behandling = lagBehandlingMedPersondata();
        const queryClient = lagQueryClient();
        mockHentBehandling(behandling);

        const { result } = renderUseHentBehandling({
            behandlingId: behandling.behandlingId,
            queryClient,
            saksbehandler: lagSaksbehandler({ groups: [VEILEDER_GRUPPE] }),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        const obfuskert = result.current.data;

        expect(obfuskert?.personer.map(person => person.navn)).toEqual([
            '[1] Barn Barnesen',
            '[2] Barn Barnesen',
            'Søker Søkersen',
        ]);
        expect(obfuskert?.personer[2].registerhistorikk).toEqual(
            expect.objectContaining({
                bostedsadresse: [{ verdi: 'Bostedsadresse 1' }, { verdi: 'Bostedsadresse 2' }],
                oppholdsadresse: [{ verdi: 'Oppholdsadresse 1' }],
                deltBosted: [{ verdi: 'Deltbostedsadresse 1' }],
                dødsboadresse: [{ verdi: 'Dødsbosadresse 1' }],
            })
        );
        expect(obfuskert?.søknadsgrunnlag?.barnaMedOpplysninger.map(barn => [barn.ident, barn.navn])).toEqual([
            ['2', '[1] Barn Barnesen'],
            ['1', '[2] Barn Barnesen'],
        ]);
        expect(obfuskert?.utbetalingsperioder[0].utbetalingsperiodeDetaljer.map(detalj => detalj.person.navn)).toEqual([
            '[1] Barn Barnesen',
            '[2] Barn Barnesen',
            'Søker Søkersen',
        ]);
        expect(obfuskert?.brevmottakere[0]).toEqual(
            expect.objectContaining({
                navn: 'Bruker med utenlandsk adresse',
                adresselinje1: 'Mottakerveien 1',
                adresselinje2: undefined,
            })
        );

        expect(queryClient.getQueryData(HentBehandlingQueryKeyFactory.behandling(behandling.behandlingId))).toEqual(
            behandling
        );
    });

    test('skal ikke obfuskere persondata når saksbehandler har skrivetilgang', async () => {
        const behandling = lagBehandlingMedPersondata();
        mockHentBehandling(behandling);

        const { result } = renderUseHentBehandling({
            behandlingId: behandling.behandlingId,
            saksbehandler: lagSaksbehandler(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(behandling);
    });

    test('skal ikke obfuskere persondata når featuretoggle er skrudd av', async () => {
        const behandling = lagBehandlingMedPersondata();
        mockHentBehandling(behandling);

        const { result } = renderUseHentBehandling({
            behandlingId: behandling.behandlingId,
            saksbehandler: lagSaksbehandler({ groups: [VEILEDER_GRUPPE] }),
            featureToggles: { ...skruPåAlleToggles(), [FeatureToggle.skalObfuskereData]: false },
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(behandling);
    });
});
