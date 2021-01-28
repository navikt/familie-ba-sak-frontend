import React from 'react';

import { FamilieReactSelect } from '@navikt/familie-form-elements';

import { Behandlingstype, BehandlingÅrsak } from '../../../typer/behandling';
import { PropType, tilAlternativ, tilPropType } from './SelectFormatter';

export interface BehandlingspropSelectProps<T extends PropType> {
    options: PropType[];
    value: PropType;
    label: string;
    onChange: (value: T) => void;
}

export const BehandlingspropSelect = <T extends PropType>({
    options,
    value,
    label,
    onChange,
}: BehandlingspropSelectProps<T>) => {
    const behandlingstyper = options.map(type => {
        return {
            value: tilAlternativ(type),
            label: tilAlternativ(type),
        };
    });

    return (
        <FamilieReactSelect
            creatable={false}
            erLesevisning={false}
            label={label}
            id="select"
            isMulti={false}
            options={behandlingstyper}
            value={{
                value: tilAlternativ(value),
                label: tilAlternativ(value),
            }}
            onChange={value => {
                if (value && 'value' in value) {
                    onChange(tilPropType(value.value));
                }
            }}
        />
    );
};

export const BehandlingstypeSelect = ({
    options,
    value,
    label,
    onChange,
}: BehandlingspropSelectProps<Behandlingstype>) =>
    BehandlingspropSelect<Behandlingstype>({ options, value, label, onChange });

export const BehandlingsårsakSelect = ({
    options,
    value,
    label,
    onChange,
}: BehandlingspropSelectProps<BehandlingÅrsak>) =>
    BehandlingspropSelect<BehandlingÅrsak>({ options, value, label, onChange });
