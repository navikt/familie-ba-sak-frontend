import * as React from 'react';

import styled from 'styled-components';

import { Systemtittel } from 'nav-frontend-typografi';

import { FamilieTextarea } from '@navikt/familie-form-elements';

import { useBehandling } from '../../../context/BehandlingContext';
import { ISøknadDTO } from '../../../typer/søknad';

interface IProps {
    settSøknadOgValider: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const AnnetWrapper = styled.div`
    margin: 2rem 0;
`;

const Annet: React.FunctionComponent<IProps> = ({ settSøknadOgValider, søknad }) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    const tekstOnChange = (begrunnelse: string) => {
        settSøknadOgValider({
            ...søknad,
            endringAvOpplysningerBegrunnelse: begrunnelse,
        });
    };

    return (
        <AnnetWrapper>
            <Systemtittel children={'Annet'} />
            <br />
            <FamilieTextarea
                erLesevisning={lesevisning}
                label={!lesevisning && 'Ved endring av opplysningene er begrunnelse obligatorisk'}
                value={søknad.endringAvOpplysningerBegrunnelse}
                maxLength={2000}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    tekstOnChange(event.target.value);
                }}
            />
        </AnnetWrapper>
    );
};

export default Annet;
