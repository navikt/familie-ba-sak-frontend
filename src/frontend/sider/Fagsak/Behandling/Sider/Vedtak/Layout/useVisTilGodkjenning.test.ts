import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { renderHook } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { BehandlingStatus } from '@typer/behandling';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useVisTilGodkjenning } from './useVisTilGodkjenning';

vi.mock('@hooks/useBehandling');
vi.mock('@hooks/useErLesevisning');

const mockUseBehandling = vi.mocked(useBehandling);
const mockUseErLesevisning = vi.mocked(useErLesevisning);

beforeEach(() => {
    vi.resetAllMocks();
    mockUseBehandling.mockReturnValue(lagBehandling({ status: BehandlingStatus.UTREDES }));
    mockUseErLesevisning.mockReturnValue(false);
});

describe('useVisTilGodkjenning', () => {
    it('returnerer true når behandlingen utredes og man ikke er i lesevisning', () => {
        const { result } = renderHook(() => useVisTilGodkjenning());

        expect(result.current).toBe(true);
    });

    it('returnerer false når man er i lesevisning', () => {
        mockUseErLesevisning.mockReturnValue(true);

        const { result } = renderHook(() => useVisTilGodkjenning());

        expect(result.current).toBe(false);
    });

    it('returnerer false når behandlingen ikke utredes', () => {
        mockUseBehandling.mockReturnValue(lagBehandling({ status: BehandlingStatus.AVSLUTTET }));

        const { result } = renderHook(() => useVisTilGodkjenning());

        expect(result.current).toBe(false);
    });
});
