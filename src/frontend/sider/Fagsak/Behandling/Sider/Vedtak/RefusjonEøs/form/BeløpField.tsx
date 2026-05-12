import { useController, useFormContext } from 'react-hook-form';

import { TextField } from '@navikt/ds-react';

import Styles from './BeløpField.module.css';
import { Fields, type FormValues } from './useRefusjonEøsForm';
import { isNumeric } from '../../../../../../../utils/eøsValidators';
import { erPositivtHeltall } from '../../../../../../../utils/validators';

const INTEGER_MAX_VALUE = 2_147_483_647;

interface Props {
    readOnly?: boolean;
}

export function BeløpField({ readOnly = false }: Props) {
    const { control } = useFormContext<FormValues>();

    const {
        field: { ref, name, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: Fields.BELOEP,
        control,
        rules: {
            validate: value => {
                if (!value) {
                    return 'Beløp er påkrevd.';
                }
                if (!isNumeric(value) || !erPositivtHeltall(value)) {
                    return 'Feil format. Skriv inn et gyldig siffer.';
                }
                if (Number(value) > INTEGER_MAX_VALUE) {
                    return `Beløpet kan ikke være høyere enn ${INTEGER_MAX_VALUE}.`;
                }
                return undefined;
            },
        },
    });

    return (
        <TextField
            ref={ref}
            name={name}
            label={'Refusjonsbeløp (kr/mnd)'}
            size={'small'}
            value={value}
            type={'text'}
            inputMode={'numeric'}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={readOnly || isSubmitting}
            error={error?.message}
            className={Styles.textfield}
        />
    );
}
