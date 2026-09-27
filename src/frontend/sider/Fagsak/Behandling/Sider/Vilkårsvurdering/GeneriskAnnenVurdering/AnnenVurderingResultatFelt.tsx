import { useErLesevisning } from '@hooks/useErLesevisning';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { Resultat } from '@typer/vilkår';
import { useController, useFormContext } from 'react-hook-form';

import { validerAnnenVurderingResultat } from '../validering';
import { AnnenVurderingFelt, type AnnenVurderingFormValues } from './useAnnenVurderingSkjema';

interface Props {
    legend: string;
}

export function AnnenVurderingResultatFelt({ legend }: Props) {
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<AnnenVurderingFormValues>();

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: AnnenVurderingFelt.RESULTAT,
        control,
        rules: {
            validate: validerAnnenVurderingResultat,
        },
    });

    return (
        <RadioGroup
            ref={ref}
            onBlur={onBlur}
            readOnly={erLesevisning || isSubmitting}
            value={value}
            legend={legend}
            error={error?.message}
            onChange={onChange}
        >
            <Radio value={Resultat.OPPFYLT}>Ja</Radio>
            <Radio value={Resultat.IKKE_OPPFYLT}>Nei</Radio>
        </RadioGroup>
    );
}
