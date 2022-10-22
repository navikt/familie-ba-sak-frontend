import React from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { BodyShort, Checkbox, Label } from '@navikt/ds-react';
import { FamilieDatovelger, FamilieInput } from '@navikt/familie-form-elements';
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
    const { vurderErLesevisning } = useBehandling();

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
                <Checkbox
                    id={registrerBarnSkjema.felter.erFolkeregistrert.id}
                    value={'Barnet er ikke folkeregistrert / har ikke fødselsnummer'}
                    checked={!registrerBarnSkjema.felter.erFolkeregistrert.verdi}
                    onChange={() => {
                        registrerBarnSkjema.felter.erFolkeregistrert.validerOgSettFelt(
                            !registrerBarnSkjema.felter.erFolkeregistrert.verdi
                        );
                        registrerBarnSkjema.felter.ident.nullstill();
                    }}
                >
                    {'Barnet er ikke folkeregistrert / har ikke fødselsnummer'}
                </Checkbox>
            )}

            {registrerBarnSkjema.felter.uregistrertBarnFødselsdato.erSynlig &&
                registrerBarnSkjema.felter.uregistrertBarnNavn.erSynlig && (
                    <UregistrertBarnInputs>
                        <Label>Tilgjengelige opplysninger om barnet</Label>
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
