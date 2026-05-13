import { useErLesevisning } from '@hooks/useErLesevisning';

import { Heading, Textarea, VStack } from '@navikt/ds-react';

import { useSøknadContext } from './SøknadContext';

export const Annet = () => {
    const { skjema } = useSøknadContext();
    const erLesevisning = useErLesevisning();

    return (
        <VStack marginBlock={'space-32'}>
            <Heading size={'medium'} level={'2'} children={'Annet'} />
            <br />
            <Textarea
                {...skjema.felter.endringAvOpplysningerBegrunnelse.hentNavInputProps(skjema.visFeilmeldinger)}
                readOnly={erLesevisning}
                label={!erLesevisning && 'Ved endring av opplysningene er begrunnelse obligatorisk'}
                maxLength={2000}
            />
        </VStack>
    );
};
