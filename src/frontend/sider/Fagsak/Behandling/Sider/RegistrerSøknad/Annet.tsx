import * as React from 'react';

import { Heading, Textarea, VStack } from '@navikt/ds-react';

import { useSøknadContext } from './SøknadContext';
import { useBehandlingContext } from '../../context/BehandlingContext';

export const Annet: React.FunctionComponent = () => {
    const { vurderErLesevisning } = useBehandlingContext();
    const { skjema } = useSøknadContext();
    const lesevisning = vurderErLesevisning();

    return (
        <VStack marginBlock={'space-32'}>
            <Heading size={'medium'} level={'2'} children={'Annet'} />
            <br />
            <Textarea
                {...skjema.felter.endringAvOpplysningerBegrunnelse.hentNavInputProps(skjema.visFeilmeldinger)}
                readOnly={lesevisning}
                label={!lesevisning && 'Ved endring av opplysningene er begrunnelse obligatorisk'}
                maxLength={2000}
            />
        </VStack>
    );
};
