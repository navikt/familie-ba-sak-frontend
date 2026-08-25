import { useErLesevisning } from '@hooks/useErLesevisning';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { FieldLabel } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/field/FieldLabel';
import {
    RegistrerSøknadFormField,
    type RegistrerSøknadFormValues,
} from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/useRegistrerSøknadForm';
import { BehandlingUnderkategori, behandlingUnderkategori } from '@typer/behandlingstema';
import { useController, useFormContext } from 'react-hook-form';

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
