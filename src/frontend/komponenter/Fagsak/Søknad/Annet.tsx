import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import PanelBase from 'nav-frontend-paneler';
import { useBehandling } from '../../../context/BehandlingContext';
import { ISøknadDTO } from '../../../typer/søknad';
import { FamilieTextarea } from '@navikt/familie-form-elements';

interface IProps {
    settSøknadOgValider: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

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
        <PanelBase key={'annet'}>
            <Undertittel children={'Annet'} />
            <br />
            <FamilieTextarea
                className={'søknad__textarea'}
                erLesevisning={lesevisning}
                label={!lesevisning && 'Ved endring av opplysningene er begrunnelse obligatorisk'}
                value={søknad.endringAvOpplysningerBegrunnelse}
                maxLength={2000}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    tekstOnChange(event.target.value);
                }}
            />
        </PanelBase>
    );
};

export default Annet;
