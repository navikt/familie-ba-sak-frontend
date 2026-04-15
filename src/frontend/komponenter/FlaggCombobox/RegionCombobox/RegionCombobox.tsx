import React, { type Ref, useMemo } from 'react';

import { FlaggCombobox } from '../FlaggCombobox';
import { REGIONKODE_TIL_LABEL, type Regionkode } from './region';

interface RegionComboboxBaseProps {
    options: Regionkode[];
    label: string;
    error?: string | Error;
    readOnly?: boolean;
    placeholder?: string;
    dropdownPlacement?: 'bottom' | 'top' | 'auto';
    className?: string;
}

interface RegionComboboxSingleProps extends RegionComboboxBaseProps {
    isMulti?: false;
    value: Regionkode | undefined | null;
    onChange: (value: Regionkode | null) => void;
}

interface RegionComboboxMultiProps extends RegionComboboxBaseProps {
    isMulti: true;
    value: Regionkode[] | undefined;
    onChange: (value: Regionkode[]) => void;
}

type RegionComboboxProps = (RegionComboboxSingleProps | RegionComboboxMultiProps) & {
    ref?: Ref<HTMLInputElement>;
};

export function RegionCombobox({ options, ...rest }: RegionComboboxProps) {
    const regionOptions = useMemo(() => {
        return options.map(regionCode => ({
            value: regionCode,
            label: REGIONKODE_TIL_LABEL[regionCode],
            regionCode: regionCode,
        }));
    }, [options]);

    return <FlaggCombobox {...rest} options={regionOptions} />;
}
