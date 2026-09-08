import { useBehandling } from '@hooks/useBehandling';
import { Select } from '@navikt/ds-react';
import { behandlendeEnheter, UKJENT_ENHET } from '@typer/enhet';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { EndreBehandlendeEnhetFormFields, type EndreBehandlendeEnhetFormValues } from './useEndreBehandlendeEnhetForm';

interface Props {
    readOnly: boolean;
}

export function VelgNyEnhetField({ readOnly }: Props) {
    const behandling = useBehandling();

    const { control, clearErrors } = useFormContext<EndreBehandlendeEnhetFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: EndreBehandlendeEnhetFormFields.ENHET_ID,
        control,
        rules: {
            required: 'Enhet må velges.',
            validate: value => {
                const erValgbarEnhet = behandlendeEnheter
                    .map(arbeidsfordelingsenhet => arbeidsfordelingsenhet.enhetId)
                    .some(enhetId => enhetId === value);
                if (value === UKJENT_ENHET || !erValgbarEnhet) {
                    return 'Enhet må velges.';
                }
            },
        },
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
            <option value={UKJENT_ENHET} aria-selected={value === UKJENT_ENHET} disabled={true}>
                - Velg enhet -
            </option>
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
