import PanelBase from 'nav-frontend-paneler';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { IBarnMedOpplysninger, ISøknadDTO } from '../../../typer/søknad';
import BarnMedOpplysninger from './BarnMedOpplysninger';

interface IProps {
    søknad: ISøknadDTO;
}

const Barna: React.FunctionComponent<IProps> = ({ søknad }) => {
    const { erLesevisning } = useBehandling();
    return (
        <PanelBase key={'barna'} className={'søknad__barn'}>
            <Undertittel children={'Opplysninger om barn under 18 år'} />

            <br />
            {!erLesevisning() && <Element children={'Velg barn det søkes for'} />}
            <SkjemaGruppe feilmeldingId={'barna'}>
                {søknad.barnaMedOpplysninger.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
                    <BarnMedOpplysninger
                        key={barnMedOpplysninger.ident}
                        barn={barnMedOpplysninger}
                    />
                ))}
            </SkjemaGruppe>
        </PanelBase>
    );
};

export default Barna;
