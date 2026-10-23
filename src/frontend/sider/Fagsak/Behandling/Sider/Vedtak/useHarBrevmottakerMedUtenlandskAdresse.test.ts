import { useBehandling } from '@hooks/useBehandling';
import { renderHook } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { Brevmottakertype } from '@typer/brevmottaker';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useHarBrevmottakerMedUtenlandskAdresse } from './useHarBrevmottakerMedUtenlandskAdresse';

vi.mock('@hooks/useBehandling');

const mockUseBehandling = vi.mocked(useBehandling);

beforeEach(() => {
    vi.resetAllMocks();
    mockUseBehandling.mockReturnValue(lagBehandling());
});

describe('useHarBrevmottakerMedUtenlandskAdresse', () => {
    it('returnerer false når det ikke finnes brevmottakere', () => {
        mockUseBehandling.mockReturnValue(lagBehandling({ brevmottakere: [] }));

        const { result } = renderHook(() => useHarBrevmottakerMedUtenlandskAdresse());

        expect(result.current).toBe(false);
    });

    it('returnerer false når ingen brevmottakere er bruker med utenlandsk adresse', () => {
        mockUseBehandling.mockReturnValue(
            lagBehandling({
                brevmottakere: [
                    {
                        id: 1,
                        type: Brevmottakertype.VERGE,
                        navn: 'Verge Vergesen',
                        adresselinje1: 'Vergeveien 1',
                        landkode: 'NO',
                    },
                ],
            })
        );

        const { result } = renderHook(() => useHarBrevmottakerMedUtenlandskAdresse());

        expect(result.current).toBe(false);
    });

    it('returnerer true når bruker har utenlandsk adresse blant brevmottakere', () => {
        mockUseBehandling.mockReturnValue(
            lagBehandling({
                brevmottakere: [
                    {
                        id: 1,
                        type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE,
                        navn: 'Ola Nordmann',
                        adresselinje1: 'Utlandsveien 1',
                        landkode: 'SE',
                    },
                ],
            })
        );

        const { result } = renderHook(() => useHarBrevmottakerMedUtenlandskAdresse());

        expect(result.current).toBe(true);
    });
});
