import moment from 'moment';
import PanelBase from 'nav-frontend-paneler';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { IBarnMedOpplysninger, ISøknadDTO } from '../../../typer/søknad';
import { datoformat } from '../../../utils/formatter';
import BarnMedOpplysninger from './BarnMedOpplysninger';

interface IProps {
    søknad: ISøknadDTO;
}

const Barna: React.FunctionComponent<IProps> = ({ søknad }) => {
    const { erLesevisning } = useBehandling();
    const sorterteBarnMedOpplysninger = søknad.barnaMedOpplysninger.sort(
        (a: IBarnMedOpplysninger, b: IBarnMedOpplysninger) => {
            return moment(b.fødselsdato, datoformat.ISO_DAG).diff(
                moment(a.fødselsdato, datoformat.ISO_DAG),
                'day'
            );
        }
    );
    return (
        <PanelBase key={'barna'} className={'søknad__barn'}>
            <Undertittel children={'Opplysninger om barn under 18 år'} />

            <br />
            {!erLesevisning() && <Element children={'Velg barn det søkes for'} />}
            <SkjemaGruppe feilmeldingId={'barna'}>
                {sorterteBarnMedOpplysninger.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
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
