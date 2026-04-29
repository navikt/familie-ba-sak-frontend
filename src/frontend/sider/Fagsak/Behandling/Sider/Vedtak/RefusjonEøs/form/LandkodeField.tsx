import { useController, useFormContext } from 'react-hook-form';

import Styles from './LandkodeField.module.css';
import { Fields, type FormValues } from './useRefusjonEøsForm';
import { EØS_LAND_REGIONKODER, RegionCombobox, type Regionkode } from '../../../../../../../komponenter/FlaggCombobox';

interface Props {
    readOnly?: boolean;
}

export function LandkodeField({ readOnly = false }: Props) {
    const { control } = useFormContext<FormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: Fields.LANDKODE,
        control,
        rules: { required: 'Du må velge et land.' },
    });

    return (
        <RegionCombobox
            label={'EØS-land'}
            value={value as Regionkode}
            options={EØS_LAND_REGIONKODER.filter(regionkode => regionkode !== 'NO')}
            onChange={value => onChange(value)}
            readOnly={readOnly || isSubmitting}
            error={error?.message}
            className={Styles.landvelger}
        />
    );
}
