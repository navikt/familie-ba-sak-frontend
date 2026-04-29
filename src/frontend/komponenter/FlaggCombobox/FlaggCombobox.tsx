import type { KeyboardEvent } from 'react';
import { useState, useRef, useEffect, useId, useLayoutEffect, useMemo } from 'react';
import * as React from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';
import classNames from 'classnames';

import { ExclamationmarkTriangleFillIcon, PadlockLockedFillIcon } from '@navikt/aksel-icons';
import { ErrorMessage, HStack, Label, VStack } from '@navikt/ds-react';
import _Flag from '@navikt/flagg-ikoner';

import styles from './FlaggCombobox.module.css';
import { type Regionkode } from './RegionCombobox/region';
import { useMergedRef } from '../../hooks/useMergedRef';

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
    ref?: React.Ref<HTMLInputElement>;
};

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

    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [internalDropdownPlacement, setInternalDropdownPlacement] = useState<'bottom' | 'top'>('bottom');

    const singleValue = !props.isMulti ? (props.value as T | null | undefined) : null;
    const multiValues = props.isMulti ? (props.value as T[] | undefined) || [] : [];
    const hasValue = props.isMulti ? multiValues.length > 0 : singleValue !== null && singleValue !== undefined;

    const activeDropdownPlacement = dropdownPlacement === 'auto' ? internalDropdownPlacement : dropdownPlacement;

    const [inputValue, setInputValue] = useState(() => {
        if (props.isMulti) return '';
        const opt = options.find(o => o.value === singleValue);
        return opt ? opt.label : '';
    });

    const internalInputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const preventScrollRef = useRef(false);
    const isKeyboardNavRef = useRef(false);
    const anchorRef = useRef<HTMLDivElement>(null);

    const optionsMap = useMemo(() => {
        const map = new Map<T, FlaggComboboxOption<T>>();
        options.forEach(opt => map.set(opt.value, opt));
        return map;
    }, [options]);

    const filteredOptions = useMemo(() => {
        return options.filter(option => {
            if (inputValue === '') return true;
            return option.label.toLowerCase().includes(inputValue.toLowerCase());
        });
    }, [options, inputValue]);

    // eslint-disable-next-line react-hooks/incompatible-library
    const rowVirtualizer = useVirtualizer({
        count: filteredOptions.length,
        getScrollElement: () => listboxRef.current,
        estimateSize: estimateVirtualizerSize,
        overscan: 5,
    });

    const mergedInputRef = useMergedRef(ref, internalInputRef);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handleOutsideClick(event: MouseEvent | TouchEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setHighlightedIndex(0);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            if (!props.isMulti) {
                const selectedOpt = options.find(o => o.value === props.value);
                setInputValue(selectedOpt ? selectedOpt.label : '');
            } else {
                setInputValue('');
            }
        }
    }, [isOpen, props.isMulti, props.value, options]);

    useEffect(() => {
        if (isOpen && listboxRef.current) {
            if (preventScrollRef.current) {
                preventScrollRef.current = false;
                return;
            }
            requestAnimationFrame(() => {
                rowVirtualizer.scrollToIndex(highlightedIndex, { align: 'auto' });
            });
        }
    }, [isOpen, highlightedIndex, rowVirtualizer]);

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

    function handleOnWrapperPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) {
            event.preventDefault();
            if (readOnly) {
                return;
            }
            internalInputRef.current?.focus();
            handleInputInteraction();
        }
    }

    function handleOnInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
        setHighlightedIndex(0);
        if (!isOpen) {
            setIsOpen(true);
        }
    }

    function handleOnOptionSelected(option: FlaggComboboxOption<T>) {
        if (props.isMulti) {
            const isSelected = multiValues.includes(option.value);
            const newValues = isSelected ? multiValues.filter(v => v !== option.value) : [...multiValues, option.value];
            props.onChange(newValues);
            setInputValue('');
            internalInputRef.current?.focus();
        } else {
            if (singleValue === option.value) {
                props.onChange(null);
                setInputValue('');
            } else {
                props.onChange(option.value);
                setIsOpen(false);
            }
        }
    }

    function handleOnOptionMouseEntered(index: number) {
        if (isKeyboardNavRef.current) {
            return;
        }
        preventScrollRef.current = true;
        setHighlightedIndex(index);
    }

    function handleOnClearClicked(event: React.MouseEvent) {
        event.stopPropagation();
        if (props.isMulti) {
            props.onChange([]);
        } else {
            props.onChange(null);
        }
        setInputValue('');
        internalInputRef.current?.focus();
    }

    function handleInputInteraction() {
        if (readOnly) {
            return;
        }
        preventScrollRef.current = false;
        if (!isOpen) {
            setIsOpen(true);
            if (!props.isMulti) {
                setInputValue('');
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
                preventScrollRef.current = false;
                isKeyboardNavRef.current = true;
                setHighlightedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                event.preventDefault();
                preventScrollRef.current = false;
                isKeyboardNavRef.current = true;
                setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
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

    function handleOnDropdownArrowClicked(event: React.MouseEvent<HTMLButtonElement>) {
        if (readOnly) {
            return;
        }
        event.stopPropagation();
        event.preventDefault();
        if (isOpen) {
            setIsOpen(false);
        } else {
            internalInputRef.current?.focus();
            handleInputInteraction();
        }
    }

    function handleOnChipRemoved(event: React.MouseEvent<HTMLButtonElement>, valToRemove: T) {
        if (!props.isMulti || readOnly) {
            return;
        }
        event.stopPropagation();
        props.onChange(multiValues.filter(v => v !== valToRemove));
        internalInputRef.current?.focus();
    }

    const selectedSingleOption = !props.isMulti ? options.find(opt => opt.value === singleValue) : null;
    const errorMessage = error instanceof Error ? error.message : error;

    return (
        <VStack gap={'space-4'} className={classNames(styles.container, className)} ref={containerRef}>
            <HStack wrap={false} align={'center'} gap={'space-4'} paddingBlock={'space-2'}>
                {readOnly && <PadlockLockedFillIcon />}
                <Label size={'medium'} htmlFor={inputId}>
                    {label}
                </Label>
            </HStack>
            <div className={styles.relativeAnchor} ref={anchorRef}>
                <div
                    className={classNames(styles.inputWrapper, {
                        [styles.inputWrapperMulti]: props.isMulti,
                        [styles.inputWrapperSingle]: !props.isMulti,
                        [styles.inputWrapperError]: errorMessage && !readOnly,
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
                        {selectedSingleOption?.regionCode && (
                            <div className={styles.selectedFlag}>
                                <Flag
                                    country={selectedSingleOption.regionCode.toString()}
                                    type={'circle'}
                                    size={'S'}
                                    animate={false}
                                    wave={false}
                                />
                            </div>
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
                                        <Flag
                                            label={opt.label}
                                            country={opt.regionCode.toString()}
                                            type={'circle'}
                                            size={'XS'}
                                            animate={false}
                                            wave={false}
                                            className={styles.chipFlag}
                                        />
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
                            onFocus={handleInputInteraction}
                            onKeyDown={handleOnKeyDownPressed}
                            readOnly={readOnly}
                            tabIndex={readOnly ? 0 : undefined}
                            role={'combobox'}
                            aria-expanded={isOpen}
                            aria-controls={isOpen ? `${inputId}-listbox` : undefined}
                            aria-autocomplete={'list'}
                            aria-invalid={!!errorMessage && !readOnly}
                            aria-errormessage={errorMessage && !readOnly ? `${inputId}-error` : undefined}
                            aria-activedescendant={
                                isOpen && filteredOptions[highlightedIndex]
                                    ? `${inputId}-option-${filteredOptions[highlightedIndex].value}`
                                    : undefined
                            }
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
                    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
                    <div
                        id={`${inputId}-listbox`}
                        className={classNames(
                            styles.dropdown,
                            activeDropdownPlacement === 'top' ? styles.dropdownTop : styles.dropdownBottom
                        )}
                        role={'listbox'}
                        ref={listboxRef}
                        onMouseMove={() => (isKeyboardNavRef.current = false)}
                    >
                        {filteredOptions.length > 0 ? (
                            <div
                                role={'presentation'}
                                style={{
                                    height: `${rowVirtualizer.getTotalSize()}px`,
                                    width: '100%',
                                    position: 'relative',
                                }}
                            >
                                {rowVirtualizer.getVirtualItems().map(virtualRow => {
                                    const option = filteredOptions[virtualRow.index];
                                    const index = virtualRow.index;
                                    const isSelected = props.isMulti
                                        ? multiValues.includes(option.value)
                                        : singleValue === option.value;
                                    return (
                                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
                                        <div
                                            key={option.value}
                                            id={`${inputId}-option-${option.value}`}
                                            role={'option'}
                                            aria-selected={isSelected}
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
                                            <div className={styles.optionFlagContainer} aria-hidden={'true'}>
                                                <Flag
                                                    country={option.regionCode.toString()}
                                                    type={'circle'}
                                                    size={'S'}
                                                    animate={false}
                                                    wave={false}
                                                    className={styles.optionFlag}
                                                />
                                            </div>
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
                        ) : (
                            <div role={'status'} className={styles.noResults}>
                                Fant ingen treff
                            </div>
                        )}
                    </div>
                )}
            </div>
            {errorMessage && !readOnly && (
                <HStack align={'center'} gap={'space-6'} marginBlock={'space-4 space-0'} wrap={false}>
                    <ExclamationmarkTriangleFillIcon
                        title={'feil'}
                        fontSize={'1.05rem'}
                        className={styles.errorMessageIcon}
                    />
                    <ErrorMessage id={`${inputId}-error`}>{errorMessage}</ErrorMessage>
                </HStack>
            )}
        </VStack>
    );
}
