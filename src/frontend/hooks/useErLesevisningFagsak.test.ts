import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { lagFagsak } from '../testutils/testdata/fagsakTestdata';
import { lagSaksbehandler } from '../testutils/testdata/saksbehandlerTestdata';
import { FagsakStatus } from '../typer/fagsak';
import { useErLesevisningFagsak } from './useErLesevisningFagsak';
import { useFagsak } from './useFagsak';
import { useSaksbehandler } from './useSaksbehandler';

vi.mock('./useSaksbehandler');
vi.mock('./useFagsak');

const mockUseSaksbehandler = vi.mocked(useSaksbehandler);
const mockUseFagsak = vi.mocked(useFagsak);

beforeEach(() => {
    vi.resetAllMocks();
    mockUseSaksbehandler.mockReturnValue(lagSaksbehandler());
    mockUseFagsak.mockReturnValue(lagFagsak());
});

describe('useErLesevisningFagsak', () => {
    it('returnerer true når fagsaken er låst', () => {
        mockUseFagsak.mockReturnValue(lagFagsak({ status: FagsakStatus.LÅST }));

        const { result } = renderHook(() => useErLesevisningFagsak());

        expect(result.current).toBe(true);
    });

    it('returnerer true når saksbehandler mangler skrivetilgang', () => {
        mockUseSaksbehandler.mockReturnValue(lagSaksbehandler({ harSkrivetilgang: false }));

        const { result } = renderHook(() => useErLesevisningFagsak());

        expect(result.current).toBe(true);
    });

    it('returnerer false når fagsaken ikke er låst og saksbehandler har skrivetilgang', () => {
        const { result } = renderHook(() => useErLesevisningFagsak());

        expect(result.current).toBe(false);
    });
});
