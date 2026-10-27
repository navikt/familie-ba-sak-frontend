import { BrevmottakereFagsakProvider, useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { act, renderHook } from '@testing-library/react';
import { lagBrevmottakerFagsak } from '@testutils/testdata/brevmottakerTestdata';
import { type BrevmottakerFagsak, Brevmottakertype } from '@typer/brevmottaker';
import type { PropsWithChildren } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { BrevmottakerField, type BrevmottakerTransformedFormValues } from '../Felles/Form/useBrevmottakerForm';
import { useBrevmottakerFormFagsak } from './useBrevmottakerFormFagsak';

const values: BrevmottakerTransformedFormValues = {
    [BrevmottakerField.BREVMOTTAKERTYPE]: Brevmottakertype.VERGE,
    [BrevmottakerField.NAVN]: 'Vera Verge',
    [BrevmottakerField.LAND]: 'NO',
    [BrevmottakerField.ADRESSELINJE_1]: 'Gate 1',
    [BrevmottakerField.ADRESSELINJE_2]: '',
    [BrevmottakerField.POSTNUMMER]: '0010',
    [BrevmottakerField.POSTSTED]: 'Oslo',
};

function renderUseBrevmottakerFormFagsak(initielleBrevmottakere: BrevmottakerFagsak[] = []) {
    const onSubmitSuccess = vi.fn();
    const { result } = renderHook(
        () => {
            const { onSubmit } = useBrevmottakerFormFagsak({ onSubmitSuccess });
            const { brevmottakere } = useBrevmottakereFagsakContext();
            return { onSubmit, brevmottakere };
        },
        {
            wrapper: ({ children }: PropsWithChildren) => (
                <BrevmottakereFagsakProvider initielleBrevmottakere={initielleBrevmottakere}>
                    {children}
                </BrevmottakereFagsakProvider>
            ),
        }
    );
    return { result, onSubmitSuccess };
}

describe('useBrevmottakerFormFagsak', () => {
    test('skal legge til brevmottakeren med en uuid og kalle onSubmitSuccess', async () => {
        const { result, onSubmitSuccess } = renderUseBrevmottakerFormFagsak();

        await act(() => result.current.onSubmit(values));

        expect(result.current.brevmottakere).toEqual([
            {
                uuid: expect.any(String),
                type: Brevmottakertype.VERGE,
                navn: 'Vera Verge',
                adresselinje1: 'Gate 1',
                adresselinje2: undefined,
                postnummer: '0010',
                poststed: 'Oslo',
                landkode: 'NO',
            },
        ]);
        expect(onSubmitSuccess).toHaveBeenCalledOnce();
    });

    test('skal beholde eksisterende brevmottakere og gi hver ny brevmottaker en unik uuid', async () => {
        const eksisterende = lagBrevmottakerFagsak({ type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE });
        const { result } = renderUseBrevmottakerFormFagsak([eksisterende]);

        await act(() => result.current.onSubmit(values));
        await act(() => result.current.onSubmit({ ...values, [BrevmottakerField.NAVN]: 'Viktor Verge' }));

        const [første, andre, tredje] = result.current.brevmottakere;
        expect(første).toBe(eksisterende);
        expect(andre.navn).toBe('Vera Verge');
        expect(tredje.navn).toBe('Viktor Verge');
        expect(new Set([første.uuid, andre.uuid, tredje.uuid]).size).toBe(3);
    });
});
