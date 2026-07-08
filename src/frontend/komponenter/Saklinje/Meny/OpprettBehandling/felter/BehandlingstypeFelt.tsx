import { useFagsak } from '@hooks/useFagsak';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import {
    OpprettBehandlingFelt,
    type OpprettBehandlingFormValues,
} from '@komponenter/Saklinje/Meny/OpprettBehandling/useOpprettBehandlingSkjema';
import { Behandlingstype, behandlingstyper, BehandlingÅrsak } from '@typer/behandling';
import { hentTilgjengeligeBehandlingstyper } from '@utils/behandling';
import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

export function BehandlingstypeFelt() {
    const fagsak = useFagsak();
    const saksbehandler = useSaksbehandler();

    const { control, setValue, reset } = useFormContext<OpprettBehandlingFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: OpprettBehandlingFelt.BEHANDLINGSTYPE,
        control,
        rules: {
            required: 'Velg type behandling som skal opprettes fra nedtrekkslisten.',
        },
    });

    function handleOnChange(event: React.ChangeEvent<HTMLSelectElement>) {
        reset();

        const nyVerdi = event.target.value;
        onChange(nyVerdi);

        if (nyVerdi === Behandlingstype.FØRSTEGANGSBEHANDLING) {
            setValue(OpprettBehandlingFelt.BEHANDLINGSÅRSAK, BehandlingÅrsak.SØKNAD);
        } else if (nyVerdi === Behandlingstype.TEKNISK_ENDRING) {
            setValue(OpprettBehandlingFelt.BEHANDLINGSÅRSAK, BehandlingÅrsak.TEKNISK_ENDRING);
        }
    }

    return (
        <Select
            label={'Velg type behandling'}
            readOnly={isSubmitting}
            value={value}
            onChange={handleOnChange}
            error={error?.message}
        >
            <option disabled={true} value={''}>
                Velg
            </option>
            {hentTilgjengeligeBehandlingstyper(fagsak, saksbehandler).map(type => (
                <option key={type} aria-selected={value === type} value={type}>
                    {behandlingstyper[type].navn}
                </option>
            ))}
        </Select>
    );
}
