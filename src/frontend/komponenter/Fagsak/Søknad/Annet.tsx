import * as React from 'react';

import styled from 'styled-components';

import { Systemtittel } from 'nav-frontend-typografi';

import { FamilieTextarea } from '@navikt/familie-form-elements';

import { useBehandling } from '../../../context/BehandlingContext';
import { useSøknad } from '../../../context/SøknadContext';

const AnnetWrapper = styled.div`
    margin: 2rem 0;
`;

const Annet: React.FunctionComponent = () => {
    const { erLesevisning } = useBehandling();
    const { skjema } = useSøknad();
    const lesevisning = erLesevisning();

    return (
        <AnnetWrapper>
            <Systemtittel children={'Annet'} />
            <br />
            <FamilieTextarea
                {...skjema.felter.endringAvOpplysningerBegrunnelse.hentNavInputProps(
                    skjema.visFeilmeldinger
                )}
                erLesevisning={lesevisning}
                label={!lesevisning && 'Ved endring av opplysningene er begrunnelse obligatorisk'}
                maxLength={2000}
            />
        </AnnetWrapper>
    );
};

export default Annet;
