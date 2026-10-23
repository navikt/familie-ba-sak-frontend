import { ALLE_LAND_REGIONKODER } from '@komponenter/FlaggCombobox';
import { act, renderHook } from '@testing-library/react';
import { Brevmottakertype } from '@typer/brevmottaker';
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { describe, expect, test } from 'vitest';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';
import { useValgbareRegionkoder } from './useValgbareRegionkoder';

function lagWrapper(brevmottakertype: Brevmottakertype | '' = '') {
    return function Wrapper({ children }: PropsWithChildren) {
        const form = useForm<BrevmottakerFormValues>({
            defaultValues: {
                [BrevmottakerField.BREVMOTTAKERTYPE]: brevmottakertype,
                [BrevmottakerField.NAVN]: '',
                [BrevmottakerField.LAND]: null,
                [BrevmottakerField.ADRESSELINJE_1]: '',
                [BrevmottakerField.ADRESSELINJE_2]: '',
                [BrevmottakerField.POSTNUMMER]: '',
                [BrevmottakerField.POSTSTED]: '',
            },
        });
        return <FormProvider {...form}>{children}</FormProvider>;
    };
}

function renderUseValgbareRegionkoder(brevmottakertype: Brevmottakertype | '' = '') {
    return renderHook(
        () => ({
            valgbareRegionkoder: useValgbareRegionkoder(),
            form: useFormContext<BrevmottakerFormValues>(),
        }),
        { wrapper: lagWrapper(brevmottakertype) }
    );
}

describe('useValgbareRegionkoder', () => {
    test('skal returnere alle land bortsett fra flyktning når brevmottakertype ikke er valgt', () => {
        const { result } = renderUseValgbareRegionkoder();

        expect(result.current.valgbareRegionkoder).toEqual(ALLE_LAND_REGIONKODER.filter(it => it !== 'XU'));
    });

    test.each([
        '',
        Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE,
        Brevmottakertype.FULLMEKTIG,
        Brevmottakertype.VERGE,
        Brevmottakertype.DØDSBO,
    ] as const)('skal aldri returnere flyktning når brevmottakertype er "%s"', brevmottakertype => {
        const { result } = renderUseValgbareRegionkoder(brevmottakertype);

        expect(result.current.valgbareRegionkoder).not.toContain('XU');
    });

    test.each([Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE, Brevmottakertype.DØDSBO])(
        'skal returnere Norge når brevmottakertype er %s',
        (brevmottakertype: Brevmottakertype) => {
            const { result } = renderUseValgbareRegionkoder(brevmottakertype);

            expect(result.current.valgbareRegionkoder).toContain('NO');
            expect(result.current.valgbareRegionkoder).toEqual(ALLE_LAND_REGIONKODER.filter(it => it !== 'XU'));
        }
    );

    test('skal ikke returnere Norge når brevmottakertype er bruker med utenlandsk adresse', () => {
        const { result } = renderUseValgbareRegionkoder(Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE);

        expect(result.current.valgbareRegionkoder).not.toContain('NO');
        expect(result.current.valgbareRegionkoder).toEqual(
            ALLE_LAND_REGIONKODER.filter(it => it !== 'XU' && it !== 'NO')
        );
    });

    test('skal fjerne Norge når brevmottakertype endres til bruker med utenlandsk adresse', () => {
        const { result } = renderUseValgbareRegionkoder(Brevmottakertype.FULLMEKTIG);

        expect(result.current.valgbareRegionkoder).toContain('NO');

        act(() => {
            result.current.form.setValue(
                BrevmottakerField.BREVMOTTAKERTYPE,
                Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE
            );
        });

        expect(result.current.valgbareRegionkoder).not.toContain('NO');
    });

    test('skal legge til Norge igjen når brevmottakertype endres fra bruker med utenlandsk adresse', () => {
        const { result } = renderUseValgbareRegionkoder(Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE);

        expect(result.current.valgbareRegionkoder).not.toContain('NO');

        act(() => {
            result.current.form.setValue(BrevmottakerField.BREVMOTTAKERTYPE, Brevmottakertype.VERGE);
        });

        expect(result.current.valgbareRegionkoder).toContain('NO');
    });
});
