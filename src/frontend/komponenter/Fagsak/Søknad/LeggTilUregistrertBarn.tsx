import React from 'react';

import styled from 'styled-components';

import { Element } from 'nav-frontend-typografi';

import { FamilieCheckbox, FamilieDatovelger, FamilieInput } from '@navikt/familie-form-elements';
import type { ISkjema } from '@navikt/familie-skjema';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import type { IPersonInfo } from '../../../typer/person';
import type { IRegistrerBarnSkjema } from '../../Felleskomponenter/LeggTilBarn';

interface IProps {
    registrerBarnSkjema: ISkjema<IRegistrerBarnSkjema, IPersonInfo>;
}

const Container = styled.div`
    margin: 1rem 0;
`;

const UregistrertBarnInputs = styled.div`
    margin: 1rem 0 1rem 1rem;
`;

const LeggTilUregistrertBarn: React.FC<IProps> = ({ registrerBarnSkjema }) => {
    const { erLesevisning } = useBehandling();

    return (
        <Container>
            <FamilieCheckbox
                id={registrerBarnSkjema.felter.erFolkeregistrert.id}
                erLesevisning={erLesevisning()}
                label={'Barnet er ikke folkeregistrert / har ikke fødselsnummer'}
                checked={!registrerBarnSkjema.felter.erFolkeregistrert.verdi}
                onChange={() => {
                    registrerBarnSkjema.felter.erFolkeregistrert.validerOgSettFelt(
                        !registrerBarnSkjema.felter.erFolkeregistrert.verdi
                    );
                    registrerBarnSkjema.felter.ident.nullstill();
                }}
            />

            {registrerBarnSkjema.felter.uregistrertBarnFødselsdato.erSynlig &&
                registrerBarnSkjema.felter.uregistrertBarnNavn.erSynlig && (
                    <UregistrertBarnInputs>
                        <Element>Tilgjengelige opplysninger om barnet</Element>
                        <br />

                        <FamilieDatovelger
                            {...registrerBarnSkjema.felter.uregistrertBarnFødselsdato.hentNavInputProps(
                                registrerBarnSkjema.visFeilmeldinger
                            )}
                            valgtDato={registrerBarnSkjema.felter.uregistrertBarnFødselsdato.verdi}
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
