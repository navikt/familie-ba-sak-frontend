import React from 'react';

import styled from 'styled-components';

import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Element } from 'nav-frontend-typografi';

import { FamilieCheckbox, FamilieDatovelger, FamilieInput } from '@navikt/familie-form-elements';
import { ISkjema } from '@navikt/familie-skjema';

import { useBehandling } from '../../../context/BehandlingContext';
import { IPersonInfo } from '../../../typer/person';
import { IRegistrerBarnSkjema } from './LeggTilBarn';

interface IProps {
    registrerBarnSkjema: ISkjema<IRegistrerBarnSkjema, IPersonInfo>;
}

const Container = styled.div`
    margin: 1rem 0;
`;

const UregistrertBarnInputs = styled.div`
    margin: 1rem 0 1rem 1rem;
`;

const UregistrertBarnLegend = styled.div`
    margin-top: 1rem;
    display: flex;
`;

const StyledHjelpetekst = styled(Hjelpetekst)`
    margin-left: 0.5rem;
`;

const LeggTilUregistrertBarn: React.FC<IProps> = ({ registrerBarnSkjema }) => {
    const { erLesevisning } = useBehandling();

    return (
        <Container>
            <FamilieCheckbox
                id={registrerBarnSkjema.felter.erIkkeFolkeregistrert.id}
                erLesevisning={erLesevisning()}
                label={'Barnet er ikke folkeregistrert/har ikke fnr'}
                checked={registrerBarnSkjema.felter.erIkkeFolkeregistrert.verdi}
                onChange={() => {
                    registrerBarnSkjema.felter.erIkkeFolkeregistrert.validerOgSettFelt(
                        !registrerBarnSkjema.felter.erIkkeFolkeregistrert.verdi
                    );
                    registrerBarnSkjema.felter.ident.nullstill();
                }}
            />

            {registrerBarnSkjema.felter.uregistrertBarnFødselsdato.erSynlig &&
                registrerBarnSkjema.felter.uregistrertBarnNavn.erSynlig && (
                    <UregistrertBarnInputs>
                        <UregistrertBarnLegend>
                            <Element>Tilgjengelige opplysninger om barnet</Element>
                            <StyledHjelpetekst>
                                Siden barnet ikke er folkeregistrert/har fnr vil det føre til et
                                avslag for dette barnet.
                            </StyledHjelpetekst>
                        </UregistrertBarnLegend>
                        <br />

                        <FamilieDatovelger
                            {...registrerBarnSkjema.felter.uregistrertBarnFødselsdato.hentNavInputProps(
                                registrerBarnSkjema.visFeilmeldinger
                            )}
                            label={'Fødselsdato (valgfri)'}
                            placeholder={'DD.MM.ÅÅÅÅ'}
                        />

                        <br />
                        <FamilieInput
                            {...registrerBarnSkjema.felter.uregistrertBarnNavn.hentNavInputProps(
                                registrerBarnSkjema.visFeilmeldinger
                            )}
                            label={'Barnets navn'}
                        />
                    </UregistrertBarnInputs>
                )}
        </Container>
    );
};

export default LeggTilUregistrertBarn;
