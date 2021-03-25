import * as React from 'react';

import styled from 'styled-components';

import { CheckboxGruppe } from 'nav-frontend-skjema';
import { Element, Systemtittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { useSøknad } from '../../../context/SøknadContext';
import RødError from '../../../ikoner/RødError';
import {
    adressebeskyttelsestyper,
    FamilieRelasjonRolle,
    IFamilierelasjonMaskert,
} from '../../../typer/person';
import { IBarnMedOpplysninger } from '../../../typer/søknad';
import familieDayjs, { familieDayjsDiff } from '../../../utils/familieDayjs';
import { datoformat } from '../../../utils/formatter';
import BarnMedOpplysninger from './BarnMedOpplysninger';
import LeggTilBarn from './LeggTilBarn';

const BarnMedDiskresjonskode = styled.div`
    display: flex;
    align-items: center;
    margin: 0.5rem;
`;

const StyledRødError = styled(RødError)`
    margin-right: 1rem;
`;

const BarnaWrapper = styled.div`
    margin: 1rem 0;
`;

const StyledCheckboxGruppe = styled(CheckboxGruppe)`
    min-width: 0;
`;

const Barna: React.FunctionComponent = () => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();
    const { bruker } = useFagsakRessurser();
    const { skjema } = useSøknad();

    const sorterteBarnMedOpplysninger = skjema.felter.barnaMedOpplysninger.verdi.sort(
        (a: IBarnMedOpplysninger, b: IBarnMedOpplysninger) => {
            return familieDayjsDiff(
                familieDayjs(b.fødselsdato, datoformat.ISO_DAG),
                familieDayjs(a.fødselsdato, datoformat.ISO_DAG)
            );
        }
    );

    return (
        <BarnaWrapper className={'søknad__barna'}>
            <Systemtittel children={'Opplysninger om barn'} />
            {bruker.status === RessursStatus.SUKSESS &&
                bruker.data.familierelasjonerMaskert
                    .filter(
                        (familierelasjonMaskert: IFamilierelasjonMaskert) =>
                            familierelasjonMaskert.relasjonRolle === FamilieRelasjonRolle.BARN
                    )
                    .map((familierelasjonMaskert: IFamilierelasjonMaskert, index: number) => {
                        return (
                            <BarnMedDiskresjonskode
                                key={`${index}_${familierelasjonMaskert.relasjonRolle}`}
                            >
                                <StyledRødError heigth={24} width={24} />
                                {`Bruker har barn med diskresjonskode ${
                                    adressebeskyttelsestyper[
                                        familierelasjonMaskert.adressebeskyttelseGradering
                                    ] ?? 'ukjent'
                                }`}
                            </BarnMedDiskresjonskode>
                        );
                    })}

            <br />
            <StyledCheckboxGruppe
                {...skjema.felter.barnaMedOpplysninger.hentNavBaseSkjemaProps(
                    skjema.visFeilmeldinger
                )}
                legend={
                    !lesevisning ? (
                        <Element>Velg hvilke barn det er søkt om</Element>
                    ) : (
                        <Element>Barn det er søkt om</Element>
                    )
                }
                utenFeilPropagering={true}
            >
                {sorterteBarnMedOpplysninger.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
                    <BarnMedOpplysninger
                        key={barnMedOpplysninger.ident}
                        barn={barnMedOpplysninger}
                    />
                ))}

                {!lesevisning && <LeggTilBarn />}
            </StyledCheckboxGruppe>
        </BarnaWrapper>
    );
};

export default Barna;
