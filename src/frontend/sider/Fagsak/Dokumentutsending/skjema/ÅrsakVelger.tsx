import { useBruker } from '@hooks/useBruker';
import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { useFagsak } from '@hooks/useFagsak';
import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { Select } from '@navikt/ds-react';
import { DokumentÅrsak, dokumentÅrsak, institusjonÅrsaker } from '@sider/Fagsak/Dokumentutsending/dokumentÅrsakTyper';
import {
    DokumentutsendingFeltnavn,
    type DokumentutsendingFormValues,
    dokumentutsendingSkjemaStandardverdier,
} from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import { FagsakType } from '@typer/fagsak';
import { FeatureToggle } from '@typer/featureToggles';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';

function useValgbareÅrsaker(): DokumentÅrsak[] {
    const fagsak = useFagsak();
    const toggles = useFeatureToggles();

    const erInstitusjon = fagsak.fagsakType === FagsakType.INSTITUSJON;

    return Object.values(DokumentÅrsak).filter(
        årsak =>
            institusjonÅrsaker.includes(årsak) === erInstitusjon &&
            (årsak !== DokumentÅrsak.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD ||
                toggles[FeatureToggle.selvstendigRettInfobrev])
    );
}

export function ÅrsakVelger() {
    const erLesevisning = useErLesevisningFagsak();
    const bruker = useBruker();
    const {
        control,
        reset,
        formState: { isSubmitting },
    } = useFormContext<DokumentutsendingFormValues>();
    const valgbareÅrsaker = useValgbareÅrsaker();

    const { field, fieldState } = useController({
        name: DokumentutsendingFeltnavn.ÅRSAK,
        control,
        rules: { required: 'Du må velge en årsak' },
    });

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const nyÅrsak = event.target.value as DokumentÅrsak | '';
        reset({
            ...dokumentutsendingSkjemaStandardverdier(bruker),
            [DokumentutsendingFeltnavn.ÅRSAK]: nyÅrsak,
        });
    };

    return (
        <Select
            label={'Velg årsak'}
            value={field.value}
            onChange={onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            size={'medium'}
            readOnly={erLesevisning || isSubmitting}
        >
            <option value="">Velg</option>
            {valgbareÅrsaker.map(årsak => (
                <option key={årsak} aria-selected={field.value === årsak} value={årsak}>
                    {dokumentÅrsak[årsak]}
                </option>
            ))}
        </Select>
    );
}
