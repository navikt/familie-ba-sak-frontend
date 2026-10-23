import { act, renderHook } from '@testing-library/react';
import { Brevmottakertype } from '@typer/brevmottaker';
import { describe, expect, test, vi } from 'vitest';
import { BrevmottakerField, type BrevmottakerTransformedFormValues, useBrevmottakerForm } from './useBrevmottakerForm';

function lagValues(values: Partial<BrevmottakerTransformedFormValues> = {}): BrevmottakerTransformedFormValues {
    return {
        [BrevmottakerField.BREVMOTTAKERTYPE]: Brevmottakertype.FULLMEKTIG,
        [BrevmottakerField.NAVN]: 'Ola Nordmann',
        [BrevmottakerField.LAND]: 'NO',
        [BrevmottakerField.ADRESSELINJE_1]: 'Gate 1',
        [BrevmottakerField.ADRESSELINJE_2]: 'Leilighet 2',
        [BrevmottakerField.POSTNUMMER]: '0010',
        [BrevmottakerField.POSTSTED]: 'Oslo',
        ...values,
    };
}

function renderUseBrevmottakerForm(lagreBrevmottaker = vi.fn(), onSubmitSuccess = vi.fn()) {
    const { result } = renderHook(() => {
        const { form, onSubmit } = useBrevmottakerForm({ lagreBrevmottaker, onSubmitSuccess });
        return { onSubmit, rootFeilmelding: form.formState.errors.root?.message };
    });
    return { result, lagreBrevmottaker, onSubmitSuccess };
}

describe('useBrevmottakerForm', () => {
    test('skal lagre brevmottaker med postnummer og poststed når land er Norge', async () => {
        const { result, lagreBrevmottaker, onSubmitSuccess } = renderUseBrevmottakerForm();

        await act(() => result.current.onSubmit(lagValues()));

        expect(lagreBrevmottaker).toHaveBeenCalledWith({
            type: Brevmottakertype.FULLMEKTIG,
            navn: 'Ola Nordmann',
            adresselinje1: 'Gate 1',
            adresselinje2: 'Leilighet 2',
            postnummer: '0010',
            poststed: 'Oslo',
            landkode: 'NO',
        });
        expect(onSubmitSuccess).toHaveBeenCalledOnce();
    });

    test('skal fjerne postnummer og poststed når land ikke er Norge', async () => {
        const { result, lagreBrevmottaker } = renderUseBrevmottakerForm();

        await act(() => result.current.onSubmit(lagValues({ [BrevmottakerField.LAND]: 'SE' })));

        expect(lagreBrevmottaker).toHaveBeenCalledWith(
            expect.objectContaining({ postnummer: '', poststed: '', landkode: 'SE' })
        );
    });

    test('skal sette adresselinje 2 til undefined når den er tom', async () => {
        const { result, lagreBrevmottaker } = renderUseBrevmottakerForm();

        await act(() => result.current.onSubmit(lagValues({ [BrevmottakerField.ADRESSELINJE_2]: '' })));

        expect(lagreBrevmottaker).toHaveBeenCalledWith(expect.objectContaining({ adresselinje2: undefined }));
    });

    test('skal sette feilmelding og ikke kalle onSubmitSuccess når lagring feiler', async () => {
        const { result, onSubmitSuccess } = renderUseBrevmottakerForm(
            vi.fn().mockRejectedValue(new Error('Noe gikk galt'))
        );

        await act(() => result.current.onSubmit(lagValues()));

        expect(result.current.rootFeilmelding).toBe('Noe gikk galt');
        expect(onSubmitSuccess).not.toHaveBeenCalled();
    });
});
