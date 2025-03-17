import React from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { BodyShort, Checkbox, CheckboxGroup, Heading, TextField } from '@navikt/ds-react';
import type { ISkjema } from '@navikt/familie-skjema';

import type { IRegistrerBarnSkjema } from './LeggTilBarn';
import type { IPersonInfo } from '../../typer/person';
import Datovelger from '../Datovelger/Datovelger';

interface IProps {
    registrerBarnSkjema: ISkjema<IRegistrerBarnSkjema, IPersonInfo>;
    vurderErLesevisning: () => boolean;
}

const Container = styled.div`
    margin: 1rem 0;
`;

const UregistrertBarnInputs = styled.div`
    margin: 1rem 0 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const LeggTilUregistrertBarn: React.FC<IProps> = ({ registrerBarnSkjema, vurderErLesevisning }) => {
    return (
        <Container>
            {vurderErLesevisning() ? (
                !registrerBarnSkjema.felter.erFolkeregistrert.verdi && (
                    <BodyShort
                        children={'Barnet er ikke folkeregistrert / har ikke fødselsnummer'}
                        className={classNames('skjemaelement', 'lese-felt')}
                    />
                )
            ) : (
                <CheckboxGroup
                    legend={''}
                    hideLegend
                    value={[registrerBarnSkjema.felter.erFolkeregistrert.verdi]}
                    onChange={() => {
                        registrerBarnSkjema.felter.erFolkeregistrert.validerOgSettFelt(
                            !registrerBarnSkjema.felter.erFolkeregistrert.verdi
                        );
                        registrerBarnSkjema.felter.ident.nullstill();
                    }}
                >
                    <Checkbox id={registrerBarnSkjema.felter.erFolkeregistrert.id} value={false}>
                        {'Barnet er ikke folkeregistrert / har ikke fødselsnummer'}
                    </Checkbox>{' '}
                </CheckboxGroup>
            )}

            {registrerBarnSkjema.felter.uregistrertBarnFødselsdato.erSynlig &&
                registrerBarnSkjema.felter.uregistrertBarnNavn.erSynlig && (
                    <UregistrertBarnInputs>
                        <Heading size={'small'}>Tilgjengelige opplysninger om barnet</Heading>
                        <Datovelger
                            felt={registrerBarnSkjema.felter.uregistrertBarnFødselsdato}
                            label={'Fødselsdato (valgfri)'}
                            visFeilmeldinger={registrerBarnSkjema.visFeilmeldinger}
                            datoMåFyllesUt={false}
                            kanKunVelgeFortid
                        />
                        <TextField
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
