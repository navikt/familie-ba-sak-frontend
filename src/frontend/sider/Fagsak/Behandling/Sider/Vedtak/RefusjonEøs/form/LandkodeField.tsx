import React, { useId } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import Styles from './LandkodeField.module.css';
import { Fields, type FormValues } from './useRefusjonEøsForm';
import { useFeatureToggles } from '../../../../../../../hooks/useFeatureToggles';
import { EØS_LAND_REGIONKODER, RegionCombobox, type Regionkode } from '../../../../../../../komponenter/FlaggCombobox';
import { FeatureToggle } from '../../../../../../../typer/featureToggles';
import { FamilieLandvelger } from '../../../Behandlingsresultat/Eøs/EøsKomponenter/FamilieLandvelger';

interface Props {
    readOnly?: boolean;
}

export function LandkodeField({ readOnly = false }: Props) {
    const id = useId();
    const toggles = useFeatureToggles();

    const { control } = useFormContext<FormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: Fields.LANDKODE,
        control,
        rules: { required: 'Du må velge et land.' },
    });

    return (
        <>
            {toggles[FeatureToggle.brukNyFlagCombobox] ? (
                <RegionCombobox
                    label={'EØS-land'}
                    value={value as Regionkode}
                    options={EØS_LAND_REGIONKODER.filter(regionkode => regionkode !== 'NO')}
                    onChange={value => onChange(value)}
                    readOnly={readOnly || isSubmitting}
                    error={error?.message}
                    className={Styles.landvelger}
                />
            ) : (
                <FamilieLandvelger
                    id={`refusjon-eøs-form${id}`}
                    label={'EØS-land'}
                    kunEøs={true}
                    eksluderLand={['NO']}
                    value={value}
                    onChange={value => onChange(value.value)}
                    erLesevisning={readOnly || isSubmitting}
                    feil={error?.message}
                    className={Styles.landvelger}
                />
            )}
        </>
    );
}
