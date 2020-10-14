import { RessursStatus } from '@navikt/familie-typer';
import moment from 'moment';
import PanelBase from 'nav-frontend-paneler';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import RødError from '../../../ikoner/RødError';
import {
    adressebeskyttelsestyper,
    FamilieRelasjonRolle,
    IFamilierelasjonMaskert,
} from '../../../typer/person';
import { IBarnMedOpplysninger, ISøknadDTO } from '../../../typer/søknad';
import { datoformat } from '../../../utils/formatter';
import BarnMedOpplysninger from './BarnMedOpplysninger';
import LeggTilBarn from './LeggTilBarn';
import styled from 'styled-components';

interface IProps {
    settSøknadOgValider: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const StyledBarnMedDiskresjonskode = styled.div`
    display: flex;
    align-items: center;
    margin: 0.5rem;

    svg {
        margin-right: 1rem;
    }
`;

const Barna: React.FunctionComponent<IProps> = ({ settSøknadOgValider, søknad }) => {
    const { erLesevisning } = useBehandling();
    const { bruker } = useFagsakRessurser();
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
            <Systemtittel children={'Opplysninger om barn under 18 år'} />

            <br />

            {bruker.status === RessursStatus.SUKSESS &&
                bruker.data.familierelasjonerMaskert
                    .filter(
                        (familierelasjonMaskert: IFamilierelasjonMaskert) =>
                            familierelasjonMaskert.relasjonRolle === FamilieRelasjonRolle.BARN
                    )
                    .map((familierelasjonMaskert: IFamilierelasjonMaskert) => {
                        return (
                            <StyledBarnMedDiskresjonskode>
                                <RødError heigth={24} width={24} />
                                {`Bruker har barn med diskresjonskode ${
                                    adressebeskyttelsestyper[
                                        familierelasjonMaskert.adressebeskyttelseGradering
                                    ] ?? 'ukjent'
                                }`}
                            </StyledBarnMedDiskresjonskode>
                        );
                    })}

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
