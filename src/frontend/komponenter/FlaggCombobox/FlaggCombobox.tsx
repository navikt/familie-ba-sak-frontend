import { useMergedRef } from '@hooks/useMergedRef';
import { CheckmarkIcon, ChevronDownIcon, PadlockLockedFillIcon, XMarkIcon } from '@navikt/aksel-icons';
import { ErrorMessage, HStack, Label, VStack } from '@navikt/ds-react';
import _Flag from '@navikt/flagg-ikoner';
import { useVirtualizer } from '@tanstack/react-virtual';
import classNames from 'classnames';
import {
    type ChangeEvent,
    type FocusEvent,
    type KeyboardEvent,
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

const AVSTAND_MELLOM_VALG_PX = 4;

const MAKS_LISTEHØYDE_PX = 250;

export interface FlaggComboboxOption<T extends string = string> {
    value: T;
    label: string;
    regionCode: Regionkode;
}

interface FlaggComboboxBaseProps<T extends string> {
    options: readonly FlaggComboboxOption<T>[];
    label: string;
    name?: string;
    onBlur?: () => void;
    error?: string | Error;
    readOnly?: boolean;
    disabled?: boolean;
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
    options: readonly T[];
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
        name,
        onBlur,
        error,
        readOnly = false,
        disabled = false,
        placeholder = '',
        className,
        dropdownPlacement = 'auto',
    } = props;

    const erLåst = readOnly || disabled;

    const inputId = useId();
    const labelId = `${inputId}-label`;
    const listboxId = `${inputId}-listbox`;
    const errorId = `${inputId}-error`;

    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    // Lukker listen hvis feltet blir låst mens den er åpen
    if (erLåst && isOpen) {
        setIsOpen(false);
    }

    const [internalDropdownPlacement, setInternalDropdownPlacement] = useState<'bottom' | 'top'>('bottom');

    const singleValue = !props.isMulti ? (props.value as T | null | undefined) : null;
    const multiValues = props.isMulti ? (props.value as T[] | undefined) || [] : [];
    const hasValue = props.isMulti ? multiValues.length > 0 : singleValue !== null && singleValue !== undefined;

    const activeDropdownPlacement = dropdownPlacement === 'auto' ? internalDropdownPlacement : dropdownPlacement;

    const internalInputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isKeyboardNavRef = useRef(false);
    const hoppOverÅpningVedFokusRef = useRef(false);
    const anchorRef = useRef<HTMLDivElement>(null);

    const optionsMap = useMemo(
        () => new Map<T, FlaggComboboxOption<T>>(options.map(option => [option.value, option])),
        [options]
    );

    const selectedSingleOption =
        singleValue !== null && singleValue !== undefined ? optionsMap.get(singleValue) : undefined;

    // Verdier som ikke finnes i options vises med koden, så de ikke skjules for brukeren
    const singleLabel = selectedSingleOption?.label ?? singleValue ?? undefined;

    const inputValue = isOpen ? searchValue : (singleLabel ?? '');

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
        gap: AVSTAND_MELLOM_VALG_PX,
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

            // Plass til listen og avstanden mellom listen og feltet
            const requiredSpace = MAKS_LISTEHØYDE_PX + 10;

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
        if (target === internalInputRef.current) {
            return;
        }
        // Hindrer at input-feltet mister fokus ved klikk i feltet. Safari gir ikke knapper fokus ved klikk,
        // så uten dette ville onBlur blitt kalt med relatedTarget null når man klikker på en knapp i feltet.
        event.preventDefault();
        if (target.closest('button')) {
            return;
        }
        if (erLåst) {
            return;
        }
        internalInputRef.current?.focus();
        handleInputInteraction();
    }

    function handleOnContainerBlur(event: FocusEvent<HTMLDivElement>) {
        // Fokus som flyttes til knapper inne i feltet regnes ikke som at feltet forlates
        if (containerRef.current?.contains(event.relatedTarget as Node | null)) {
            return;
        }
        onBlur?.();
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

    function handleOnClearClicked() {
        if (hasValue) {
            if (props.isMulti) {
                props.onChange([]);
            } else {
                props.onChange(null);
            }
        }
        setSearchValue('');
        fokuserFeltetUtenÅÅpneListen();
    }

    function fokuserFeltetUtenÅÅpneListen() {
        const input = internalInputRef.current;
        if (!input || document.activeElement === input) {
            return;
        }
        hoppOverÅpningVedFokusRef.current = true;
        input.focus();
    }

    function handleOnInputFocus() {
        if (hoppOverÅpningVedFokusRef.current) {
            hoppOverÅpningVedFokusRef.current = false;
            return;
        }
        handleInputInteraction();
    }

    function handleInputInteraction() {
        if (erLåst) {
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
        if (erLåst) {
            return;
        }
        if (!isOpen && event.key !== 'Backspace') {
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

    function handleOnDropdownArrowClicked() {
        internalInputRef.current?.focus();
        if (isOpen) {
            setIsOpen(false);
        } else {
            handleInputInteraction();
        }
    }

    function handleOnChipRemoved(valToRemove: T) {
        if (!props.isMulti) {
            return;
        }
        props.onChange(multiValues.filter(v => v !== valToRemove));
        fokuserFeltetUtenÅÅpneListen();
    }

    function getOptionId(value: T) {
        return `${inputId}-option-${value}`;
    }

    const errorMessage = error instanceof Error ? error.message : error;
    const showError = !!errorMessage && !readOnly;
    const highlightedOption = isOpen ? filteredOptions[highlightedIndex] : undefined;

    return (
        <VStack
            gap={'space-4'}
            className={classNames(styles.container, { [styles.containerDisabled]: disabled }, className)}
            ref={containerRef}
            onBlur={handleOnContainerBlur}
        >
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
                            multiValues.map(val => {
                                const opt = optionsMap.get(val);
                                const chipLabel = opt?.label ?? val;
                                return (
                                    <span key={val} className={styles.chip}>
                                        {opt && <FlagIcon regionCode={opt.regionCode} size={'XS'} />}
                                        {chipLabel}
                                        {!erLåst && (
                                            <button
                                                type={'button'}
                                                className={styles.chipRemove}
                                                onClick={() => handleOnChipRemoved(val)}
                                                aria-label={`Fjern ${chipLabel}`}
                                            >
                                                <XMarkIcon aria-hidden={'true'} width={12} height={12} />
                                            </button>
                                        )}
                                    </span>
                                );
                            })}

                        <input
                            id={inputId}
                            name={name}
                            ref={mergedInputRef}
                            type={'text'}
                            className={styles.input}
                            value={inputValue}
                            onChange={handleOnInputChanged}
                            onClick={handleInputInteraction}
                            onFocus={handleOnInputFocus}
                            onKeyDown={handleOnKeyDownPressed}
                            readOnly={readOnly}
                            disabled={disabled}
                            role={'combobox'}
                            aria-expanded={isOpen}
                            aria-controls={isOpen ? listboxId : undefined}
                            aria-autocomplete={'list'}
                            aria-invalid={showError}
                            aria-describedby={showError ? errorId : undefined}
                            aria-activedescendant={highlightedOption ? getOptionId(highlightedOption.value) : undefined}
                            placeholder={
                                !props.isMulti && singleLabel
                                    ? singleLabel
                                    : props.isMulti && multiValues.length > 0
                                      ? ''
                                      : placeholder
                            }
                            autoComplete={'off'}
                        />
                    </div>

                    <div className={styles.actionsContainer}>
                        {(hasValue || inputValue) && !erLåst && (
                            <button
                                type={'button'}
                                aria-label={'Fjern valg'}
                                className={styles.clearButton}
                                onClick={handleOnClearClicked}
                            >
                                <XMarkIcon aria-hidden={'true'} width={14} height={14} />
                            </button>
                        )}
                        <button
                            type={'button'}
                            aria-label={'Vis valgmuligheter'}
                            className={styles.arrowButton}
                            disabled={erLåst}
                            tabIndex={-1}
                            onClick={handleOnDropdownArrowClicked}
                        >
                            <ChevronDownIcon
                                aria-hidden={'true'}
                                width={16}
                                height={16}
                                className={classNames({ [styles.arrowIconOpen]: isOpen })}
                            />
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
                        style={{ maxHeight: MAKS_LISTEHØYDE_PX }}
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
                                    // biome-ignore lint/a11y/useFocusableInteractive: Fokus skal bli i input-feltet, valgene markeres via aria-activedescendant
                                    <div
                                        key={option.value}
                                        id={getOptionId(option.value)}
                                        role={'option'}
                                        aria-selected={isSelected}
                                        aria-setsize={filteredOptions.length}
                                        aria-posinset={index + 1}
                                        className={classNames(styles.option, {
                                            [styles.optionFocused]: highlightedIndex === index,
                                            [styles.selectedOption]: isSelected,
                                        })}
                                        onClick={() => handleOnOptionSelected(option)}
                                        onMouseEnter={() => handleOnOptionMouseEntered(index)}
                                        onMouseMove={() => {
                                            isKeyboardNavRef.current = false;
                                            handleOnOptionMouseEntered(index);
                                        }}
                                        style={{
                                            height: `${virtualRow.size}px`,
                                            transform: `translateY(${virtualRow.start}px)`,
                                        }}
                                    >
                                        <FlagIcon regionCode={option.regionCode} size={'S'} />
                                        <span className={styles.optionText}>{option.label}</span>
                                        {isSelected && (
                                            <CheckmarkIcon
                                                aria-hidden={'true'}
                                                width={20}
                                                height={20}
                                                className={styles.checkmark}
                                            />
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
            <div id={errorId} aria-live={'polite'} aria-relevant={'all'} className={styles.error}>
                {showError && <ErrorMessage showIcon>{errorMessage}</ErrorMessage>}
            </div>
        </VStack>
    );
}
