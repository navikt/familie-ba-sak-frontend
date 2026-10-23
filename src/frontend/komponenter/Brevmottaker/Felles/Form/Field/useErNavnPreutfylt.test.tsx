import { act, renderHook } from '@testing-library/react';
import { Brevmottakertype } from '@typer/brevmottaker';
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { describe, expect, test } from 'vitest';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';
import { useErNavnPreutfylt } from './useErNavnPreutfylt';

function lagWrapper(brevmottakertype: Brevmottakertype | '' = '') {
    return function Wrapper({ children }: PropsWithChildren) {
        const form = useForm<BrevmottakerFormValues>({
            defaultValues: { [BrevmottakerField.BREVMOTTAKERTYPE]: brevmottakertype },
        });
        return <FormProvider {...form}>{children}</FormProvider>;
    };
}

function renderUseErNavnPreutfylt(brevmottakertype: Brevmottakertype | '' = '') {
    return renderHook(
        () => ({
            erNavnPreutfylt: useErNavnPreutfylt(),
            form: useFormContext<BrevmottakerFormValues>(),
        }),
        { wrapper: lagWrapper(brevmottakertype) }
    );
}

describe('useErNavnPreutfylt', () => {
    test('skal returnere false når brevmottakertype ikke er valgt', () => {
        const { result } = renderUseErNavnPreutfylt();

        expect(result.current.erNavnPreutfylt).toBe(false);
    });

    test.each([Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE, Brevmottakertype.DØDSBO])(
        'skal returnere true når brevmottakertype er %s',
        (brevmottakertype: Brevmottakertype) => {
            const { result } = renderUseErNavnPreutfylt(brevmottakertype);

            expect(result.current.erNavnPreutfylt).toBe(true);
        }
    );

    test.each([Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE])(
        'skal returnere false når brevmottakertype er %s',
        (brevmottakertype: Brevmottakertype) => {
            const { result } = renderUseErNavnPreutfylt(brevmottakertype);

            expect(result.current.erNavnPreutfylt).toBe(false);
        }
    );

    test('skal oppdatere seg når brevmottakertype endres', () => {
        const { result } = renderUseErNavnPreutfylt(Brevmottakertype.VERGE);

        expect(result.current.erNavnPreutfylt).toBe(false);

        act(() => result.current.form.setValue(BrevmottakerField.BREVMOTTAKERTYPE, Brevmottakertype.DØDSBO));

        expect(result.current.erNavnPreutfylt).toBe(true);
    });
});
