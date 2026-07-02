import { useErLesevisning } from '@hooks/useErLesevisning';
import { FieldLabel } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/field/FieldLabel';
import {
    RegistrerSøknadFormField,
    type RegistrerSøknadFormValues,
} from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/useRegistrerSøknadForm';
import { useController, useFormContext } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

import Styles from './BegrunnelseField.module.css';

export function BegrunnelseField() {
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<RegistrerSøknadFormValues>();

    const {
        field: { name, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: RegistrerSøknadFormField.BEGRUNNELSE,
        control,
        rules: {
            maxLength: { value: 2000, message: 'Maks 2000 tegn.' },
        },
    });

    return (
        <Textarea
            id={name}
            name={name}
            label={<FieldLabel label={'Annet'} />}
            description={'Ved endring av opplysningene er begrunnelse obligatorisk'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            maxLength={2000}
            error={error?.message}
            readOnly={erLesevisning || isSubmitting}
            className={Styles.felt}
        />
    );
}
