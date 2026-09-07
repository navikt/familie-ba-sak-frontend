import { useBehandling } from '@hooks/useBehandling';
import { renderHook } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { BehandlingResultat } from '@typer/behandling';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useErAutomatiskBehandlingFortsattInnvilget } from './useErAutomatiskBehandlingFortsattInnvilget';

vi.mock('@hooks/useBehandling');

const mockUseBehandling = vi.mocked(useBehandling);

beforeEach(() => {
    vi.resetAllMocks();
    mockUseBehandling.mockReturnValue(lagBehandling());
});

describe('useErAutomatiskBehandlingFortsattInnvilget', () => {
    it('returnerer true når behandlingen er automatisk og resultatet er fortsatt innvilget', () => {
        mockUseBehandling.mockReturnValue(
            lagBehandling({
                resultat: BehandlingResultat.FORTSATT_INNVILGET,
                skalBehandlesAutomatisk: true,
            })
        );

        const { result } = renderHook(() => useErAutomatiskBehandlingFortsattInnvilget());

        expect(result.current).toBe(true);
    });

    it('returnerer false når behandlingen ikke er automatisk selv om resultatet er fortsatt innvilget', () => {
        mockUseBehandling.mockReturnValue(
            lagBehandling({
                resultat: BehandlingResultat.FORTSATT_INNVILGET,
                skalBehandlesAutomatisk: false,
            })
        );

        const { result } = renderHook(() => useErAutomatiskBehandlingFortsattInnvilget());

        expect(result.current).toBe(false);
    });

    it('returnerer false når behandlingen er automatisk men resultatet ikke er fortsatt innvilget', () => {
        mockUseBehandling.mockReturnValue(
            lagBehandling({
                resultat: BehandlingResultat.INNVILGET,
                skalBehandlesAutomatisk: true,
            })
        );

        const { result } = renderHook(() => useErAutomatiskBehandlingFortsattInnvilget());

        expect(result.current).toBe(false);
    });
});
