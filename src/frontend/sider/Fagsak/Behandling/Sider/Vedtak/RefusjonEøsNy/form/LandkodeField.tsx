import { useId } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import Styles from './LandkodeField.module.css';
import { Fields, type FormValues } from './useRefusjonEøsForm';
import { FamilieLandvelger } from '../../../Behandlingsresultat/Eøs/EøsKomponenter/FamilieLandvelger';

interface Props {
    readOnly?: boolean;
}

export function LandkodeField({ readOnly = false }: Props) {
    const id = useId();

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
        <FamilieLandvelger
            id={`refusjon-eøs-form${id}`}
            label={'EØS-land'}
            kunEøs={true}
            eksluderLand={['NO']}
            value={value}
            onChange={value => onChange(value.value)}
            erLesevisning={readOnly || isSubmitting}
            feil={error?.message}
            className={Styles.landvelger}
        />
    );
}
