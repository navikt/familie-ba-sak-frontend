import * as React from 'react';

import styled from 'styled-components';

import { Alert, Heading, Label } from '@navikt/ds-react';
import { FamilieCheckboxGroup } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useFagsakContext } from '../../../context/fagsak/FagsakContext';
import { useSøknad } from '../../../context/SøknadContext';
import RødError from '../../../ikoner/RødError';
import type { IForelderBarnRelasjonMaskert } from '../../../typer/person';
import { adressebeskyttelsestyper, ForelderBarnRelasjonRolle } from '../../../typer/person';
import type { IBarnMedOpplysninger } from '../../../typer/søknad';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
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

const IngenBarnRegistrertInfo = styled(Alert)`
    margin-bottom: 1.25rem;
`;

const SøkerMottarAlleredeBarneTrygd = styled(Alert)`
    margin-top: 1rem;
    margin-left: 1rem;
`;

const Barna: React.FunctionComponent = () => {
    const { vurderErLesevisning, gjelderInstitusjon } = useBehandling();
    const lesevisning = vurderErLesevisning();
    const { bruker } = useFagsakContext();
    const { skjema, barnMedLøpendeUtbetaling } = useSøknad();

    const merkedeBarnMedLøpendeUtbetaling = skjema.felter.barnaMedOpplysninger.verdi.filter(barn =>
        barnMedLøpendeUtbetaling.has(barn.ident)
    );

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

    const maskerteRelasjoner =
        bruker.status === RessursStatus.SUKSESS
            ? bruker.data.forelderBarnRelasjonMaskert.filter(
                  (forelderBarnRelasjonMaskert: IForelderBarnRelasjonMaskert) =>
                      forelderBarnRelasjonMaskert.relasjonRolle === ForelderBarnRelasjonRolle.BARN
              )
            : [];

    return (
        <BarnaWrapper className={'søknad__barna'}>
            <Heading size={'medium'} level={'2'} children={'Opplysninger om barn'} />
            {maskerteRelasjoner.map(
                (forelderBarnRelasjonMaskert: IForelderBarnRelasjonMaskert, index: number) => {
                    return (
                        <BarnMedDiskresjonskode
                            key={`${index}_${forelderBarnRelasjonMaskert.relasjonRolle}`}
                        >
                            <StyledRødError height={24} width={24} />
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
            <FamilieCheckboxGroup
                {...skjema.felter.barnaMedOpplysninger.hentNavBaseSkjemaProps(
                    skjema.visFeilmeldinger
                )}
                erLesevisning={lesevisning}
                legend={
                    !lesevisning && !gjelderInstitusjon ? (
                        <Label>Velg hvilke barn det er søkt om</Label>
                    ) : (
                        <Label>Barn det er søkt om</Label>
                    )
                }
                value={skjema.felter.barnaMedOpplysninger.verdi
                    .filter(barn => barn.merket)
                    .map(barn => barn.ident)}
                onChange={(merkedeIdenter: string[]) => {
                    skjema.felter.barnaMedOpplysninger.validerOgSettFelt(
                        skjema.felter.barnaMedOpplysninger.verdi.map(
                            (barnMedOpplysninger: IBarnMedOpplysninger) => ({
                                ...barnMedOpplysninger,
                                merket: merkedeIdenter.includes(barnMedOpplysninger.ident),
                            })
                        )
                    );
                }}
            >
                {sorterteBarnMedOpplysninger.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
                    <BarnMedOpplysninger
                        key={barnMedOpplysninger.ident}
                        barn={barnMedOpplysninger}
                    />
                ))}

                {sorterteBarnMedOpplysninger.length === 0 && maskerteRelasjoner.length === 0 && (
                    <IngenBarnRegistrertInfo
                        variant="info"
                        children={'Folkeregisteret har ikke registrerte barn på denne søkeren'}
                    />
                )}

                {!lesevisning && !gjelderInstitusjon && (
                    <LeggTilBarn barnaMedOpplysninger={skjema.felter.barnaMedOpplysninger} />
                )}
                {merkedeBarnMedLøpendeUtbetaling.length !== 0 && (
                    <SøkerMottarAlleredeBarneTrygd variant="warning" size="small">
                        <Heading level="3" size="xsmall">
                            {`Søker mottar allerede barnetrygd`}
                        </Heading>
                        Barn født{' '}
                        {merkedeBarnMedLøpendeUtbetaling
                            .map(barn => formaterIsoDato(barn.fødselsdato, datoformat.DATO))
                            .join(', ')}{' '}
                        har løpende barnetrygd.
                    </SøkerMottarAlleredeBarneTrygd>
                )}
            </FamilieCheckboxGroup>
        </BarnaWrapper>
    );
};

export default Barna;
