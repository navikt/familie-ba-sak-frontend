import { useStableArray } from '@hooks/useStableArray';
import { useMemo } from 'react';
import { FlaggCombobox, type FlaggComboboxKodeProps } from '../FlaggCombobox';
import { REGIONKODE_TIL_LABEL, type Regionkode } from './region';

export function RegionCombobox({ options, ...rest }: FlaggComboboxKodeProps<Regionkode>) {
    const stableOptions = useStableArray(options);

    const regionOptions = useMemo(() => {
        return stableOptions.map(regionCode => ({
            value: regionCode,
            label: REGIONKODE_TIL_LABEL[regionCode],
            regionCode: regionCode,
        }));
    }, [stableOptions]);

    return <FlaggCombobox {...rest} options={regionOptions} />;
}
