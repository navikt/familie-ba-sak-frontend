import moment from 'moment';
import PanelBase from 'nav-frontend-paneler';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { IBarnMedOpplysninger, ISøknadDTO } from '../../../typer/søknad';
import { datoformat } from '../../../utils/formatter';
import BarnMedOpplysninger from './BarnMedOpplysninger';
import LeggTilBarn from './LeggTilBarn';

interface IProps {
    settSøknadOgValider: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const Barna: React.FunctionComponent<IProps> = ({ settSøknadOgValider, søknad }) => {
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
        <PanelBase key={'barna'} className={'søknad__barna'}>
            <Undertittel children={'Opplysninger om barn under 18 år'} />

            <br />
            {!erLesevisning() && <Element children={'Velg hvilke barn det er søkt om'} />}
            <SkjemaGruppe feilmeldingId={'barna'}>
                {sorterteBarnMedOpplysninger.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
                    <BarnMedOpplysninger
                        key={barnMedOpplysninger.ident}
                        barn={barnMedOpplysninger}
                    />
                ))}
                {!erLesevisning() && (
                    <LeggTilBarn settSøknadOgValider={settSøknadOgValider} søknad={søknad} />
                )}
            </SkjemaGruppe>
        </PanelBase>
    );
};

export default Barna;
