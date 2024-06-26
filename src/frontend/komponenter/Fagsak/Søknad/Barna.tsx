import * as React from 'react';

import { differenceInMilliseconds } from 'date-fns';
import styled from 'styled-components';

import { Alert, CheckboxGroup, Heading, Label } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import BarnMedOpplysninger from './BarnMedOpplysninger';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useFagsakContext } from '../../../context/Fagsak/FagsakContext';
import { useSøknad } from '../../../context/SøknadContext';
import RødError from '../../../ikoner/RødError';
import type { IForelderBarnRelasjonMaskert } from '../../../typer/person';
import { adressebeskyttelsestyper, ForelderBarnRelasjonRolle } from '../../../typer/person';
import type { IBarnMedOpplysninger } from '../../../typer/søknad';
import { isoStringTilDate } from '../../../utils/dato';
import LeggTilBarn from '../../Felleskomponenter/LeggTilBarn';

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

const StyledCheckboxGroup = styled(CheckboxGroup)`
    min-width: 0;
`;

const IngenBarnRegistrertInfo = styled(Alert)`
    margin-bottom: 1.25rem;
`;

const Barna: React.FunctionComponent = () => {
    const { vurderErLesevisning, gjelderInstitusjon, gjelderEnsligMindreårig, behandling } =
        useBehandling();
    const brevmottakere = behandling?.brevmottakere ?? [];
    const lesevisning = vurderErLesevisning();
    const { bruker } = useFagsakContext();
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
                : differenceInMilliseconds(
                      isoStringTilDate(b.fødselsdato),
                      isoStringTilDate(a.fødselsdato)
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

    const oppdaterBarnMedMerketStatus = (barnaSomErSjekketAv: string[]) => {
        skjema.felter.barnaMedOpplysninger.validerOgSettFelt(
            skjema.felter.barnaMedOpplysninger.verdi.map(
                (barnMedOpplysninger: IBarnMedOpplysninger) => ({
                    ...barnMedOpplysninger,
                    merket: barnaSomErSjekketAv.includes(barnMedOpplysninger.ident),
                })
            )
        );
    };

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
            <StyledCheckboxGroup
                {...skjema.felter.barnaMedOpplysninger.hentNavBaseSkjemaProps(
                    skjema.visFeilmeldinger
                )}
                legend={
                    !lesevisning && !gjelderInstitusjon && !gjelderEnsligMindreårig ? (
                        <Label>Velg hvilke barn det er søkt om</Label>
                    ) : (
                        <Label>Barn det er søkt om</Label>
                    )
                }
                value={skjema.felter.barnaMedOpplysninger.verdi
                    .filter(
                        (barnMedOpplysninger: IBarnMedOpplysninger) => barnMedOpplysninger.merket
                    )
                    .map((barnMedOpplysninger: IBarnMedOpplysninger) => barnMedOpplysninger.ident)}
                onChange={(merkedeBarn: string[]) => oppdaterBarnMedMerketStatus(merkedeBarn)}
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

                {!lesevisning && !gjelderInstitusjon && !gjelderEnsligMindreårig && (
                    <LeggTilBarn
                        barnaMedOpplysninger={skjema.felter.barnaMedOpplysninger}
                        manuelleBrevmottakere={brevmottakere}
                        vurderErLesevisning={vurderErLesevisning}
                    />
                )}
            </StyledCheckboxGroup>
        </BarnaWrapper>
    );
};

export default Barna;
