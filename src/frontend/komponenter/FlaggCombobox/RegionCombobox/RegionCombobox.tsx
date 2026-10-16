import { useMemo } from 'react';

import { FlaggCombobox, type FlaggComboboxKodeProps } from '../FlaggCombobox';
import { REGIONKODE_TIL_LABEL, type Regionkode } from './region';

export function RegionCombobox({ options, ...rest }: FlaggComboboxKodeProps<Regionkode>) {
    const regionOptions = useMemo(() => {
        return options.map(regionCode => ({
            value: regionCode,
            label: REGIONKODE_TIL_LABEL[regionCode],
            regionCode: regionCode,
        }));
    }, [options]);

    return <FlaggCombobox {...rest} options={regionOptions} />;
}
