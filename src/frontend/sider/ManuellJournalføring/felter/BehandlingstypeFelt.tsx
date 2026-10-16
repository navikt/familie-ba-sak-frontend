import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { Select } from '@navikt/ds-react';
import {
    type ManuellJournalføringSkjemaFelter,
    useManuellJournalføringContext,
} from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import { behandlingstyper } from '@typer/behandling';
import { hentTilgjengeligeBehandlingstyper } from '@utils/behandling';

interface BehandlingstypeFeltProps {
    erLesevisning: boolean;
}

export function BehandlingstypeFelt({ erLesevisning }: BehandlingstypeFeltProps) {
    const { skjema, minimalFagsak } = useManuellJournalføringContext();
    const saksbehandler = useSaksbehandler();

    const tilgjengeligeBehandlingstyper = hentTilgjengeligeBehandlingstyper(minimalFagsak, saksbehandler, true);

    return (
        <Select
            {...skjema.felter.behandlingstype.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
            readOnly={erLesevisning}
            name={'Behandling'}
            label={'Velg type behandling'}
            onChange={event => {
                skjema.felter.behandlingstype.onChange(
                    event.target.value as ManuellJournalføringSkjemaFelter['behandlingstype']
                );
            }}
        >
            <option disabled={true} value={''}>
                Velg
            </option>
            {tilgjengeligeBehandlingstyper.map(type => (
                <option key={type} aria-selected={skjema.felter.behandlingstype.verdi === type} value={type}>
                    {behandlingstyper[type].navn}
                </option>
            ))}
        </Select>
    );
}
