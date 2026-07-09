import type { PropsWithChildren } from 'react';

import { KontrollertStatus, SideId, type Kontrollside } from '@sider/Fagsak/Behandling/Sider/sider';
import { renderHook, act } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagSaksbehandler } from '@testutils/testdata/saksbehandlerTestdata';
import { BehandlerRolle, BehandlingStatus, BehandlingÅrsak } from '@typer/behandling';
import { describe, test, expect, beforeEach, vi } from 'vitest';

import { KontrollsiderProvider, useKontrollsiderContext } from './KontrollsiderContext';

const { useLocationMock, useBehandlingMock, useSaksbehandlerMock } = vi.hoisted(() => ({
    useLocationMock: vi.fn(),
    useBehandlingMock: vi.fn(),
    useSaksbehandlerMock: vi.fn(),
}));

vi.mock('@hooks/useBehandling', () => ({ useBehandling: useBehandlingMock }));
vi.mock('@hooks/useSaksbehandler', () => ({ useSaksbehandler: useSaksbehandlerMock }));
vi.mock('react-router', () => ({ useLocation: useLocationMock }));

function lagPathname(href: string) {
    return `/fagsak/123/321/${href}`;
}

function statusForSide(sider: Kontrollside[], id: SideId) {
    return sider.find(side => side.id === id)?.kontrollertStatus;
}

function renderHookWithProvider() {
    return renderHook(() => useKontrollsiderContext(), {
        wrapper: ({ children }: PropsWithChildren) => <KontrollsiderProvider>{children}</KontrollsiderProvider>,
    });
}

const defaultLocation = { pathname: lagPathname('vilkaarsvurdering') };

const defaultBehandling = lagBehandling({
    status: BehandlingStatus.FATTER_VEDTAK,
    endretAv: 'saksbehandler@nav.no',
    årsak: BehandlingÅrsak.SØKNAD,
    skalBehandlesAutomatisk: false,
});

const defaultSaksbehandler = lagSaksbehandler({
    rolle: BehandlerRolle.BESLUTTER,
    email: 'beslutter@nav.no',
});

beforeEach(() => {
    vi.clearAllMocks();
    useLocationMock.mockReturnValue(defaultLocation);
    useBehandlingMock.mockReturnValue(defaultBehandling);
    useSaksbehandlerMock.mockReturnValue(defaultSaksbehandler);
});

