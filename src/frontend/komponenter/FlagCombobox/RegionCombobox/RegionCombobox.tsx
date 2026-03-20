import React, { type Ref, useMemo } from 'react';

import { FlagCombobox } from '../FlagCombobox';
import { REGION_CODE_LABELS, type RegionCode } from './region';

interface RegionComboboxBaseProps {
    options: RegionCode[];
    label: string;
    error?: string | Error;
    readOnly?: boolean;
    placeholder?: string;
    className?: string;
}

interface RegionComboboxSingleProps extends RegionComboboxBaseProps {
    isMulti?: false;
    value: RegionCode | undefined | null;
    onChange: (value: RegionCode | null) => void;
}

interface RegionComboboxMultiProps extends RegionComboboxBaseProps {
    isMulti: true;
    value: RegionCode[] | undefined;
    onChange: (value: RegionCode[]) => void;
}

type RegionComboboxProps = (RegionComboboxSingleProps | RegionComboboxMultiProps) & {
    ref?: Ref<HTMLInputElement>;
};

export function RegionCombobox({ options, ...rest }: RegionComboboxProps) {
    const regionOptions = useMemo(() => {
        return options.map(regionCode => ({
            value: regionCode,
            label: REGION_CODE_LABELS[regionCode],
            regionCode: regionCode,
        }));
    }, [options]);

    return <FlagCombobox {...rest} options={regionOptions} />;
}
