import React, { useState } from 'react';

import { fireEvent } from '@testing-library/dom';
import { vi, beforeAll, afterAll } from 'vitest';

import { FlaggCombobox, type FlaggComboboxOption } from './FlaggCombobox';
import { render } from '../../testutils/testrender';

const valutaOptions: FlaggComboboxOption[] = [
    { value: 'SEK', label: 'SEK - Svensk krone', regionCode: 'SE' },
    { value: 'DKK', label: 'DKK - Dansk krone', regionCode: 'DK' },
    { value: 'EUR', label: 'EUR - Euro', regionCode: 'EU' },
];

const regionOptions: FlaggComboboxOption[] = [
    { value: 'NO', label: 'Norge', regionCode: 'NO' },
    { value: 'SE', label: 'Sverige', regionCode: 'SE' },
    { value: 'DK', label: 'Danmark', regionCode: 'DK' },
];

interface SingleComboboxWrapperProps {
    label: string;
    options: FlaggComboboxOption[];
    onChangeMock: (newVal: string | null) => void;
}

interface MultiComboboxWrapperProps {
    label: string;
    options: FlaggComboboxOption[];
    initialValue: string[];
    onChangeMock: (newVals: string[]) => void;
}

function SingleComboboxWrapper({ label, options, onChangeMock }: SingleComboboxWrapperProps) {
    const [val, setVal] = useState<string | null>(null);
    return (
        <FlaggCombobox
            label={label}
            options={options}
            value={val}
            onChange={(newVal: string | null) => {
                setVal(newVal);
                onChangeMock(newVal);
            }}
            isMulti={false}
        />
    );
}

function MultiComboboxWrapper({ label, options, initialValue, onChangeMock }: MultiComboboxWrapperProps) {
    const [vals, setVals] = useState<string[]>(initialValue);
    return (
        <FlaggCombobox
            label={label}
            options={options}
            value={vals}
            onChange={(newVals: string[]) => {
                setVals(newVals);
                onChangeMock(newVals);
            }}
            isMulti={true}
        />
    );
}

describe('FlaggCombobox', () => {
    // --- Localized Virtualizer Mocks ---
    const originalResizeObserver = globalThis.ResizeObserver;
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

    beforeAll(() => {
        globalThis.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        };

        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
            configurable: true,
            value: 500,
        });

        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
            configurable: true,
            value: 300,
        });

        Element.prototype.getBoundingClientRect = vi.fn(() => ({
            width: 300,
            height: 500,
            top: 0,
            left: 0,
            bottom: 500,
            right: 300,
            x: 0,
            y: 0,
            toJSON: () => {},
        }));
    });

    afterAll(() => {
        // Restore everything so other tests aren't impacted!
        globalThis.ResizeObserver = originalResizeObserver;

        if (originalOffsetHeight) {
            Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
        }
        if (originalOffsetWidth) {
            Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
        }

        Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });

    it('should be possible to select a single currency and see it in the input', async () => {
        const onChangeMock = vi.fn();

        const { user, screen } = render(
            <SingleComboboxWrapper label={'Velg valuta'} options={valutaOptions} onChangeMock={onChangeMock} />
        );

        const input = screen.getByRole('combobox', { name: 'Velg valuta' });
        await user.click(input);

        const option = await screen.findByRole('option', { name: 'SEK - Svensk krone' });
        await user.click(option);

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith('SEK');

        expect(input).toHaveValue('SEK - Svensk krone');
    });

    it('should be possible to select multiple currencies and see them as chips', async () => {
        const onChangeMock = vi.fn();

        const { user, screen } = render(
            <MultiComboboxWrapper
                label={'Velg valutaer'}
                options={valutaOptions}
                initialValue={['SEK']}
                onChangeMock={onChangeMock}
            />
        );

        const input = screen.getByRole('combobox', { name: 'Velg valutaer' });

        expect(screen.getAllByText('SEK - Svensk krone')[0]).toBeInTheDocument();

        await user.click(input);

        const option = await screen.findByRole('option', { name: /DKK - Dansk krone/i });
        fireEvent.click(option);

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith(['SEK', 'DKK']);

        expect(screen.getAllByText('SEK - Svensk krone')[0]).toBeInTheDocument();
        expect(screen.getAllByText('DKK - Dansk krone')[0]).toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'Fjern SEK - Svensk krone' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Fjern DKK - Dansk krone' })).toBeInTheDocument();

        expect(input).toHaveValue('');
    });

    it('should be possible to select a single region and see it in the input', async () => {
        const onChangeMock = vi.fn();

        const { user, screen } = render(
            <SingleComboboxWrapper label={'Velg land'} options={regionOptions} onChangeMock={onChangeMock} />
        );

        const input = screen.getByRole('combobox', { name: 'Velg land' });
        await user.click(input);

        const option = await screen.findByRole('option', { name: 'Sverige' });
        await user.click(option);

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith('SE');

        expect(input).toHaveValue('Sverige');
    });

    it('should be possible to select multiple regions and see them as chips', async () => {
        const onChangeMock = vi.fn();

        const { user, screen } = render(
            <MultiComboboxWrapper
                label={'Velg land (flere)'}
                options={regionOptions}
                initialValue={['NO']}
                onChangeMock={onChangeMock}
            />
        );

        const input = screen.getByRole('combobox', { name: 'Velg land (flere)' });

        expect(screen.getAllByText('Norge')[0]).toBeInTheDocument();

        await user.click(input);

        const option = await screen.findByRole('option', { name: /Sverige/i });
        fireEvent.click(option);

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith(['NO', 'SE']);

        expect(screen.getAllByText('Norge')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Sverige')[0]).toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'Fjern Norge' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Fjern Sverige' })).toBeInTheDocument();

        expect(input).toHaveValue('');
    });
});
