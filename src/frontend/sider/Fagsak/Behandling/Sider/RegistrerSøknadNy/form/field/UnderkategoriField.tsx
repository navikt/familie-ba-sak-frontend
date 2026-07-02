import { useErLesevisning } from '@hooks/useErLesevisning';
import { FieldLabel } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/field/FieldLabel';
import {
    RegistrerSøknadFormField,
    type RegistrerSøknadFormValues,
} from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/useRegistrerSøknadForm';
import { behandlingUnderkategori, BehandlingUnderkategori } from '@typer/behandlingstema';
import { useController, useFormContext } from 'react-hook-form';

import { Radio, RadioGroup } from '@navikt/ds-react';

export function UnderkategoriField() {
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<RegistrerSøknadFormValues>();

    const {
        field: { name, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: RegistrerSøknadFormField.UNDERKATEGORI,
        control,
        rules: { required: 'Kategori er påkrevd.' },
    });

    return (
        <RadioGroup
            id={name}
            name={name}
            legend={<FieldLabel label={'Hva har bruker søkt om?'} />}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={erLesevisning || isSubmitting}
            error={error?.message}
        >
            <Radio value={BehandlingUnderkategori.ORDINÆR}>
                {behandlingUnderkategori[BehandlingUnderkategori.ORDINÆR]}
            </Radio>
            <Radio value={BehandlingUnderkategori.UTVIDET}>
                {behandlingUnderkategori[BehandlingUnderkategori.UTVIDET]}
            </Radio>
        </RadioGroup>
    );
}
