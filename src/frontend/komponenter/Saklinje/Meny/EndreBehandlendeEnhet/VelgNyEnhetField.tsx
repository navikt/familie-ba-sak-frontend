import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { EndreBehandlendeEnhetFormFields, type EndreBehandlendeEnhetFormValues } from './useEndreBehandlendeEnhetForm';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { behandendeEnheter, type IArbeidsfordelingsenhet } from '../../../../typer/enhet';

interface Props {
    readOnly: boolean;
}

export function VelgNyEnhetField({ readOnly }: Props) {
    const { behandling } = useBehandlingContext();

    const { control } = useFormContext<EndreBehandlendeEnhetFormValues>();
    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: EndreBehandlendeEnhetFormFields.ENHET_ID,
        control,
        rules: {
            required: 'Enhet må velges.',
        },
    });

    return (
        <Select
            disabled={isSubmitting}
            readOnly={readOnly}
            name="enhet"
            value={value}
            label={'Velg ny enhet'}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                onChange(event.target.value);
            }}
            error={error?.message}
        >
            {behandendeEnheter.map((enhet: IArbeidsfordelingsenhet) => {
                return (
                    <option
                        aria-selected={value === enhet.enhetId}
                        key={enhet.enhetId}
                        value={enhet.enhetId}
                        disabled={behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId === enhet.enhetId}
                    >
                        {`${enhet.enhetId} ${enhet.enhetNavn}`}
                    </option>
                );
            })}
        </Select>
    );
}
