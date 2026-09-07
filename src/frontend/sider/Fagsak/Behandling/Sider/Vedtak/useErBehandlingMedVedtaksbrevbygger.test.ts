import { useBehandling } from '@hooks/useBehandling';
import { renderHook } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { BehandlingStatus, BehandlingÅrsak } from '@typer/behandling';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useErBehandlingMedVedtaksbrevbygger } from './useErBehandlingMedVedtaksbrevbygger';

vi.mock('@hooks/useBehandling');

const mockUseBehandling = vi.mocked(useBehandling);

beforeEach(() => {
    vi.resetAllMocks();
    mockUseBehandling.mockReturnValue(lagBehandling());
});

describe('useErBehandlingMedVedtaksbrevbygger', () => {
    it('returnerer false når årsak er dødsfall bruker', () => {
        mockUseBehandling.mockReturnValue(
            lagBehandling({
                årsak: BehandlingÅrsak.DØDSFALL_BRUKER,
                status: BehandlingStatus.UTREDES,
            })
        );

        const { result } = renderHook(() => useErBehandlingMedVedtaksbrevbygger());

        expect(result.current).toBe(false);
    });

    it('returnerer false når status er avsluttet', () => {
        mockUseBehandling.mockReturnValue(
            lagBehandling({
                årsak: BehandlingÅrsak.SØKNAD,
                status: BehandlingStatus.AVSLUTTET,
            })
        );

        const { result } = renderHook(() => useErBehandlingMedVedtaksbrevbygger());

        expect(result.current).toBe(false);
    });

    it('returnerer true når årsak ikke er dødsfall bruker og status ikke er avsluttet', () => {
        mockUseBehandling.mockReturnValue(
            lagBehandling({
                årsak: BehandlingÅrsak.SØKNAD,
                status: BehandlingStatus.UTREDES,
            })
        );

        const { result } = renderHook(() => useErBehandlingMedVedtaksbrevbygger());

        expect(result.current).toBe(true);
    });
});
