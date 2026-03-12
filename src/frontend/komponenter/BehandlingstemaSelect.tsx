import React from 'react';

import { useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { BehandlingKategori, behandlingstemaer } from '../typer/behandlingstema';
import { FagsakType } from '../typer/fagsak';
import {
    EndreBehandlingstemaFelt,
    type EndreBehandlingstemaFormValues,
} from './Saklinje/Meny/EndreBehandling/useEndreBehandlingstema';

interface Props {
    fagsakType: FagsakType | undefined;
    visFeilmeldinger?: boolean;
}

export const BehandlingstemaSelect = ({ fagsakType, visFeilmeldinger = false }: Props) => {
    const {
        register,
        formState: { isSubmitting, errors },
    } = useFormContext<EndreBehandlingstemaFormValues>();
    return (
        <Select
            {...register(EndreBehandlingstemaFelt.BEHANDLINGSTEMA, { required: 'Velg et behandlingstema' })}
            label={'Velg behandlingstema'}
            readOnly={isSubmitting}
            disabled={isSubmitting}
            error={errors.root?.message}
        >
            {Object.values(behandlingstemaer)
                .filter(it => it.id !== 'NASJONAL_INSTITUSJON')
                .filter(
                    it => it.kategori !== BehandlingKategori.EØS || fagsakType !== FagsakType.BARN_ENSLIG_MINDREÅRIG
                )
                .map(tema => {
                    return (
                        <option key={tema.id} value={tema.id}>
                            {tema.navn}
                        </option>
                    );
                })}
        </Select>
    );
    /*
        <Select
            {...behandlingstema.hentNavInputProps(visFeilmeldinger)}
            value={verdi !== undefined ? verdi.id : ''}
            label={'Velg behandlingstema'}
            onChange={evt => {
                behandlingstema.validerOgSettFelt(behandlingstemaer[evt.target.value as Behandlingstema]);
            }}
            readOnly={erLesevisning}
        >
            {verdi === undefined && (
                <option disabled key={'behandlingstema-select-disabled'} value={''} aria-selected={true}>
                    Velg behandlingstema
                </option>
            )}
            {Object.values(behandlingstemaer)
                .filter(it => it.id !== 'NASJONAL_INSTITUSJON')
                .filter(
                    it => it.kategori !== BehandlingKategori.EØS || fagsakType !== FagsakType.BARN_ENSLIG_MINDREÅRIG
                )
                .map(tema => {
                    return (
                        <option
                            key={tema.id}
                            aria-selected={verdi !== undefined && verdi.id === tema.id}
                            value={tema.id}
                        >
                            {tema.navn}
                        </option>
                    );
                })}
        </Select>
    );
         */
};
