import React from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Innholdstittel } from 'nav-frontend-typografi';

import { byggFunksjonellFeilRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useMigrering } from '../../context/MigreringContext';
import { IInfotrygdsaker } from '../../typer/infotrygd';
import { hentFrontendFeilmelding } from '../../utils/ressursUtils';
import { Sakstabell } from './Sakstabell';

const MigreringContainer = styled.div`
    margin: 16px;
`;

const HentSakerFlex = styled.div`
    margin-top: 64px;
    margin-bottom: 32px;
    display: flex;
`;

const HentSakerKnapp = styled(Knapp)`
    margin-left: 1rem;
    margin-top: 30px;
    margin-bottom: auto;
    height: 40px;
`;

const MigreringContent: React.FC = () => {
    const { onSubmit, tilgangFeilmelding, settSubmitRessurs, skjema } = useMigrering();

    const skjemaErLåst = skjema.submitRessurs.status === RessursStatus.HENTER;

    const visTabell = () => {
        switch (skjema.submitRessurs.status) {
            case RessursStatus.SUKSESS:
                return <Sakstabell saker={skjema.submitRessurs.data.saker} />;
            case RessursStatus.FEILET ||
                RessursStatus.FUNKSJONELL_FEIL ||
                RessursStatus.IKKE_TILGANG:
                return <div />;
            default:
                return <div />;
        }
    };

    return (
        <>
            {/* TODO: Her skal det være et Visittkort, men vi trenger å hente data fra PDL for navn og kjønn. ba-sak må utvides.*/}
            <MigreringContainer>
                <Innholdstittel>Sakshistorikk fra Infotrygd</Innholdstittel>
                <HentSakerFlex>
                    <SkjemaGruppe feil={hentFrontendFeilmelding(skjema.submitRessurs)}>
                        <Input
                            {...skjema.felter.ident.hentNavInputProps(skjema.visFeilmeldinger)}
                            id={'hent-person'}
                            label={'Skriv inn fødselsnummer/D-nummer'}
                            bredde={'XL'}
                            placeholder={'fnr/dnr'}
                        />
                    </SkjemaGruppe>
                    <HentSakerKnapp
                        mini
                        spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                        disabled={skjemaErLåst}
                        onClick={() => {
                            onSubmit(
                                {
                                    method: 'POST',
                                    data: { ident: skjema.felter.ident.verdi },
                                    url:
                                        '/familie-ba-sak/api/infotrygd/hent-infotrygdsaker-for-soker',
                                },
                                (ressurs: Ressurs<IInfotrygdsaker>) => {
                                    if (ressurs.status === RessursStatus.SUKSESS) {
                                        if (!ressurs.data.harTilgang) {
                                            settSubmitRessurs(
                                                byggFunksjonellFeilRessurs<IInfotrygdsaker>(
                                                    tilgangFeilmelding(
                                                        ressurs.data.adressebeskyttelsegradering
                                                    )
                                                )
                                            );
                                        }
                                    }
                                }
                            );
                        }}
                    >
                        Hent saker
                    </HentSakerKnapp>
                </HentSakerFlex>
                {visTabell()}
            </MigreringContainer>
        </>
    );
};

const Migrering: React.FC = () => {
    return <MigreringContent />;
};

export default Migrering;
