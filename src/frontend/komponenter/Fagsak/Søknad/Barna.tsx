import * as React from 'react';
import PanelBase from 'nav-frontend-paneler';
import { ISøknadDTO, IBarnMedOpplysninger } from '../../../typer/søknad';
import { Undertittel, Element } from 'nav-frontend-typografi';
import BarnMedOpplysninger from './BarnMedOpplysninger';

interface IProps {
    søknad: ISøknadDTO;
}

const Barna: React.FunctionComponent<IProps> = ({ søknad }) => {
    return (
        <PanelBase className={'søknad__barn'}>
            <Undertittel children={'5 Opplysninger om barn under 18 år'} />

            <br />
            <Element children={'Velg barn det søkes for'} />
            {søknad.barnaMedOpplysninger.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
                <BarnMedOpplysninger key={barnMedOpplysninger.ident} barn={barnMedOpplysninger} />
            ))}
        </PanelBase>
    );
};

export default Barna;
