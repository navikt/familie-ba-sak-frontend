import React from 'react';

import styled from 'styled-components';

import Alertstripe from 'nav-frontend-alertstriper';
import navFarger from 'nav-frontend-core';
import { Ingress, Undertekst } from 'nav-frontend-typografi';

import { Globe, Heart, Home, Passport } from '@navikt/ds-icons';

import { IRestRegisterhistorikk } from '../../../typer/person';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import RegisteropplysningerTabell from './RegisteropplysningerTabell';

const Container = styled.div`
    width: 32rem; ;
`;

const HentetTidspunkt = styled(Undertekst)`
    margin-bottom: 1rem;
    color: ${navFarger.navGra40};
`;

interface IRegisteropplysningerProps {
    opplysninger: IRestRegisterhistorikk;
}

const Registeropplysninger: React.FC<IRegisteropplysningerProps> = ({ opplysninger }) => {
    const bleOpprettetUtenRegisteropplysninger = opplysninger.statsborgerskap.length === 0;

    return (
        <>
            <Ingress children={'Registeropplysninger'} />
            {bleOpprettetUtenRegisteropplysninger ? (
                <Alertstripe type="info" style={{ marginTop: '1rem' }}>
                    Behandlingen ble gjort før registeropplysninger ble lagret i systemet og mangler
                    derfor opplysninger.
                </Alertstripe>
            ) : (
                <Container>
                    <HentetTidspunkt
                        children={
                            'sist hentet fra Folkeregisteret ' +
                            formaterIsoDato(opplysninger.hentetTidspunkt, datoformat.DATO_TID)
                        }
                    />
                    <RegisteropplysningerTabell
                        opplysningstype={'Sivilstand'}
                        ikon={
                            <Heart
                                style={{ fontSize: '1.5rem' }}
                                aria-label="Hjerte ikon"
                                role="img"
                                focusable="false"
                            />
                        }
                        historikk={opplysninger.sivilstand}
                    />
                    <RegisteropplysningerTabell
                        opplysningstype={'Oppholdstillatelse'}
                        ikon={
                            <Passport
                                style={{ fontSize: '1.5rem' }}
                                aria-label="Pass ikon"
                                role="img"
                                focusable="false"
                            />
                        }
                        historikk={opplysninger.oppholdstillatelse}
                    />
                    <RegisteropplysningerTabell
                        opplysningstype={'Statsborgerskap'}
                        ikon={
                            <Globe
                                style={{ fontSize: '1.5rem' }}
                                aria-label="Globe ikon"
                                role="img"
                                focusable="false"
                            />
                        }
                        historikk={opplysninger.statsborgerskap}
                    />
                    <RegisteropplysningerTabell
                        opplysningstype={'Adresse'}
                        ikon={
                            <Home
                                style={{ fontSize: '1.5rem' }}
                                aria-label="Hjem ikon"
                                role="img"
                                focusable="false"
                            />
                        }
                        historikk={opplysninger.bostedsadresse}
                    />
                </Container>
            )}
        </>
    );
};

export default Registeropplysninger;
