import { useErLesevisning } from '@hooks/useErLesevisning';
import { FieldLabel } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/field/FieldLabel';
import {
    RegistrerSøknadFormField,
    type RegistrerSøknadFormValues,
} from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/useRegistrerSøknadForm';
import { målform, Målform } from '@typer/søknad';
import { useController, useFormContext } from 'react-hook-form';

import { Radio, RadioGroup } from '@navikt/ds-react';

export function MålformField() {
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<RegistrerSøknadFormValues>();

    const {
        field: { name, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: RegistrerSøknadFormField.MÅLFORM,
        control,
        rules: { required: 'Målform er påkrevd.' },
    });

    return (
        <RadioGroup
            id={name}
            name={name}
            legend={<FieldLabel label={'Målform'} />}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={erLesevisning || isSubmitting}
            error={error?.message}
        >
            <Radio value={Målform.NB}>{målform[Målform.NB]}</Radio>
            <Radio value={Målform.NN}>{målform[Målform.NN]}</Radio>
        </RadioGroup>
    );
}
