import { renderHook } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { BehandlingSteg, BehandlingStegStatus, BehandlingÅrsak } from '@typer/behandling';
import type { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

import { useErViPåUgyldigSideForBehandling } from './useErViPåUgyldigSideForBehandling';

function lagWrapper(pathname: string) {
    return ({ children }: PropsWithChildren) => <MemoryRouter initialEntries={[{ pathname }]}>{children}</MemoryRouter>;
}

describe('useErViPåUgyldigSideForBehandling', () => {
    test('skal returnere true når saksbehandler er på en side som er skjult for behandlingen', () => {
        const behandling = lagBehandling({
            årsak: BehandlingÅrsak.NYE_OPPLYSNINGER,
            steg: BehandlingSteg.VILKÅRSVURDERING,
        });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/registrer-soknad'),
        });

        expect(result.current).toBe(true);
    });

    test('skal returnere true når saksbehandler er på et steg etter behandlingens steg', () => {
        const behandling = lagBehandling({ steg: BehandlingSteg.VILKÅRSVURDERING });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/vedtak'),
        });

        expect(result.current).toBe(true);
    });

    test('skal returnere true når saksbehandler er på en udefinert fagsakside', () => {
        const behandling = lagBehandling({ steg: BehandlingSteg.VILKÅRSVURDERING });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/finnes-ikke'),
        });

        expect(result.current).toBe(true);
    });

    test('skal returnere true når behandlingens steg ikke har en egen side', () => {
        const behandling = lagBehandling({ steg: BehandlingSteg.REGISTRERE_PERSONGRUNNLAG });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/vilkaarsvurdering'),
        });

        expect(result.current).toBe(true);
    });

    test('skal returnere true når siden for behandlingens steg er skjult for behandlingen', () => {
        const behandling = lagBehandling({
            årsak: BehandlingÅrsak.NYE_OPPLYSNINGER,
            steg: BehandlingSteg.REGISTRERE_SØKNAD,
        });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/vilkaarsvurdering'),
        });

        expect(result.current).toBe(true);
    });

    test('skal returnere false når saksbehandler er på behandlingens steg', () => {
        const behandling = lagBehandling({ steg: BehandlingSteg.VILKÅRSVURDERING });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/vilkaarsvurdering'),
        });

        expect(result.current).toBe(false);
    });

    test('skal returnere false når saksbehandler er på et tidligere steg', () => {
        const behandling = lagBehandling({ steg: BehandlingSteg.VILKÅRSVURDERING });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/registrer-soknad'),
        });

        expect(result.current).toBe(false);
    });

    test('skal returnere true når saksbehandler er på registrer søknad og institusjonssaken er på registrering av institusjon', () => {
        const behandling = lagBehandling({
            årsak: BehandlingÅrsak.SØKNAD,
            steg: BehandlingSteg.REGISTRERE_INSTITUSJON,
            stegTilstand: [
                {
                    behandlingSteg: BehandlingSteg.REGISTRERE_INSTITUSJON,
                    behandlingStegStatus: BehandlingStegStatus.IKKE_UTFØRT,
                },
            ],
        });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/registrer-soknad'),
        });

        expect(result.current).toBe(true);
    });

    test('skal returnere false når saksbehandler er på registrer institusjon og institusjonssaken er på registrering av søknad', () => {
        const behandling = lagBehandling({
            årsak: BehandlingÅrsak.SØKNAD,
            steg: BehandlingSteg.REGISTRERE_SØKNAD,
            stegTilstand: [
                {
                    behandlingSteg: BehandlingSteg.REGISTRERE_INSTITUSJON,
                    behandlingStegStatus: BehandlingStegStatus.UTFØRT,
                },
                {
                    behandlingSteg: BehandlingSteg.REGISTRERE_SØKNAD,
                    behandlingStegStatus: BehandlingStegStatus.IKKE_UTFØRT,
                },
            ],
        });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/registrer-institusjon'),
        });

        expect(result.current).toBe(false);
    });

    test('skal returnere true når saksbehandler ikke er på en side', () => {
        const behandling = lagBehandling({ steg: BehandlingSteg.VILKÅRSVURDERING });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1'),
        });

        expect(result.current).toBe(true);
    });

    test('skal returnere true når saksbehandler er på en underside av behandlingens steg', () => {
        const behandling = lagBehandling({ steg: BehandlingSteg.VILKÅRSVURDERING });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/vilkaarsvurdering/underside'),
        });

        expect(result.current).toBe(true);
    });

    test('skal returnere true når behandlingens steg ligger under et ukjent segment i stien', () => {
        const behandling = lagBehandling({ steg: BehandlingSteg.VILKÅRSVURDERING });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/old/vilkaarsvurdering'),
        });

        expect(result.current).toBe(true);
    });

    test('skal returnere false når saksbehandler er på vedtak og behandlingen er forbi vedtakssteget', () => {
        const behandling = lagBehandling({ steg: BehandlingSteg.BESLUTTE_VEDTAK });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/vedtak'),
        });

        expect(result.current).toBe(false);
    });

    test('skal returnere true når saksbehandler er på vedtak i en satsendring', () => {
        const behandling = lagBehandling({
            årsak: BehandlingÅrsak.SATSENDRING,
            steg: BehandlingSteg.BESLUTTE_VEDTAK,
        });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/vedtak'),
        });

        expect(result.current).toBe(true);
    });

    test('skal returnere false når saksbehandler er på simulering i en satsendring forbi vedtakssteget', () => {
        const behandling = lagBehandling({
            årsak: BehandlingÅrsak.SATSENDRING,
            steg: BehandlingSteg.BESLUTTE_VEDTAK,
        });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/simulering'),
        });

        expect(result.current).toBe(false);
    });

    test('skal returnere true når saksbehandler er på simulering i en automatisk satsendring', () => {
        const behandling = lagBehandling({
            årsak: BehandlingÅrsak.SATSENDRING,
            skalBehandlesAutomatisk: true,
            steg: BehandlingSteg.BESLUTTE_VEDTAK,
        });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/simulering'),
        });

        expect(result.current).toBe(true);
    });

    test('skal returnere false når saksbehandler er på behandlingsresultat i en automatisk satsendring', () => {
        const behandling = lagBehandling({
            årsak: BehandlingÅrsak.SATSENDRING,
            skalBehandlesAutomatisk: true,
            steg: BehandlingSteg.BESLUTTE_VEDTAK,
        });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/tilkjent-ytelse'),
        });

        expect(result.current).toBe(false);
    });

    test('skal returnere false når saksbehandler er på filtreringsregler i en fødselshendelse', () => {
        const behandling = lagBehandling({
            årsak: BehandlingÅrsak.FØDSELSHENDELSE,
            steg: BehandlingSteg.VILKÅRSVURDERING,
        });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/filtreringsregler'),
        });

        expect(result.current).toBe(false);
    });

    test('skal returnere true når saksbehandler er på filtreringsregler i en søknadsbehandling', () => {
        const behandling = lagBehandling({
            årsak: BehandlingÅrsak.SØKNAD,
            steg: BehandlingSteg.VILKÅRSVURDERING,
        });

        const { result } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/filtreringsregler'),
        });

        expect(result.current).toBe(true);
    });

    test('skal bruke steget behandlingen ble henlagt på for henlagte behandlinger', () => {
        const behandling = lagBehandling({
            steg: BehandlingSteg.BEHANDLING_AVSLUTTET,
            stegTilstand: [
                {
                    behandlingSteg: BehandlingSteg.VILKÅRSVURDERING,
                    behandlingStegStatus: BehandlingStegStatus.IKKE_UTFØRT,
                },
                {
                    behandlingSteg: BehandlingSteg.HENLEGG_BEHANDLING,
                    behandlingStegStatus: BehandlingStegStatus.UTFØRT,
                },
            ],
        });

        const { result: resultVilkårsvurdering } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/vilkaarsvurdering'),
        });
        const { result: resultVedtak } = renderHook(() => useErViPåUgyldigSideForBehandling(behandling), {
            wrapper: lagWrapper('/fagsak/1/1/vedtak'),
        });

        expect(resultVilkårsvurdering.current).toBe(false);
        expect(resultVedtak.current).toBe(true);
    });
});
