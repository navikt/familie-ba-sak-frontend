import React from 'react';

import styled from 'styled-components';

import { FlowerBladeFall, Globe, Heart, Home, Passport } from '@navikt/ds-icons';
import SvgCalender from '@navikt/ds-icons/esm/Calender';
import { Alert, Heading } from '@navikt/ds-react';
import { AFontWeightRegular, ASpacing4 } from '@navikt/ds-tokens/dist/tokens';

import { HentetLabel } from './HentetLabel';
import RegisteropplysningerTabell from './RegisteropplysningerTabell';
import type { IRestRegisterhistorikk } from '../../../../typer/person';
import { Registeropplysning } from '../../../../typer/registeropplysning';
import { datoformat, formaterIsoDato } from '../../../../utils/formatter';
import { kalenderDato, tilVisning } from '../../../../utils/kalender';

const Container = styled.div`
    width: 32rem;
`;

const SemiBoldHeading = styled(Heading)`
    font-weight: ${AFontWeightRegular};
`;

interface IRegisteropplysningerProps {
    registerHistorikk: IRestRegisterhistorikk;
    fødselsdato: string;
}

const Registeropplysninger: React.FC<IRegisteropplysningerProps> = ({
    registerHistorikk,
    fødselsdato,
}) => {
    const manglerRegisteropplysninger = registerHistorikk.statsborgerskap.length === 0;

    const personErDød = registerHistorikk.dødsboadresse.length > 0;

    return (
        <>
            <SemiBoldHeading level={3} size="medium">
                Registeropplysninger
            </SemiBoldHeading>
            {manglerRegisteropplysninger ? (
                <Alert variant="info" style={{ marginTop: ASpacing4 }}>
                    Det ble ikke hentet inn registeropplysninger på denne behandlingen.
                </Alert>
            ) : (
                <Container>
                    <HentetLabel
                        size={'small'}
                        style={{ marginBottom: ASpacing4 }}
                        children={
                            'Sist hentet fra Folkeregisteret ' +
                            formaterIsoDato(
                                registerHistorikk.hentetTidspunkt,
                                datoformat.DATO_TID_SEKUNDER
                            )
                        }
                    />
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.FØDSELSDATO}
                        ikon={
                            <SvgCalender
                                style={{ fontSize: '1.5rem' }}
                                aria-label="Kalender ikon"
                                role="img"
                                focusable="false"
                            />
                        }
                        historikk={[{ verdi: tilVisning(kalenderDato(fødselsdato)) }]}
                    />
                    {personErDød && (
                        <RegisteropplysningerTabell
                            opplysningstype={Registeropplysning.DØDSBOADRESSE}
                            ikon={
                                <FlowerBladeFall
                                    style={{ fontSize: '1.5rem' }}
                                    aria-label="Blomst ikon"
                                    role="img"
                                    focusable="false"
                                />
                            }
                            historikk={registerHistorikk.dødsboadresse}
                        />
                    )}
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.SIVILSTAND}
                        ikon={
                            <Heart
                                style={{ fontSize: '1.5rem' }}
                                aria-label="Hjerte ikon"
                                role="img"
                                focusable="false"
                            />
                        }
                        historikk={registerHistorikk.sivilstand}
                    />
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.OPPHOLD}
                        ikon={
                            <Passport
                                style={{ fontSize: '1.5rem' }}
                                aria-label="Pass ikon"
                                role="img"
                                focusable="false"
                            />
                        }
                        historikk={registerHistorikk.oppholdstillatelse}
                    />
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.STATSBORGERSKAP}
                        ikon={
                            <Globe
                                style={{ fontSize: '1.5rem' }}
                                aria-label="Globe ikon"
                                role="img"
                                focusable="false"
                            />
                        }
                        historikk={registerHistorikk.statsborgerskap}
                    />
                    <RegisteropplysningerTabell
                        opplysningstype={Registeropplysning.BOSTEDSADRESSE}
                        ikon={
                            <Home
                                style={{ fontSize: '1.5rem' }}
                                aria-label="Hjem ikon"
                                role="img"
                                focusable="false"
                            />
                        }
                        historikk={registerHistorikk.bostedsadresse}
                    />
                </Container>
            )}
        </>
    );
};

export default Registeropplysninger;
