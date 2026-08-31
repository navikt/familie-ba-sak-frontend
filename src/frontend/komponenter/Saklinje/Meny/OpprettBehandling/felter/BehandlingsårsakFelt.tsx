import { useFagsak } from '@hooks/useFagsak';
import {
    OpprettBehandlingFelt,
    type OpprettBehandlingFormValues,
} from '@komponenter/Saklinje/Meny/OpprettBehandling/useOpprettBehandlingSkjema';
import { Select } from '@navikt/ds-react';
import { BehandlingStatus, Behandlingstype, behandlingÅrsak, erBehandlingHenlagt } from '@typer/behandling';
import { FagsakStatus } from '@typer/fagsak';
import { forrigeBehandlingVarTekniskEndringMedOpphør, hentTilgjengeligeBehandlingsårsaker } from '@utils/behandling';
import { hentAktivBehandlingPåMinimalFagsak } from '@utils/fagsak';
import { useController, useFormContext } from 'react-hook-form';

export function BehandlingsårsakFelt() {
    const fagsak = useFagsak();

    const { control, watch } = useFormContext<OpprettBehandlingFormValues>();
    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: OpprettBehandlingFelt.BEHANDLINGSÅRSAK,
        control,
        rules: {
            required: 'Velg årsak for opprettelse av behandlingen fra nedtrekkslisten.',
        },
    });

    const behandlingstype = watch(OpprettBehandlingFelt.BEHANDLINGSTYPE);
    const erMigreringFraInfotrygd = behandlingstype === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    const aktivBehandling = fagsak ? hentAktivBehandlingPåMinimalFagsak(fagsak) : undefined;
    const kanOppretteMigreringFraInfotrygd = !aktivBehandling || aktivBehandling?.status === BehandlingStatus.AVSLUTTET;
    const kanOppretteMigreringsbehandlingMedHelmanuellMigrering =
        kanOppretteMigreringFraInfotrygd &&
        (forrigeBehandlingVarTekniskEndringMedOpphør(fagsak) || fagsak?.status !== FagsakStatus.LØPENDE);
    const kanOppretteMigreringsbehandlingMedEndreMigreringsdato =
        kanOppretteMigreringFraInfotrygd &&
        (fagsak?.behandlinger.some(behandling => !erBehandlingHenlagt(behandling.resultat)) ?? false);

    return (
        <Select
            label={'Velg behandlingsårsak'}
            readOnly={isSubmitting}
            value={value}
            onChange={onChange}
            error={error?.message}
        >
            <option disabled={true} value={''}>
                Velg
            </option>
            {hentTilgjengeligeBehandlingsårsaker(
                erMigreringFraInfotrygd,
                kanOppretteMigreringsbehandlingMedHelmanuellMigrering,
                kanOppretteMigreringsbehandlingMedEndreMigreringsdato
            ).map(årsak => (
                <option key={årsak} aria-selected={value === årsak} value={årsak}>
                    {behandlingÅrsak[årsak]}
                </option>
            ))}
        </Select>
    );
}
