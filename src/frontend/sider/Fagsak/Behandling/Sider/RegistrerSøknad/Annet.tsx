import { useErLesevisning } from '@hooks/useErLesevisning';
import { useController, useFormContext } from 'react-hook-form';

import { Heading, Textarea, VStack } from '@navikt/ds-react';

import { RegistrerSøknadFelt, type RegistrerSøknadFormValues } from './SøknadContext';

export const Annet = () => {
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<RegistrerSøknadFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: RegistrerSøknadFelt.ENDRING_AV_OPPLYSNINGER_BEGRUNNELSE,
        control,
    });

    return (
        <VStack marginBlock={'space-32'}>
            <Heading size={'medium'} level={'2'} children={'Annet'} />
            <br />
            <Textarea
                value={value}
                onChange={onChange}
                error={error?.message}
                readOnly={isSubmitting || erLesevisning}
                label={!erLesevisning && 'Ved endring av opplysningene er begrunnelse obligatorisk'}
                maxLength={2000}
            />
        </VStack>
    );
};
