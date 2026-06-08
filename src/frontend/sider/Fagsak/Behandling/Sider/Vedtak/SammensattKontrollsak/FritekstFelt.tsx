import { useController, useFormContext } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

import { SammensattKontrollsakFormField, type SammensattKontrollsakFormValues } from './useSammensattKontrollsakForm';

export function FritekstFelt({ erLesevisning }: { erLesevisning: boolean }) {
    const { control } = useFormContext<SammensattKontrollsakFormValues>();
    const {
        field: { value, onBlur, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: SammensattKontrollsakFormField.FRITEKST,
        control,
        rules: {
            validate: value => {
                if (!value.trim()) {
                    return 'Fritekst til vedtaksbrev kan ikke være tom.';
                }
            },
        },
    });

    return (
        <Textarea
            label={'Fritekst til vedtaksbrev'}
            description={
                'Her skal du skrive hvilke vurderinger som er gjort, hvilken informasjon som er lagt til grunn og hvilke hjemler som er brukt.'
            }
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            error={error?.message}
            minRows={20}
            readOnly={erLesevisning || isSubmitting}
        />
    );
}
