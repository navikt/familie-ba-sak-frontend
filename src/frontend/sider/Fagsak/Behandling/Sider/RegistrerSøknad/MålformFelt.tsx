import { useErLesevisning } from '@hooks/useErLesevisning';
import { Målform, målform } from '@typer/søknad';
import { useController, useFormContext } from 'react-hook-form';

import { Box, Heading, Radio, RadioGroup } from '@navikt/ds-react';

import { RegistrerSøknadFelt, type RegistrerSøknadFormValues } from './SøknadContext';

export const MÅLFORM_RADIOGROUP_ID = 'registrer-søknad-målform';

export const MålformFelt = () => {
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<RegistrerSøknadFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: RegistrerSøknadFelt.MÅLFORM,
        control,
        rules: {
            validate: value => (value !== undefined ? undefined : 'Målform er ikke valgt.'),
        },
    });

    return (
        <RadioGroup
            id={MÅLFORM_RADIOGROUP_ID}
            readOnly={isSubmitting || erLesevisning}
            error={error?.message}
            value={value ? målform[value] : ''}
            legend={<Heading size={'medium'} level={'2'} children={'Målform'} />}
        >
            <Box paddingInline={'space-16 space-0'}>
                <Radio
                    value={målform[Målform.NB]}
                    name={'registrer-søknad-målform'}
                    checked={value === Målform.NB}
                    onChange={() => onChange(Målform.NB)}
                    id={'målform-nb'}
                >
                    {målform[Målform.NB]}
                </Radio>
                <Radio
                    value={målform[Målform.NN]}
                    name={'registrer-søknad-målform'}
                    checked={value === Målform.NN}
                    onChange={() => onChange(Målform.NN)}
                >
                    {målform[Målform.NN]}
                </Radio>
            </Box>
        </RadioGroup>
    );
};
