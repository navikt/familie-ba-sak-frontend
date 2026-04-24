import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useSaksbehandler } from './useSaksbehandler';
import { useSaksbehandlerContext } from '../context/SaksbehandlerContext';
import { lagSaksbehandler } from '../testutils/testdata/saksbehandlerTestdata';
import { BehandlerRolle } from '../typer/behandling';

vi.mock('../context/SaksbehandlerContext', () => ({
    useSaksbehandlerContext: vi.fn(),
}));

describe('useSaksbehandler', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('skal hente saksbehandler', () => {
        // Arrange
        const saksbehandler = lagSaksbehandler();

        vi.mocked(useSaksbehandlerContext).mockReturnValue({ saksbehandler });

        // Act
        const { result } = renderHook(() => useSaksbehandler());

        // Assert
        expect(result.current.displayName).toBe('Sak Behandler');
        expect(result.current.email).toBe('saksbehandler@nav.no');
        expect(result.current.firstName).toBe('Sak');
        expect(result.current.groups).toStrictEqual(['d21e00a4-969d-4b28-8782-dc818abfae65']);
        expect(result.current.identifier).toBe('30987654321');
        expect(result.current.lastName).toBe('Behandler');
        expect(result.current.enhet).toBe('0001');
        expect(result.current.navIdent).toBe('A1');
        expect(result.current.rolle).toBe(BehandlerRolle.SAKSBEHANDLER);
        expect(result.current.harSkrivetilgang).toBe(true);
        expect(result.current.harSuperbrukertilgang).toBe(false);
    });
});