describe('KontrollbareSiderProvider', () => {
    describe('Initialisering av kontrollbare sider', () => {
        test('inneholder sidene som vises for behandlingen', () => {
            const { result } = renderHookWithProvider();

            expect(result.current.kontrollsider.map(side => side.id)).toEqual([
                SideId.REGISTRERE_SØKNAD,
                SideId.VILKÅRSVURDERING,
                SideId.BEHANDLINGRESULTAT,
                SideId.SIMULERING,
                SideId.VEDTAK,
            ]);
        });

        test('markerer den åpne siden som kontrollert ved mount', () => {
            const { result } = renderHookWithProvider();

            expect(statusForSide(result.current.kontrollsider, SideId.VILKÅRSVURDERING)).toBe(
                KontrollertStatus.KONTROLLERT
            );
        });

        test('lar øvrige sider være ikke kontrollert ved mount', () => {
            const { result } = renderHookWithProvider();

            expect(statusForSide(result.current.kontrollsider, SideId.BEHANDLINGRESULTAT)).toBe(
                KontrollertStatus.IKKE_KONTROLLERT
            );
            expect(statusForSide(result.current.kontrollsider, SideId.VEDTAK)).toBe(KontrollertStatus.IKKE_KONTROLLERT);
        });
    });

    describe('Tilgang til å kontrollere sider', () => {
        test('markerer ikke åpen side når saksbehandler ikke er beslutter', () => {
            useSaksbehandlerMock.mockReturnValue(lagSaksbehandler({ rolle: BehandlerRolle.SAKSBEHANDLER }));

            const { result } = renderHookWithProvider();

            expect(statusForSide(result.current.kontrollsider, SideId.VILKÅRSVURDERING)).toBe(
                KontrollertStatus.IKKE_KONTROLLERT
            );
        });

        test('markerer ikke åpen side når behandlingen ikke er til fatte vedtak', () => {
            useBehandlingMock.mockReturnValue(lagBehandling({ status: BehandlingStatus.UTREDES }));

            const { result } = renderHookWithProvider();

            expect(statusForSide(result.current.kontrollsider, SideId.VILKÅRSVURDERING)).toBe(
                KontrollertStatus.IKKE_KONTROLLERT
            );
        });

        test('markerer ikke åpen side når beslutter selv endret behandlingen', () => {
            useBehandlingMock.mockReturnValue(
                lagBehandling({ status: BehandlingStatus.FATTER_VEDTAK, endretAv: 'beslutter@nav.no' })
            );

            const { result } = renderHookWithProvider();

            expect(statusForSide(result.current.kontrollsider, SideId.VILKÅRSVURDERING)).toBe(
                KontrollertStatus.IKKE_KONTROLLERT
            );
        });

        test('markerer ikke besøkte sider når man ikke kan beslutte vedtak', () => {
            useSaksbehandlerMock.mockReturnValue(lagSaksbehandler({ rolle: BehandlerRolle.SAKSBEHANDLER }));

            const { result, rerender } = renderHookWithProvider();
            useLocationMock.mockReturnValue({ pathname: lagPathname('vedtak') });
            rerender();

            expect(statusForSide(result.current.kontrollsider, SideId.VEDTAK)).toBe(KontrollertStatus.IKKE_KONTROLLERT);
        });
    });

    describe('Markering av besøkte sider som kontrollert', () => {
        test('markerer en side som kontrollert når man navigerer til den', () => {
            const { result, rerender } = renderHookWithProvider();
            useLocationMock.mockReturnValue({ pathname: lagPathname('vedtak') });
            rerender();

            expect(statusForSide(result.current.kontrollsider, SideId.VEDTAK)).toBe(KontrollertStatus.KONTROLLERT);
        });

        test('beholder tidligere besøkte sider som kontrollert ved videre navigering', () => {
            const { result, rerender } = renderHookWithProvider();
            useLocationMock.mockReturnValue({ pathname: lagPathname('tilkjent-ytelse') });
            rerender();
            useLocationMock.mockReturnValue({ pathname: lagPathname('vedtak') });
            rerender();

            expect(statusForSide(result.current.kontrollsider, SideId.VILKÅRSVURDERING)).toBe(
                KontrollertStatus.KONTROLLERT
            );
            expect(statusForSide(result.current.kontrollsider, SideId.BEHANDLINGRESULTAT)).toBe(
                KontrollertStatus.KONTROLLERT
            );
            expect(statusForSide(result.current.kontrollsider, SideId.VEDTAK)).toBe(KontrollertStatus.KONTROLLERT);
        });

        test('markerer ingen side når gjeldende href ikke matcher noen side', () => {
            const { result, rerender } = renderHookWithProvider();
            useLocationMock.mockReturnValue({ pathname: lagPathname('finnes-ikke') });
            rerender();

            expect(statusForSide(result.current.kontrollsider, SideId.BEHANDLINGRESULTAT)).toBe(
                KontrollertStatus.IKKE_KONTROLLERT
            );
            expect(statusForSide(result.current.kontrollsider, SideId.VEDTAK)).toBe(KontrollertStatus.IKKE_KONTROLLERT);
        });
    });

    describe('Markering av sider som mangler kontroll', () => {
        test('setter ikke-kontrollerte sider til mangler kontroll', () => {
            const { result } = renderHookWithProvider();

            act(() => result.current.settIkkeKontrollerteSiderTilManglerKontroll());

            expect(statusForSide(result.current.kontrollsider, SideId.BEHANDLINGRESULTAT)).toBe(
                KontrollertStatus.MANGLER_KONTROLL
            );
            expect(statusForSide(result.current.kontrollsider, SideId.VEDTAK)).toBe(KontrollertStatus.MANGLER_KONTROLL);
        });

        test('lar kontrollerte sider være uendret', () => {
            const { result } = renderHookWithProvider();

            act(() => result.current.settIkkeKontrollerteSiderTilManglerKontroll());

            expect(statusForSide(result.current.kontrollsider, SideId.VILKÅRSVURDERING)).toBe(
                KontrollertStatus.KONTROLLERT
            );
        });

        test('gjør ingenting når man ikke kan beslutte vedtak', () => {
            useSaksbehandlerMock.mockReturnValue(lagSaksbehandler({ rolle: BehandlerRolle.SAKSBEHANDLER }));

            const { result } = renderHookWithProvider();

            act(() => result.current.settIkkeKontrollerteSiderTilManglerKontroll());

            result.current.kontrollsider.forEach(side =>
                expect(side.kontrollertStatus).toBe(KontrollertStatus.IKKE_KONTROLLERT)
            );
        });
    });

    describe('Synkronisering når sidelisten endres', () => {
        test('legger til nye sider som ikke kontrollert', () => {
            useBehandlingMock.mockReturnValue(
                lagBehandling({ status: BehandlingStatus.FATTER_VEDTAK, skalBehandlesAutomatisk: true })
            );

            const { result, rerender } = renderHookWithProvider();

            expect(statusForSide(result.current.kontrollsider, SideId.SIMULERING)).toBeUndefined();

            useBehandlingMock.mockReturnValue(
                lagBehandling({ status: BehandlingStatus.FATTER_VEDTAK, skalBehandlesAutomatisk: false })
            );
            rerender();

            expect(statusForSide(result.current.kontrollsider, SideId.SIMULERING)).toBe(
                KontrollertStatus.IKKE_KONTROLLERT
            );
        });

        test('fjerner sider som ikke lenger vises', () => {
            const { result, rerender } = renderHookWithProvider();

            expect(result.current.kontrollsider.map(side => side.id)).toContain(SideId.SIMULERING);
            expect(result.current.kontrollsider).toHaveLength(5);

            useBehandlingMock.mockReturnValue(
                lagBehandling({ status: BehandlingStatus.FATTER_VEDTAK, skalBehandlesAutomatisk: true })
            );
            rerender();

            expect(result.current.kontrollsider.map(side => side.id)).not.toContain(SideId.SIMULERING);
            expect(result.current.kontrollsider).toHaveLength(4);
        });

        test('bevarer kontrollert-status for sider som fortsatt vises', () => {
            useBehandlingMock.mockReturnValue(
                lagBehandling({
                    status: BehandlingStatus.FATTER_VEDTAK,
                    endretAv: 'saksbehandler@nav.no',
                    skalBehandlesAutomatisk: true,
                })
            );

            const { result, rerender } = renderHookWithProvider();

            expect(statusForSide(result.current.kontrollsider, SideId.VILKÅRSVURDERING)).toBe(
                KontrollertStatus.KONTROLLERT
            );

            useBehandlingMock.mockReturnValue(
                lagBehandling({ status: BehandlingStatus.FATTER_VEDTAK, skalBehandlesAutomatisk: false })
            );
            rerender();

            expect(statusForSide(result.current.kontrollsider, SideId.VILKÅRSVURDERING)).toBe(
                KontrollertStatus.KONTROLLERT
            );
        });

        test('bytter ut sider når årsak endrer hvilke som vises, ved samme antall', () => {
            const { result, rerender } = renderHookWithProvider();

            expect(result.current.kontrollsider.map(side => side.id)).toContain(SideId.REGISTRERE_SØKNAD);

            useBehandlingMock.mockReturnValue(
                lagBehandling({
                    status: BehandlingStatus.FATTER_VEDTAK,
                    årsak: BehandlingÅrsak.FØDSELSHENDELSE,
                })
            );
            rerender();

            const ider = result.current.kontrollsider.map(side => side.id);
            expect(ider).not.toContain(SideId.REGISTRERE_SØKNAD);
            expect(ider).toContain(SideId.FILTRERING_FØDSELSHENDELSER);
            expect(statusForSide(result.current.kontrollsider, SideId.VILKÅRSVURDERING)).toBe(
                KontrollertStatus.KONTROLLERT
            );
        });

        test('markerer en nylig tillagt side som kontrollert dersom den er den åpne siden', () => {
            useLocationMock.mockReturnValue({ pathname: lagPathname('simulering') });
            useBehandlingMock.mockReturnValue(
                lagBehandling({ status: BehandlingStatus.FATTER_VEDTAK, skalBehandlesAutomatisk: true })
            );

            const { result, rerender } = renderHookWithProvider();

            expect(result.current.kontrollsider.find(side => side.id === SideId.SIMULERING)).toBeUndefined();

            useBehandlingMock.mockReturnValue(
                lagBehandling({
                    status: BehandlingStatus.FATTER_VEDTAK,
                    endretAv: 'saksbehandler@nav.no',
                    skalBehandlesAutomatisk: false,
                })
            );
            rerender();

            expect(statusForSide(result.current.kontrollsider, SideId.SIMULERING)).toBe(KontrollertStatus.KONTROLLERT);
        });
    });

    describe('Bruk av context utenfor provider', () => {
        test('kaster feil når context brukes utenfor en provider', () => {
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

            expect(() => renderHook(() => useKontrollsiderContext())).toThrow(
                'useKontrollsiderContext må brukes innenfor en KontrollsiderProvider.'
            );

            consoleError.mockRestore();
        });
    });
});
