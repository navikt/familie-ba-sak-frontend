import type { ChangeEvent } from 'react';

import { useFagsak } from '@hooks/useFagsak';
import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { FagsakType } from '@typer/fagsak';
import { FeatureToggle } from '@typer/featureToggles';
import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { dokumentÅrsak, DokumentÅrsakInstitusjon, DokumentÅrsakPerson } from '../dokumentÅrsakTyper';
import type { DokumentutsendingFormValues } from './useDokumentutsendingSkjema';
import { DokumentutsendingFeltnavn } from './useDokumentutsendingSkjema';

export function ÅrsakVelger() {
    const { control } = useFormContext<DokumentutsendingFormValues>();
    const fagsak = useFagsak();
    const toggles = useFeatureToggles();

    const erInstitusjon = fagsak.fagsakType === FagsakType.INSTITUSJON;
    const dokumentÅrsaker = erInstitusjon
        ? Object.values(DokumentÅrsakInstitusjon)
        : Object.values(DokumentÅrsakPerson);

    const { field, fieldState } = useController({
        name: DokumentutsendingFeltnavn.ÅRSAK,
        control,
        rules: { required: 'Du må velge en årsak' },
    });

    return (
        <Select
            label={'Velg årsak'}
            value={field.value}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => field.onChange(event.target.value)}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            size={'medium'}
        >
            <option value="">Velg</option>
            {dokumentÅrsaker
                .filter(
                    årsak =>
                        årsak !==
                            DokumentÅrsakPerson.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD ||
                        toggles[FeatureToggle.selvstendigRettInfobrev]
                )
                .map(årsak => (
                    <option key={årsak} aria-selected={field.value === årsak} value={årsak}>
                        {dokumentÅrsak[årsak]}
                    </option>
                ))}
        </Select>
    );
}
