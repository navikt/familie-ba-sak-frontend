import React from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Innholdstittel } from 'nav-frontend-typografi';

import { byggFunksjonellFeilRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useInfotrygd } from '../../context/InfotrygdContext';
import { IInfotrygdsaker } from '../../typer/infotrygd';
import { hentFrontendFeilmelding } from '../../utils/ressursUtils';
import { Sakstabell } from './Sakstabell';

const InfotrygdContainer = styled.div`
    margin: 1rem;
`;

const HentSakerFlex = styled.div`
    margin-top: 4rem;
    margin-bottom: 2rem;
    display: flex;
`;

const HentSakerKnapp = styled(Knapp)`
    margin-left: 1rem;
    margin-top: 30px;
    margin-bottom: auto;
    height: 40px;
`;

export const Infotrygd: React.FC = () => {
    const {
        onSubmit,
        tilgangFeilmelding,
        settSubmitRessurs,
        skjema,
        sorterSakerEtterSaksnr,
    } = useInfotrygd();

    const skjemaErLåst = skjema.submitRessurs.status === RessursStatus.HENTER;

    const visTabell = () => {
        if (skjema.submitRessurs.status === RessursStatus.SUKSESS) {
            return <Sakstabell saker={sorterSakerEtterSaksnr(skjema.submitRessurs.data.saker)} />;
        } else {
            return undefined;
        }
    };

    return (
        <>
            {/* TODO: Her skal det være et Visittkort, men vi trenger å hente data fra PDL for navn og kjønn. ba-sak må utvides.*/}
            <InfotrygdContainer>
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
                        spinner={skjemaErLåst}
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
            </InfotrygdContainer>
        </>
    );
};
