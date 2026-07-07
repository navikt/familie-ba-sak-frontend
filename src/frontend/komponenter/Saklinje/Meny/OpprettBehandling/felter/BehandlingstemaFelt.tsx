import { useFagsak } from '@hooks/useFagsak';
import {
    OpprettBehandlingFelt,
    type OpprettBehandlingFormValues,
} from '@komponenter/Saklinje/Meny/OpprettBehandling/useOpprettBehandlingSkjema';
import { BehandlingKategori, behandlingstemaer, konverterTilBehandlingstema } from '@typer/behandlingstema';
import { FagsakType } from '@typer/fagsak';
import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

export const BehandlingstemaFelt = () => {
    const fagsak = useFagsak();

    const { control } = useFormContext<OpprettBehandlingFormValues>();
    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: OpprettBehandlingFelt.BEHANDLINGSTEMA,
        control,
        rules: {
            required: 'Behandlingstema må velges.',
        },
    });

    return (
        <Select
            label={'Velg behandlingstema'}
            readOnly={isSubmitting}
            value={value?.id}
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
                        <option key={tema.id} aria-selected={value?.id === tema.id} value={tema.id}>
                            {tema.navn}
                        </option>
                    );
                })}
        </Select>
    );
};
