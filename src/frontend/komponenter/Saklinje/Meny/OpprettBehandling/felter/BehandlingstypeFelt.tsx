import { useFagsak } from '@hooks/useFagsak';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import {
    OpprettBehandlingFelt,
    type OpprettBehandlingFormValues,
} from '@komponenter/Saklinje/Meny/OpprettBehandling/useOpprettBehandlingSkjema';
import { BehandlingStatus, Behandlingstype, BehandlingÅrsak, erBehandlingHenlagt } from '@typer/behandling';
import { FagsakStatus } from '@typer/fagsak';
import { Klagebehandlingstype } from '@typer/klage';
import { Tilbakekrevingsbehandlingstype } from '@typer/tilbakekrevingsbehandling';
import { hentAktivBehandlingPåMinimalFagsak } from '@utils/fagsak';
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

    const behandling = fagsak ? hentAktivBehandlingPåMinimalFagsak(fagsak) : undefined;
    const harIkkeAktivBehandling = !behandling || behandling?.status === BehandlingStatus.AVSLUTTET;

    const kanOppretteFørstegangsbehandling =
        fagsak === undefined || (fagsak.status !== FagsakStatus.LØPENDE && harIkkeAktivBehandling);
    const kanOppretteRevurdering =
        harIkkeAktivBehandling &&
        (fagsak?.behandlinger.some(behandling => !erBehandlingHenlagt(behandling.resultat)) ?? false);
    const kanOppretteTekniskEndring = harIkkeAktivBehandling && saksbehandler.harSuperbrukertilgang;
    const kanOppretteKlagebehandling = fagsak !== undefined && !fagsak.finnesStrengtFortroligPersonIFagsak;

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
            {kanOppretteFørstegangsbehandling && (
                <option
                    aria-selected={value === Behandlingstype.FØRSTEGANGSBEHANDLING}
                    value={Behandlingstype.FØRSTEGANGSBEHANDLING}
                >
                    Førstegangsbehandling
                </option>
            )}
            {kanOppretteRevurdering && (
                <option aria-selected={value === Behandlingstype.REVURDERING} value={Behandlingstype.REVURDERING}>
                    Revurdering
                </option>
            )}
            {kanOppretteTekniskEndring && (
                <option
                    aria-selected={value === Behandlingstype.TEKNISK_ENDRING}
                    value={Behandlingstype.TEKNISK_ENDRING}
                >
                    Teknisk endring
                </option>
            )}
            <option
                aria-selected={value === Tilbakekrevingsbehandlingstype.TILBAKEKREVING}
                value={Tilbakekrevingsbehandlingstype.TILBAKEKREVING}
            >
                Tilbakekreving
            </option>
            {kanOppretteKlagebehandling && (
                <option aria-selected={value === Klagebehandlingstype.KLAGE} value={Klagebehandlingstype.KLAGE}>
                    Klage
                </option>
            )}
            {harIkkeAktivBehandling && (
                <option
                    aria-selected={value === Behandlingstype.MIGRERING_FRA_INFOTRYGD}
                    value={Behandlingstype.MIGRERING_FRA_INFOTRYGD}
                >
                    Migrering fra infotrygd
                </option>
            )}
        </Select>
    );
}
