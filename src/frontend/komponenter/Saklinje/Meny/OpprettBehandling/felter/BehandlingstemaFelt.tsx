import { useFagsak } from '@hooks/useFagsak';
import {
    OpprettBehandlingFelt,
    type OpprettBehandlingFormValues,
} from '@komponenter/Saklinje/Meny/OpprettBehandling/useOpprettBehandlingSkjema';
import { Select } from '@navikt/ds-react';
import { konverterTilBehandlingstema } from '@typer/behandlingstema';
import { hentTilgjengeligeBehandlingstemaer } from '@utils/behandling';
import { useController, useFormContext } from 'react-hook-form';

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
            value={value?.id ?? ''}
            onChange={event => {
                onChange(konverterTilBehandlingstema(event.target.value));
            }}
            error={error?.message}
        >
            <option disabled value={''}>
                Velg behandlingstema
            </option>
            {hentTilgjengeligeBehandlingstemaer(fagsak.fagsakType).map(tema => (
                <option key={tema.id} aria-selected={value?.id === tema.id} value={tema.id}>
                    {tema.navn}
                </option>
            ))}
        </Select>
    );
};
