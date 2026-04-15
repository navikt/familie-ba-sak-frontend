import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { EndreBehandlingstemaFelt, type EndreBehandlingstemaFormValues } from './useEndreBehandlingstemaSkjema';
import { useFagsakContext } from '../../../../sider/Fagsak/FagsakContext';
import { BehandlingKategori, behandlingstemaer, type IBehandlingstema } from '../../../../typer/behandlingstema';
import { FagsakType } from '../../../../typer/fagsak';

interface Props {
    erLesevisning: boolean;
}

export const BehandlingstemaSelect = ({ erLesevisning }: Props) => {
    const { fagsak } = useFagsakContext();

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
        return behandlingstemaer[behandlingstemaId as keyof typeof behandlingstemaer];
    };

    return (
        <Select
            label={'Velg behandlingstema'}
            readOnly={erLesevisning || isSubmitting}
            value={value.id}
            onChange={event => {
                onChange(konverterTilBehandlingstema(event.target.value));
            }}
            error={error?.message}
        >
            {Object.values(behandlingstemaer)
                .filter(it => it.id !== 'NASJONAL_INSTITUSJON')
                .filter(
                    it =>
                        it.kategori !== BehandlingKategori.EØS ||
                        fagsak.fagsakType !== FagsakType.BARN_ENSLIG_MINDREÅRIG
                )
                .map(tema => {
                    return (
                        <option key={tema.id} aria-selected={value.id === tema.id} value={tema.id}>
                            {tema.navn}
                        </option>
                    );
                })}
        </Select>
    );
};
