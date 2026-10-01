import { waitFor } from '@testing-library/react';
import { render } from '@testutils/testrender';
import { useState } from 'react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { FlaggCombobox, type FlaggComboboxOption } from './FlaggCombobox';

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
    initialValue?: string | null;
    error?: string;
}

interface MultiComboboxWrapperProps {
    label: string;
    options: FlaggComboboxOption[];
    initialValue: string[];
    onChangeMock: (newVals: string[]) => void;
    readOnly?: boolean;
}

function SingleComboboxWrapper({
    label,
    options,
    onChangeMock,
    initialValue = null,
    error,
}: SingleComboboxWrapperProps) {
    const [val, setVal] = useState<string | null>(initialValue);
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
            error={error}
        />
    );
}

function MultiComboboxWrapper({ label, options, initialValue, onChangeMock, readOnly }: MultiComboboxWrapperProps) {
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
            readOnly={readOnly}
        />
    );
}

describe('FlaggCombobox', () => {
    // Mocker som gjør at virtualiseringen rendrer valgene i jsdom
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
        // Gjenoppretter alt slik at andre tester ikke påvirkes
        globalThis.ResizeObserver = originalResizeObserver;

        if (originalOffsetHeight) {
            Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
        }
        if (originalOffsetWidth) {
            Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
        }

        Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });

    describe('enkeltvalg', () => {
        test('skal kunne velge en valuta og vise den i feltet', async () => {
            const onChangeMock = vi.fn();

            const { user, screen } = render(
                <SingleComboboxWrapper label={'Velg valuta'} options={valutaOptions} onChangeMock={onChangeMock} />
            );

            const input = screen.getByRole('combobox', { name: 'Velg valuta' });
            await user.click(input);
            await user.click(screen.getByRole('option', { name: 'SEK - Svensk krone' }));

            expect(onChangeMock).toHaveBeenCalledTimes(1);
            expect(onChangeMock).toHaveBeenCalledWith('SEK');
            expect(input).toHaveValue('SEK - Svensk krone');
        });

        test('skal kunne velge et land og vise det i feltet', async () => {
            const onChangeMock = vi.fn();

            const { user, screen } = render(
                <SingleComboboxWrapper label={'Velg land'} options={regionOptions} onChangeMock={onChangeMock} />
            );

            const input = screen.getByRole('combobox', { name: 'Velg land' });
            await user.click(input);
            await user.click(screen.getByRole('option', { name: 'Sverige' }));

            expect(onChangeMock).toHaveBeenCalledTimes(1);
            expect(onChangeMock).toHaveBeenCalledWith('SE');
            expect(input).toHaveValue('Sverige');
        });

        test('skal beholde fokus i feltet etter valg med musen', async () => {
            const { user, screen } = render(
                <SingleComboboxWrapper label={'Velg land'} options={regionOptions} onChangeMock={vi.fn()} />
            );

            const input = screen.getByRole('combobox', { name: 'Velg land' });
            await user.click(input);
            await user.click(screen.getByRole('option', { name: 'Danmark' }));

            expect(input).toHaveValue('Danmark');
            expect(input).toHaveFocus();
        });

        test('skal kunne velge med tastaturet og åpne listen igjen ved klikk i feltet', async () => {
            const onChangeMock = vi.fn();

            const { user, screen } = render(
                <SingleComboboxWrapper label={'Velg land'} options={regionOptions} onChangeMock={onChangeMock} />
            );

            const input = screen.getByRole('combobox', { name: 'Velg land' });
            await user.click(input);
            await user.keyboard('{ArrowDown}{Enter}');

            expect(onChangeMock).toHaveBeenCalledWith('SE');
            expect(input).toHaveValue('Sverige');
            expect(input).toHaveFocus();
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

            await user.click(input);

            expect(screen.getByRole('listbox', { name: 'Velg land' })).toBeInTheDocument();
        });

        test('skal filtrere valgene og si fra når søket ikke gir treff', async () => {
            const { user, screen } = render(
                <SingleComboboxWrapper label={'Velg land'} options={regionOptions} onChangeMock={vi.fn()} />
            );

            const input = screen.getByRole('combobox', { name: 'Velg land' });
            await user.type(input, 'sve');

            expect(screen.getAllByRole('option')).toHaveLength(1);
            expect(screen.getByRole('option', { name: 'Sverige' })).toBeInTheDocument();
            expect(screen.getByRole('status')).toBeEmptyDOMElement();

            await user.type(input, 'x');

            expect(screen.queryByRole('option')).not.toBeInTheDocument();
            expect(screen.getByRole('status')).toHaveTextContent('Fant ingen treff');
        });

        test('skal lukke listen med Escape og vise valgt verdi igjen', async () => {
            const { user, screen } = render(
                <SingleComboboxWrapper
                    label={'Velg land'}
                    options={regionOptions}
                    initialValue={'NO'}
                    onChangeMock={vi.fn()}
                />
            );

            const input = screen.getByRole('combobox', { name: 'Velg land' });
            expect(input).toHaveValue('Norge');

            await user.type(input, 'sve');
            expect(input).toHaveValue('sve');

            await user.keyboard('{Escape}');

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
            expect(input).toHaveValue('Norge');
        });

        test('skal bare kalle onChange fra fjern-knappen når noe er valgt', async () => {
            const onChangeMock = vi.fn();

            const { user, screen } = render(
                <SingleComboboxWrapper label={'Velg land'} options={regionOptions} onChangeMock={onChangeMock} />
            );

            const input = screen.getByRole('combobox', { name: 'Velg land' });
            await user.type(input, 'sve');
            await user.click(screen.getByRole('button', { name: 'Fjern valg' }));

            expect(onChangeMock).not.toHaveBeenCalled();
            expect(input).toHaveValue('');

            await user.click(screen.getByRole('option', { name: 'Sverige' }));
            await user.click(screen.getByRole('button', { name: 'Fjern valg' }));

            expect(onChangeMock).toHaveBeenLastCalledWith(null);
            expect(input).toHaveValue('');
        });
    });

    describe('flervalg', () => {
        test('skal kunne velge flere valutaer og vise dem som chips', async () => {
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
            expect(screen.getByRole('button', { name: 'Fjern SEK - Svensk krone' })).toBeInTheDocument();

            await user.click(input);

            expect(screen.getByRole('listbox', { name: 'Velg valutaer' })).toHaveAttribute(
                'aria-multiselectable',
                'true'
            );

            await user.click(screen.getByRole('option', { name: 'DKK - Dansk krone' }));

            expect(onChangeMock).toHaveBeenCalledTimes(1);
            expect(onChangeMock).toHaveBeenCalledWith(['SEK', 'DKK']);
            expect(screen.getByRole('button', { name: 'Fjern SEK - Svensk krone' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Fjern DKK - Dansk krone' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'DKK - Dansk krone', selected: true })).toBeInTheDocument();
            expect(input).toHaveValue('');
            expect(input).toHaveFocus();
        });

        test('skal kunne velge flere land og vise dem som chips', async () => {
            const onChangeMock = vi.fn();

            const { user, screen } = render(
                <MultiComboboxWrapper
                    label={'Velg land'}
                    options={regionOptions}
                    initialValue={['NO']}
                    onChangeMock={onChangeMock}
                />
            );

            const input = screen.getByRole('combobox', { name: 'Velg land' });
            await user.click(input);
            await user.click(screen.getByRole('option', { name: 'Sverige' }));

            expect(onChangeMock).toHaveBeenCalledTimes(1);
            expect(onChangeMock).toHaveBeenCalledWith(['NO', 'SE']);
            expect(screen.getByRole('button', { name: 'Fjern Norge' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Fjern Sverige' })).toBeInTheDocument();
            expect(input).toHaveValue('');
        });

        test('skal kunne fjerne et valg med knappen på chipen', async () => {
            const onChangeMock = vi.fn();

            const { user, screen } = render(
                <MultiComboboxWrapper
                    label={'Velg land'}
                    options={regionOptions}
                    initialValue={['NO', 'SE']}
                    onChangeMock={onChangeMock}
                />
            );

            await user.click(screen.getByRole('button', { name: 'Fjern Norge' }));

            expect(onChangeMock).toHaveBeenCalledWith(['SE']);
            expect(screen.queryByRole('button', { name: 'Fjern Norge' })).not.toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Fjern Sverige' })).toBeInTheDocument();
            expect(screen.getByRole('combobox', { name: 'Velg land' })).toHaveFocus();
        });

        test('skal åpne listen og fokusere feltet ved klikk på en chip', async () => {
            const { user, screen } = render(
                <MultiComboboxWrapper
                    label={'Velg land'}
                    options={regionOptions}
                    initialValue={['NO']}
                    onChangeMock={vi.fn()}
                />
            );

            await user.click(screen.getByText('Norge'));

            expect(screen.getByRole('combobox', { name: 'Velg land' })).toHaveFocus();
            expect(screen.getByRole('listbox', { name: 'Velg land' })).toBeInTheDocument();
        });

        test('skal verken åpne listen eller vise fjern-knapper når feltet er skrivebeskyttet', async () => {
            const { user, screen } = render(
                <MultiComboboxWrapper
                    label={'Velg land'}
                    options={regionOptions}
                    initialValue={['NO']}
                    onChangeMock={vi.fn()}
                    readOnly={true}
                />
            );

            await user.click(screen.getByRole('combobox', { name: 'Velg land' }));
            await user.click(screen.getByText('Norge'));

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
            expect(screen.queryByRole('button', { name: 'Fjern Norge' })).not.toBeInTheDocument();
            expect(screen.queryByRole('button', { name: 'Fjern valg' })).not.toBeInTheDocument();
        });
    });

    describe('rulling', () => {
        const mangeLand: FlaggComboboxOption[] = Array.from({ length: 50 }, (_, index) => ({
            value: `L${index}`,
            label: `Land ${index}`,
            regionCode: 'NO',
        }));
        const scrollTo = vi.fn();
        const rulleposisjoner = () => scrollTo.mock.calls.map(([options]) => options.top);

        beforeEach(() => {
            Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
                configurable: true,
                writable: true,
                value: scrollTo,
            });
            Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 1800 });
            Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 500 });
        });

        afterEach(() => {
            Reflect.deleteProperty(HTMLElement.prototype, 'scrollTo');
            Reflect.deleteProperty(HTMLElement.prototype, 'scrollHeight');
            Reflect.deleteProperty(HTMLElement.prototype, 'clientHeight');
            scrollTo.mockReset();
        });

        test('skal rulle til valgt verdi når listen åpnes', async () => {
            const { user, screen } = render(
                <SingleComboboxWrapper
                    label={'Velg land'}
                    options={mangeLand}
                    initialValue={'L40'}
                    onChangeMock={vi.fn()}
                />
            );

            await user.click(screen.getByRole('combobox', { name: 'Velg land' }));

            // Valg nr. 40 er synlig nederst i listen når rulleposisjonen er 41 * 36 - 500 = 976
            await waitFor(() => expect(Math.max(...rulleposisjoner())).toBeGreaterThanOrEqual(976));
        });

        test('skal rulle når man navigerer med piltastene', async () => {
            const { user, screen } = render(
                <SingleComboboxWrapper label={'Velg land'} options={mangeLand} onChangeMock={vi.fn()} />
            );

            await user.click(screen.getByRole('combobox', { name: 'Velg land' }));
            await user.keyboard('{ArrowDown>20/}');

            await waitFor(() => expect(Math.max(...rulleposisjoner())).toBeGreaterThan(0));
        });

        test('skal rulle til toppen når søket endres', async () => {
            const { user, screen } = render(
                <SingleComboboxWrapper label={'Velg land'} options={mangeLand} onChangeMock={vi.fn()} />
            );

            const input = screen.getByRole('combobox', { name: 'Velg land' });
            await user.click(input);
            await user.keyboard('{ArrowDown>20/}');
            await waitFor(() => expect(rulleposisjoner().at(-1)).toBeGreaterThan(0));

            await user.type(input, '1');

            await waitFor(() => expect(rulleposisjoner().at(-1)).toBe(0));
        });

        test('skal ikke rulle når musen beveger seg over et delvis synlig valg', async () => {
            const { user, screen } = render(
                <SingleComboboxWrapper label={'Velg land'} options={mangeLand} onChangeMock={vi.fn()} />
            );

            await user.click(screen.getByRole('combobox', { name: 'Velg land' }));
            await user.hover(screen.getByRole('option', { name: 'Land 13' }));
            await new Promise(resolve => requestAnimationFrame(resolve));

            expect(screen.getByRole('option', { name: 'Land 13' })).toHaveClass(/optionFocused/);
            expect(rulleposisjoner().every(top => top === 0)).toBe(true);
        });
    });

    test('skal lukke listen ved klikk i et annet flaggfelt', async () => {
        const { user, screen } = render(
            <>
                <SingleComboboxWrapper label={'Velg land'} options={regionOptions} onChangeMock={vi.fn()} />
                <MultiComboboxWrapper
                    label={'Velg valutaer'}
                    options={valutaOptions}
                    initialValue={['SEK']}
                    onChangeMock={vi.fn()}
                />
            </>
        );

        await user.click(screen.getByRole('combobox', { name: 'Velg land' }));
        expect(screen.getByRole('listbox', { name: 'Velg land' })).toBeInTheDocument();

        await user.click(screen.getByText('SEK - Svensk krone'));

        expect(screen.queryByRole('listbox', { name: 'Velg land' })).not.toBeInTheDocument();
        expect(screen.getByRole('listbox', { name: 'Velg valutaer' })).toBeInTheDocument();
    });

    test('skal koble feilmeldingen til feltet', () => {
        const { screen } = render(
            <SingleComboboxWrapper
                label={'Velg land'}
                options={regionOptions}
                onChangeMock={vi.fn()}
                error={'Du må velge et land'}
            />
        );

        const input = screen.getByRole('combobox', { name: 'Velg land' });
        expect(input).toBeInvalid();
        expect(input).toHaveAccessibleDescription('Du må velge et land');
    });
});
