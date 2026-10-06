import { BrevmottakereFagsakProvider, useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { act, renderHook } from '@testing-library/react';
import { lagBrevmottakerFagsak } from '@testutils/testdata/brevmottakerTestdata';
import { type BrevmottakerFagsak, Brevmottakertype } from '@typer/brevmottaker';
import type { PropsWithChildren } from 'react';
import { describe, expect, test } from 'vitest';
import { useValgbareBrevmottakertyper } from './useValgbareBrevmottakertyper';

function lagWrapper(brevmottakere: BrevmottakerFagsak[] = []) {
    return ({ children }: PropsWithChildren) => (
        <BrevmottakereFagsakProvider initielleBrevmottakere={brevmottakere}>{children}</BrevmottakereFagsakProvider>
    );
}

function renderUseValgbareBrevmottakertyper(brevmottakere: BrevmottakerFagsak[] = []) {
    return renderHook(
        () => ({
            valgbareBrevmottakertyper: useValgbareBrevmottakertyper(),
            context: useBrevmottakereFagsakContext(),
        }),
        { wrapper: lagWrapper(brevmottakere) }
    );
}

describe('useValgbareBrevmottakertyper', () => {
    test('skal returnere alle brevmottakertyper bortsett fra dødsbo når det ikke finnes brevmottakere', () => {
        const { result } = renderUseValgbareBrevmottakertyper();

        expect(result.current.valgbareBrevmottakertyper).toEqual([
            Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE,
            Brevmottakertype.FULLMEKTIG,
            Brevmottakertype.VERGE,
        ]);
    });

    test('skal aldri returnere dødsbo', () => {
        const { result } = renderUseValgbareBrevmottakertyper();

        expect(result.current.valgbareBrevmottakertyper).not.toContain(Brevmottakertype.DØDSBO);
    });

    test('skal returnere fullmektig og verge når bruker med utenlandsk adresse finnes fra før', () => {
        const { result } = renderUseValgbareBrevmottakertyper([
            lagBrevmottakerFagsak({ type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE }),
        ]);

        expect(result.current.valgbareBrevmottakertyper).toEqual([Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE]);
    });

    test.each([Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE])(
        'skal kun returnere bruker med utenlandsk adresse når %s finnes fra før',
        (eksisterendeType: Brevmottakertype) => {
            const { result } = renderUseValgbareBrevmottakertyper([lagBrevmottakerFagsak({ type: eksisterendeType })]);

            expect(result.current.valgbareBrevmottakertyper).toEqual([Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE]);
        }
    );

    test.each([Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE])(
        'skal returnere tom liste når både bruker med utenlandsk adresse og %s finnes fra før',
        (eksisterendeType: Brevmottakertype) => {
            const { result } = renderUseValgbareBrevmottakertyper([
                lagBrevmottakerFagsak({ type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE }),
                lagBrevmottakerFagsak({ type: eksisterendeType }),
            ]);

            expect(result.current.valgbareBrevmottakertyper).toEqual([]);
        }
    );

    test('skal oppdatere valgbare brevmottakertyper når en brevmottaker legges til', () => {
        const { result } = renderUseValgbareBrevmottakertyper();

        act(() => {
            result.current.context.leggTilBrevmottaker(lagBrevmottakerFagsak({ type: Brevmottakertype.VERGE }));
        });

        expect(result.current.valgbareBrevmottakertyper).toEqual([Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE]);
    });

    test('skal oppdatere valgbare brevmottakertyper når en brevmottaker fjernes', () => {
        const fullmektig = lagBrevmottakerFagsak({ type: Brevmottakertype.FULLMEKTIG });
        const { result } = renderUseValgbareBrevmottakertyper([fullmektig]);

        act(() => {
            result.current.context.slettBrevmottaker(fullmektig);
        });

        expect(result.current.valgbareBrevmottakertyper).toEqual([
            Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE,
            Brevmottakertype.FULLMEKTIG,
            Brevmottakertype.VERGE,
        ]);
    });

    test('skal kaste feil når hooken brukes utenfor BrevmottakereFagsakProvider', () => {
        expect(() => renderHook(() => useValgbareBrevmottakertyper())).toThrow(
            'useBrevmottakereFagsakContext må brukes innenfor en BrevmottakereFagsakProvider'
        );
    });
});
