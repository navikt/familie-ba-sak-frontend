import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { useFagsakContext } from '../sider/Fagsak/FagsakContext';
import { BehandlingKategori, behandlingstemaer, type IBehandlingstema } from '../typer/behandlingstema';
import { FagsakType } from '../typer/fagsak';
import {
    EndreBehandlingstemaFelt,
    type EndreBehandlingstemaFormValues,
} from './Saklinje/Meny/EndreBehandling/useEndreBehandlingstemaSkjema';
import { useBehandlingContext } from '../sider/Fagsak/Behandling/context/BehandlingContext';

export const BehandlingstemaSelect = () => {
    const { fagsak } = useFagsakContext();
    const { vurderErLesevisning } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();

    const { control } = useFormContext<EndreBehandlingstemaFormValues>();
    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: EndreBehandlingstemaFelt.BEHANDLINGSTEMA,
        control,
        rules: {
            required: 'Behandlingstema må velges.',
        },
    });

    const konverterTilBehandlingstema = (behandlingstemaId: string): IBehandlingstema => {
        return Object.values(behandlingstemaer).find(it => it.id === behandlingstemaId)!;
    };

    return (
        <Select
            label={'Velg behandlingstema'}
            readOnly={erLesevisning || isSubmitting}
            disabled={isSubmitting}
            value={value?.id}
            onChange={event => {
                onChange(konverterTilBehandlingstema(event.target.value));
            }}
            error={error?.message}
        >
            {value === undefined && (
                <option disabled key={'behandlingstema-select-disabled'} value={''} aria-selected={true}>
                    Velg behandlingstema
                </option>
            )}
            {Object.values(behandlingstemaer)
                .filter(it => it.id !== 'NASJONAL_INSTITUSJON')
                .filter(
                    it =>
                        it.kategori !== BehandlingKategori.EØS ||
                        fagsak.fagsakType !== FagsakType.BARN_ENSLIG_MINDREÅRIG
                )
                .map(tema => {
                    return (
                        <option key={tema.id} aria-selected={value?.id === tema.id} value={tema.id}>
                            {tema.navn}
                        </option>
                    );
                })}
        </Select>
    );
};
