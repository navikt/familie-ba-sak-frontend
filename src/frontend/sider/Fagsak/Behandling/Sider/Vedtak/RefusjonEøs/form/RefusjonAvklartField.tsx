import { useController, useFormContext } from 'react-hook-form';

import { Radio, RadioGroup } from '@navikt/ds-react';

import { Fields, type FormValues } from './useRefusjonEøsForm';

interface Props {
    readOnly?: boolean;
}

export function RefusjonAvklartField({ readOnly = false }: Props) {
    const { control } = useFormContext<FormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: Fields.REFUSJON_AVKLART,
        control,
        rules: {
            validate: value => {
                if (value === undefined || value === null) {
                    return 'Du må oppgi om refusjon er avklart.';
                }
            },
        },
    });

    return (
        <RadioGroup
            legend={'Tekst i vedtaksbrev'}
            size={'small'}
            value={value}
            onChange={value => onChange(value)}
            error={error?.message}
            readOnly={readOnly || isSubmitting}
        >
            <Radio value={true}>Refusjon avklart</Radio>
            <Radio value={false}>Refusjon ikke avklart</Radio>
        </RadioGroup>
    );
}
