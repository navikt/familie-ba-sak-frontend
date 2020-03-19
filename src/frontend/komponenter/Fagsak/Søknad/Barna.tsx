import * as React from 'react';
import PanelBase from 'nav-frontend-paneler';
import { ISøknadDTO, IBarnMedOpplysninger } from '../../../typer/søknad';
import { Undertittel, Element } from 'nav-frontend-typografi';
import BarnMedOpplysninger from './BarnMedOpplysninger';
import { SkjemaGruppe } from 'nav-frontend-skjema';

interface IProps {
    søknad: ISøknadDTO;
}

const Barna: React.FunctionComponent<IProps> = ({ søknad }) => {
    return (
        <PanelBase key={'barna'} className={'søknad__barn'}>
            <Undertittel children={'5 Opplysninger om barn under 18 år'} />

            <br />
            <Element children={'Velg barn det søkes for'} />
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
