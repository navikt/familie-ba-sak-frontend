import * as React from 'react';

import styled from 'styled-components';

import { CheckboxGruppe } from 'nav-frontend-skjema';
import { Element, Systemtittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { useSøknad } from '../../../context/SøknadContext';
import RødError from '../../../ikoner/RødError';
import {
    adressebeskyttelsestyper,
    ForelderBarnRelasjonRolle,
    IForelderBarnRelasjonMaskert,
} from '../../../typer/person';
import { IBarnMedOpplysninger } from '../../../typer/søknad';
import { kalenderDato, kalenderDatoTilDate, kalenderDiff } from '../../../utils/kalender';
import LeggTilBarn from '../../Felleskomponenter/LeggTilBarn';
import BarnMedOpplysninger from './BarnMedOpplysninger';

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
            if (!a.fødselsdato) {
                return 1;
            }

            if (!b.fødselsdato) {
                return -1;
            }

            return !a.ident
                ? 1
                : kalenderDiff(
                      kalenderDatoTilDate(kalenderDato(b.fødselsdato)),
                      kalenderDatoTilDate(kalenderDato(a.fødselsdato))
                  );
        }
    );

    return (
        <BarnaWrapper className={'søknad__barna'}>
            <Systemtittel children={'Opplysninger om barn'} />
            {bruker.status === RessursStatus.SUKSESS &&
                bruker.data.forelderBarnRelasjonMaskert
                    .filter(
                        (forelderBarnRelasjonMaskert: IForelderBarnRelasjonMaskert) =>
                            forelderBarnRelasjonMaskert.relasjonRolle ===
                            ForelderBarnRelasjonRolle.BARN
                    )
                    .map(
                        (
                            forelderBarnRelasjonMaskert: IForelderBarnRelasjonMaskert,
                            index: number
                        ) => {
                            return (
                                <BarnMedDiskresjonskode
                                    key={`${index}_${forelderBarnRelasjonMaskert.relasjonRolle}`}
                                >
                                    <StyledRødError heigth={24} width={24} />
                                    {`Bruker har barn med diskresjonskode ${
                                        adressebeskyttelsestyper[
                                            forelderBarnRelasjonMaskert.adressebeskyttelseGradering
                                        ] ?? 'ukjent'
                                    }`}
                                </BarnMedDiskresjonskode>
                            );
                        }
                    )}

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

                {!lesevisning && (
                    <LeggTilBarn barnaMedOpplysninger={skjema.felter.barnaMedOpplysninger} />
                )}
            </StyledCheckboxGruppe>
        </BarnaWrapper>
    );
};

export default Barna;
