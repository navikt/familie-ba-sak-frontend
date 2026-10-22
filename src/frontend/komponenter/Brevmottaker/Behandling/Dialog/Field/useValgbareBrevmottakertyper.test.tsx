import { useBehandling } from '@hooks/useBehandling';
import { renderHook } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagBrevmottakerBehandling } from '@testutils/testdata/brevmottakerTestdata';
import { type BrevmottakerBehandling, Brevmottakertype } from '@typer/brevmottaker';
import { describe, expect, test, vi } from 'vitest';
import { useValgbareBrevmottakertyper } from './useValgbareBrevmottakertyper';

vi.mock('@hooks/useBehandling');

function renderUseValgbareBrevmottakertyper(brevmottakere: BrevmottakerBehandling[] = []) {
    vi.mocked(useBehandling).mockReturnValue(lagBehandling({ brevmottakere }));
    return renderHook(() => useValgbareBrevmottakertyper());
}

describe('useValgbareBrevmottakertyper', () => {
    test('skal returnere alle brevmottakertyper når det ikke finnes brevmottakere', () => {
        const { result } = renderUseValgbareBrevmottakertyper();

        expect(result.current).toEqual([
            Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE,
            Brevmottakertype.FULLMEKTIG,
            Brevmottakertype.VERGE,
            Brevmottakertype.DØDSBO,
        ]);
    });

    test('skal returnere tom liste når dødsbo finnes fra før', () => {
        const { result } = renderUseValgbareBrevmottakertyper([
            lagBrevmottakerBehandling({ type: Brevmottakertype.DØDSBO }),
        ]);

        expect(result.current).toEqual([]);
    });

    test('skal returnere fullmektig og verge når bruker med utenlandsk adresse finnes fra før', () => {
        const { result } = renderUseValgbareBrevmottakertyper([
            lagBrevmottakerBehandling({ type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE }),
        ]);

        expect(result.current).toEqual([Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE]);
    });

    test.each([Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE])(
        'skal kun returnere bruker med utenlandsk adresse når %s finnes fra før',
        (eksisterendeType: Brevmottakertype) => {
            const { result } = renderUseValgbareBrevmottakertyper([
                lagBrevmottakerBehandling({ type: eksisterendeType }),
            ]);

            expect(result.current).toEqual([Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE]);
        }
    );

    test.each([Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE])(
        'skal returnere tom liste når både bruker med utenlandsk adresse og %s finnes fra før',
        (eksisterendeType: Brevmottakertype) => {
            const { result } = renderUseValgbareBrevmottakertyper([
                lagBrevmottakerBehandling({ id: 1, type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE }),
                lagBrevmottakerBehandling({ id: 2, type: eksisterendeType }),
            ]);

            expect(result.current).toEqual([]);
        }
    );
});
