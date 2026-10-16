import { useMergedRef } from '@hooks/useMergedRef';
import { PadlockLockedFillIcon } from '@navikt/aksel-icons';
import { ErrorMessage, HStack, Label, VStack } from '@navikt/ds-react';
import _Flag from '@navikt/flagg-ikoner';
import { useVirtualizer } from '@tanstack/react-virtual';
import classNames from 'classnames';
import {
    type ChangeEvent,
    type KeyboardEvent,
    type MouseEvent,
    type PointerEvent,
    type Ref,
    useEffect,
    useEffectEvent,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import styles from './FlaggCombobox.module.css';
import type { Regionkode } from './RegionCombobox/region';

const Flag = (_Flag as unknown as { default?: typeof _Flag }).default ?? _Flag;

const estimateVirtualizerSize = () => 36;

export interface FlaggComboboxOption<T extends string = string> {
    value: T;
    label: string;
    regionCode: Regionkode;
}

interface FlaggComboboxBaseProps<T extends string> {
    options: FlaggComboboxOption<T>[];
    label: string;
    error?: string | Error;
    readOnly?: boolean;
    placeholder?: string;
    dropdownPlacement?: 'bottom' | 'top' | 'auto';
    className?: string;
}

export interface FlaggComboboxSingleProps<T extends string> extends FlaggComboboxBaseProps<T> {
    isMulti?: false;
    value: T | undefined | null;
    onChange: (value: T | null) => void;
}

export interface FlaggComboboxMultiProps<T extends string> extends FlaggComboboxBaseProps<T> {
    isMulti: true;
    value: T[] | undefined;
    onChange: (value: T[]) => void;
}

export type FlaggComboboxProps<T extends string> = (FlaggComboboxSingleProps<T> | FlaggComboboxMultiProps<T>) & {
    ref?: Ref<HTMLInputElement>;
};

// Omit som bevarer unionen mellom enkeltvalg og flervalg
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type FlaggComboboxKodeProps<T extends string> = DistributiveOmit<FlaggComboboxProps<T>, 'options'> & {
    options: T[];
};

interface FlagIconProps {
    regionCode: Regionkode;
    size: 'XS' | 'S';
    className?: string;
}

function FlagIcon({ regionCode, size, className }: FlagIconProps) {
    return (
        <span aria-hidden={'true'} className={classNames(styles.flag, className)}>
            <Flag country={regionCode} type={'circle'} size={size} animate={false} wave={false} tooltip={false} />
        </span>
    );
}

export function FlaggCombobox<T extends string>(props: FlaggComboboxProps<T>) {
    const {
        ref,
        options,
        label,
        error,
        readOnly = false,
        placeholder = '',
        className,
        dropdownPlacement = 'auto',
    } = props;

    const inputId = useId();
    const labelId = `${inputId}-label`;
    const listboxId = `${inputId}-listbox`;
    const errorId = `${inputId}-error`;

    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [internalDropdownPlacement, setInternalDropdownPlacement] = useState<'bottom' | 'top'>('bottom');

    const singleValue = !props.isMulti ? (props.value as T | null | undefined) : null;
    const multiValues = props.isMulti ? (props.value as T[] | undefined) || [] : [];
    const hasValue = props.isMulti ? multiValues.length > 0 : singleValue !== null && singleValue !== undefined;

    const activeDropdownPlacement = dropdownPlacement === 'auto' ? internalDropdownPlacement : dropdownPlacement;

    const internalInputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isKeyboardNavRef = useRef(false);
    const anchorRef = useRef<HTMLDivElement>(null);

    const optionsMap = useMemo(
        () => new Map<T, FlaggComboboxOption<T>>(options.map(option => [option.value, option])),
        [options]
    );

    const selectedSingleOption =
        singleValue !== null && singleValue !== undefined ? optionsMap.get(singleValue) : undefined;

    const inputValue = isOpen ? searchValue : (selectedSingleOption?.label ?? '');

    const filteredOptions = useMemo(() => {
        return options.filter(option => {
            if (searchValue === '') return true;
            return option.label.toLowerCase().includes(searchValue.toLowerCase());
        });
    }, [options, searchValue]);

    const rowVirtualizer = useVirtualizer({
        count: filteredOptions.length,
        getScrollElement: () => dropdownRef.current,
        estimateSize: estimateVirtualizerSize,
        overscan: 5,
    });

    const mergedInputRef = useMergedRef(ref, internalInputRef);

    const scrollToHighlightedOption = useEffectEvent(() => {
        rowVirtualizer.scrollToIndex(highlightedIndex, { align: 'auto' });
    });

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        // Lytter på pointerdown fordi mousedown ikke sendes når et annet felt kaller preventDefault på pointerdown
        function handleOutsidePointerDown(event: Event) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setHighlightedIndex(0);
            }
        }

        document.addEventListener('pointerdown', handleOutsidePointerDown);
        return () => {
            document.removeEventListener('pointerdown', handleOutsidePointerDown);
        };
    }, [isOpen]);

    // Listen finnes ikke i DOM-en før den er rendret, så rullingen ved åpning må skje i en effekt
    useEffect(() => {
        if (isOpen) {
            scrollToHighlightedOption();
        }
    }, [isOpen]);

    useLayoutEffect(() => {
        if (!isOpen || !anchorRef.current || dropdownPlacement !== 'auto') return;

        const updatePlacement = () => {
            if (!anchorRef.current) return;

            const rect = anchorRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;

            const requiredSpace = 260;

            if (spaceBelow < requiredSpace && spaceAbove > spaceBelow) {
                setInternalDropdownPlacement('top');
            } else {
                setInternalDropdownPlacement('bottom');
            }
        };

        updatePlacement();

        window.addEventListener('resize', updatePlacement, { passive: true });
        window.addEventListener('scroll', updatePlacement, { capture: true, passive: true });

        return () => {
            window.removeEventListener('resize', updatePlacement);
            window.removeEventListener('scroll', updatePlacement, { capture: true });
        };
    }, [isOpen, dropdownPlacement]);

    function handleOnWrapperPointerDown(event: PointerEvent<HTMLDivElement>) {
        const target = event.target as Element;
        if (target === internalInputRef.current || target.closest('button')) {
            return;
        }
        // Hindrer at input-feltet mister fokus ved klikk på flagg, chips eller tom plass i feltet
        event.preventDefault();
        if (readOnly) {
            return;
        }
        internalInputRef.current?.focus();
        handleInputInteraction();
    }

    function handleOnDropdownPointerDown(event: PointerEvent<HTMLDivElement>) {
        // Beholder fokus i input-feltet ved klikk i listen
        event.preventDefault();
    }

    function handleOnInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
        setHighlightedIndex(0);
        rowVirtualizer.scrollToOffset(0);
        if (!isOpen) {
            setIsOpen(true);
        }
    }

    function handleOnOptionSelected(option: FlaggComboboxOption<T>) {
        if (props.isMulti) {
            const isSelected = multiValues.includes(option.value);
            const newValues = isSelected ? multiValues.filter(v => v !== option.value) : [...multiValues, option.value];
            props.onChange(newValues);
            setSearchValue('');
        } else {
            if (singleValue === option.value) {
                props.onChange(null);
                setSearchValue('');
            } else {
                props.onChange(option.value);
                setIsOpen(false);
            }
        }
        internalInputRef.current?.focus();
    }

    function handleOnOptionMouseEntered(index: number) {
        if (isKeyboardNavRef.current) {
            return;
        }
        setHighlightedIndex(index);
    }

    function highlightOptionWithKeyboard(index: number) {
        isKeyboardNavRef.current = true;
        setHighlightedIndex(index);
        rowVirtualizer.scrollToIndex(index, { align: 'auto' });
    }

    function handleOnClearClicked(event: MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        if (hasValue) {
            if (props.isMulti) {
                props.onChange([]);
            } else {
                props.onChange(null);
            }
        }
        setSearchValue('');
        internalInputRef.current?.focus();
    }

    function handleInputInteraction() {
        if (readOnly) {
            return;
        }
        if (!isOpen) {
            setIsOpen(true);
            setSearchValue('');
            if (!props.isMulti) {
                const index = options.findIndex(opt => opt.value === singleValue);
                setHighlightedIndex(index !== -1 ? index : 0);
            } else {
                const index = options.findIndex(opt => multiValues.includes(opt.value));
                setHighlightedIndex(index !== -1 ? index : 0);
            }
        }
    }

    function handleOnKeyDownPressed(event: KeyboardEvent<HTMLInputElement>) {
        if (readOnly) {
            return;
        }
        if (!isOpen) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                handleInputInteraction();
            }
            return;
        }
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (highlightedIndex < filteredOptions.length - 1) {
                    highlightOptionWithKeyboard(highlightedIndex + 1);
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (highlightedIndex > 0) {
                    highlightOptionWithKeyboard(highlightedIndex - 1);
                }
                break;
            case 'Enter':
                event.preventDefault();
                if (filteredOptions[highlightedIndex]) {
                    handleOnOptionSelected(filteredOptions[highlightedIndex]);
                }
                break;
            case 'Escape':
                event.preventDefault();
                setIsOpen(false);
                break;
            case 'Backspace':
                if (props.isMulti && inputValue === '' && multiValues.length > 0) {
                    const newValues = [...multiValues];
                    newValues.pop();
                    props.onChange(newValues);
                }
                break;
            case 'Tab':
                setIsOpen(false);
                break;
        }
    }

    function handleOnDropdownArrowClicked(event: MouseEvent<HTMLButtonElement>) {
        if (readOnly) {
            return;
        }
        event.stopPropagation();
        event.preventDefault();
        internalInputRef.current?.focus();
        if (isOpen) {
            setIsOpen(false);
        } else {
            handleInputInteraction();
        }
    }

    function handleOnChipRemoved(event: MouseEvent<HTMLButtonElement>, valToRemove: T) {
        if (!props.isMulti || readOnly) {
            return;
        }
        event.stopPropagation();
        props.onChange(multiValues.filter(v => v !== valToRemove));
        internalInputRef.current?.focus();
    }

    function getOptionId(value: T) {
        return `${inputId}-option-${value}`;
    }

    const errorMessage = error instanceof Error ? error.message : error;
    const showError = !!errorMessage && !readOnly;
    const highlightedOption = isOpen ? filteredOptions[highlightedIndex] : undefined;

    return (
        <VStack gap={'space-4'} className={classNames(styles.container, className)} ref={containerRef}>
            <HStack wrap={false} align={'center'} gap={'space-4'} paddingBlock={'space-2'}>
                {readOnly && <PadlockLockedFillIcon aria-hidden={'true'} />}
                <Label id={labelId} size={'medium'} htmlFor={inputId}>
                    {label}
                </Label>
            </HStack>
            <div className={styles.relativeAnchor} ref={anchorRef}>
                <div
                    className={classNames(styles.inputWrapper, {
                        [styles.inputWrapperError]: showError,
                        [styles.inputWrapperReadOnly]: readOnly,
                    })}
                    onPointerDown={handleOnWrapperPointerDown}
                >
                    <div
                        className={classNames(
                            styles.valueContainer,
                            props.isMulti ? styles.valueContainerMulti : styles.valueContainerSingle
                        )}
                    >
                        {selectedSingleOption && (
                            <FlagIcon
                                regionCode={selectedSingleOption.regionCode}
                                size={'S'}
                                className={styles.selectedFlag}
                            />
                        )}

                        {props.isMulti &&
                            multiValues.length > 0 &&
                            multiValues.map(val => {
                                const opt = optionsMap.get(val);
                                if (!opt) {
                                    return null;
                                }
                                return (
                                    <span key={val} className={styles.chip}>
                                        <FlagIcon regionCode={opt.regionCode} size={'XS'} />
                                        {opt.label}
                                        {!readOnly && (
                                            <button
                                                type={'button'}
                                                className={styles.chipRemove}
                                                onClick={event => handleOnChipRemoved(event, val)}
                                                aria-label={`Fjern ${opt.label}`}
                                            >
                                                <svg
                                                    aria-hidden={'true'}
                                                    focusable={'false'}
                                                    width={'12'}
                                                    height={'12'}
                                                    viewBox={'0 0 24 24'}
                                                    fill={'none'}
                                                    stroke={'currentColor'}
                                                    strokeWidth={'2.5'}
                                                >
                                                    <path
                                                        strokeLinecap={'round'}
                                                        strokeLinejoin={'round'}
                                                        d={'M18 6L6 18M6 6l12 12'}
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </span>
                                );
                            })}

                        <input
                            id={inputId}
                            ref={mergedInputRef}
                            type={'text'}
                            className={styles.input}
                            value={inputValue}
                            onChange={handleOnInputChanged}
                            onClick={handleInputInteraction}
                            onFocus={handleInputInteraction}
                            onKeyDown={handleOnKeyDownPressed}
                            readOnly={readOnly}
                            tabIndex={readOnly ? 0 : undefined}
                            role={'combobox'}
                            aria-expanded={isOpen}
                            aria-controls={isOpen ? listboxId : undefined}
                            aria-autocomplete={'list'}
                            aria-invalid={showError}
                            aria-describedby={showError ? errorId : undefined}
                            aria-activedescendant={highlightedOption ? getOptionId(highlightedOption.value) : undefined}
                            placeholder={
                                !props.isMulti && selectedSingleOption
                                    ? selectedSingleOption.label
                                    : props.isMulti && multiValues.length > 0
                                      ? ''
                                      : placeholder
                            }
                            autoComplete={'off'}
                        />
                    </div>

                    <div className={styles.actionsContainer}>
                        {(hasValue || inputValue) && !readOnly && (
                            <button
                                type={'button'}
                                aria-label={'Fjern valg'}
                                className={styles.clearButton}
                                onClick={handleOnClearClicked}
                            >
                                <svg
                                    aria-hidden={'true'}
                                    focusable={'false'}
                                    viewBox={'0 0 24 24'}
                                    fill={'none'}
                                    stroke={'currentColor'}
                                    strokeWidth={'2.5'}
                                >
                                    <path d={'M18 6L6 18M6 6l12 12'} strokeLinecap={'round'} strokeLinejoin={'round'} />
                                </svg>
                            </button>
                        )}
                        <button
                            type={'button'}
                            aria-label={'Vis valgmuligheter'}
                            className={styles.arrowButton}
                            disabled={readOnly}
                            tabIndex={-1}
                            onClick={handleOnDropdownArrowClicked}
                        >
                            <svg
                                aria-hidden={'true'}
                                focusable={'false'}
                                width={'16'}
                                height={'16'}
                                viewBox={'0 0 24 24'}
                                fill={'none'}
                                stroke={'currentColor'}
                                strokeWidth={'2'}
                                className={classNames({ [styles.arrowIconOpen]: isOpen })}
                            >
                                <path strokeLinecap={'round'} strokeLinejoin={'round'} d={'M19 9l-7 7-7-7'} />
                            </svg>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className={classNames(
                            styles.dropdown,
                            activeDropdownPlacement === 'top' ? styles.dropdownTop : styles.dropdownBottom
                        )}
                        onPointerDown={handleOnDropdownPointerDown}
                    >
                        <div
                            id={listboxId}
                            role={'listbox'}
                            aria-labelledby={labelId}
                            aria-multiselectable={props.isMulti}
                            className={styles.listbox}
                            style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
                            onMouseMove={() => (isKeyboardNavRef.current = false)}
                        >
                            {rowVirtualizer.getVirtualItems().map(virtualRow => {
                                const option = filteredOptions[virtualRow.index];
                                const index = virtualRow.index;
                                const isSelected = props.isMulti
                                    ? multiValues.includes(option.value)
                                    : singleValue === option.value;
                                return (
                                    // biome-ignore lint/a11y/useKeyWithClickEvents: Tastaturet håndteres i input-feltet via aria-activedescendant
                                    <div
                                        key={option.value}
                                        id={getOptionId(option.value)}
                                        role={'option'}
                                        aria-selected={isSelected}
                                        aria-setsize={filteredOptions.length}
                                        aria-posinset={index + 1}
                                        tabIndex={-1}
                                        className={classNames(styles.option, {
                                            [styles.optionFocused]: highlightedIndex === index,
                                            [styles.selectedOption]: isSelected,
                                        })}
                                        onClick={() => handleOnOptionSelected(option)}
                                        onMouseEnter={() => handleOnOptionMouseEntered(index)}
                                        style={{
                                            height: `${virtualRow.size}px`,
                                            transform: `translateY(${virtualRow.start}px)`,
                                        }}
                                    >
                                        <FlagIcon regionCode={option.regionCode} size={'S'} />
                                        <span className={styles.optionText}>{option.label}</span>
                                        {isSelected && (
                                            <svg
                                                aria-hidden={'true'}
                                                focusable={'false'}
                                                width={'20'}
                                                height={'20'}
                                                viewBox={'0 0 24 24'}
                                                fill={'none'}
                                                stroke={'currentColor'}
                                                strokeWidth={'2.5'}
                                                className={styles.checkmarkSvg}
                                            >
                                                <path
                                                    strokeLinecap={'round'}
                                                    strokeLinejoin={'round'}
                                                    d={'M5 13l4 4L19 7'}
                                                />
                                            </svg>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div role={'status'} className={styles.noResults}>
                            {filteredOptions.length === 0 && 'Fant ingen treff'}
                        </div>
                    </div>
                )}
            </div>
            <div id={errorId} aria-live={'polite'} aria-relevant={'additions removals'} className={styles.error}>
                {showError && <ErrorMessage showIcon>{errorMessage}</ErrorMessage>}
            </div>
        </VStack>
    );
}
