import type { ChangeEvent } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { EndreBehandlendeEnhetFormFields, type EndreBehandlendeEnhetFormValues } from './useEndreBehandlendeEnhetForm';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { behandlendeEnheter } from '../../../../typer/enhet';

interface Props {
    readOnly: boolean;
}

export function VelgNyEnhetField({ readOnly }: Props) {
    const { behandling } = useBehandlingContext();

    const { control, clearErrors } = useFormContext<EndreBehandlendeEnhetFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: EndreBehandlendeEnhetFormFields.ENHET_ID,
        control,
        rules: { required: 'Enhet må velges.' },
    });

    function handleOnChange(event: ChangeEvent<HTMLSelectElement>) {
        clearErrors('root');
        onChange(event.target.value);
    }

    return (
        <Select
            label={'Velg ny enhet'}
            value={value}
            onChange={handleOnChange}
            readOnly={readOnly || isSubmitting}
            error={error?.message}
        >
            {behandlendeEnheter.map(enhet => {
                return (
                    <option
                        key={enhet.enhetId}
                        value={enhet.enhetId}
                        aria-selected={value === enhet.enhetId}
                        disabled={behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId === enhet.enhetId}
                    >
                        {`${enhet.enhetId} ${enhet.enhetNavn}`}
                    </option>
                );
            })}
        </Select>
    );
}
