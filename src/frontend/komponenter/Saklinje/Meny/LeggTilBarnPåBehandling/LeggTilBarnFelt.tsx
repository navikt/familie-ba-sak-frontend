import { useController, useFormContext } from 'react-hook-form';

import { TextField } from '@navikt/ds-react';

import {
    LeggTilBarnPåBehandlingFelt,
    type LeggTilBarnPåBehandlingFormValues,
} from './useLeggTilBarnPåBehandlingSkjema';
import { sjekkEr11Tall, sjekkErGyldigIdent } from '../../../../utils/validators';

interface Props {
    erLesevisning: boolean;
}

export const LeggTilBarnFelt = ({ erLesevisning }: Props) => {
    const { control } = useFormContext<LeggTilBarnPåBehandlingFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: LeggTilBarnPåBehandlingFelt.BARNIDENT,
        control,
        rules: {
            required: 'Fødselsnummer eller D-nummer må oppgis.',
            validate: value => {
                if (!sjekkEr11Tall(value)) {
                    return 'Fødselsnummer eller D-nummer må være 11 siffer.';
                }
                if (!sjekkErGyldigIdent(value)) {
                    return 'Fødselsnummer eller D-nummer er ugyldig.';
                }
            },
        },
    });

    return (
        <TextField
            label={'Fødselsnummer'}
            placeholder={'11 siffer'}
            value={value}
            onChange={onChange}
            maxLength={11}
            error={error?.message}
            readOnly={erLesevisning || isSubmitting}
        />
    );
};
