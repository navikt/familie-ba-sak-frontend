import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { HenleggBehandlingFormFields, type HenleggBehandlingFormValues } from './useHenleggBehandlingForm';
import { useAppContext } from '../../../../../context/AppContext';
import { erPåHenleggbartSteg, henleggÅrsak, HenleggÅrsak } from '../../../../../typer/behandling';
import { ToggleNavn } from '../../../../../typer/toggles';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';

export function ÅrsakFelt() {
    const { behandling } = useBehandlingContext();

    const { toggles } = useAppContext();

    const { control } = useFormContext<HenleggBehandlingFormValues>();

    const { field, fieldState, formState } = useController({
        name: HenleggBehandlingFormFields.ÅRSAK,
        control,
        rules: { required: 'Årsak er påkrevd.' },
    });

    const harTilgangTilTekniskVedlikeholdHenleggelse = toggles[ToggleNavn.tekniskVedlikeholdHenleggelse];

    const valgmuligheter = Object.values(HenleggÅrsak)
        .filter(årsak => årsak !== HenleggÅrsak.FØDSELSHENDELSE_UGYLDIG_UTFALL)
        .filter(
            årsak =>
                (årsak !== HenleggÅrsak.TEKNISK_VEDLIKEHOLD && erPåHenleggbartSteg(behandling.steg)) ||
                (årsak === HenleggÅrsak.TEKNISK_VEDLIKEHOLD && harTilgangTilTekniskVedlikeholdHenleggelse)
        )
        .map(årsak => (
            <option key={årsak} aria-selected={field.value === årsak} value={årsak}>
                {henleggÅrsak[årsak]}
            </option>
        ));

    return (
        <Select
            label={'Velg årsak'}
            name={field.name}
            value={field.value}
            ref={field.ref}
            onBlur={field.onBlur}
            onChange={field.onChange}
            error={fieldState.error?.message}
            readOnly={formState.isSubmitting}
        >
            <option disabled={true} value={''}>
                Velg
            </option>
            {valgmuligheter}
        </Select>
    );
}
