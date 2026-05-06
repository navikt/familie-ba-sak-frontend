import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { renderHook } from '@testing-library/react';
import { lagSaksbehandler } from '@testutils/testdata/saksbehandlerTestdata';
import { FeatureToggle } from '@typer/featureToggles';
import { describe, test, expect, vi, beforeEach } from 'vitest';

import { useSkalObfuskereData } from './useSkalObfuskereData';

vi.mock('@hooks/useFeatureToggles');
vi.mock('@hooks/useSaksbehandler');

const mockUseFeatureToggles = vi.mocked(useFeatureToggles);
const mockUseSaksbehandler = vi.mocked(useSaksbehandler);

describe('useSkalObfuskereData', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('returnerer true når toggle er aktivert og bruker ikke har skrivetilgang', () => {
        // Arrange
        mockUseFeatureToggles.mockReturnValue({ [FeatureToggle.skalObfuskereData]: true });
        mockUseSaksbehandler.mockReturnValue(lagSaksbehandler({ harSkrivetilgang: false }));

        // Act
        const { result } = renderHook(() => useSkalObfuskereData());

        // Assert
        expect(result.current).toBe(true);
    });

    test('returnerer false når toggle er aktivert men bruker har skrivetilgang', () => {
        // Arrange
        mockUseFeatureToggles.mockReturnValue({ [FeatureToggle.skalObfuskereData]: true });
        mockUseSaksbehandler.mockReturnValue(lagSaksbehandler({ harSkrivetilgang: true }));

        // Act
        const { result } = renderHook(() => useSkalObfuskereData());

        // Assert
        expect(result.current).toBe(false);
    });

    test('returnerer false når toggle er deaktivert og bruker ikke har skrivetilgang', () => {
        // Arrange
        mockUseFeatureToggles.mockReturnValue({ [FeatureToggle.skalObfuskereData]: false });
        mockUseSaksbehandler.mockReturnValue(lagSaksbehandler({ harSkrivetilgang: false }));

        // Act
        const { result } = renderHook(() => useSkalObfuskereData());

        // Assert
        expect(result.current).toBe(false);
    });

    test('returnerer false når toggle er deaktivert og bruker har skrivetilgang', () => {
        // Arrange
        mockUseFeatureToggles.mockReturnValue({ [FeatureToggle.skalObfuskereData]: false });
        mockUseSaksbehandler.mockReturnValue(lagSaksbehandler({ harSkrivetilgang: true }));

        // Act
        const { result } = renderHook(() => useSkalObfuskereData());

        // Assert
        expect(result.current).toBe(false);
    });
});
