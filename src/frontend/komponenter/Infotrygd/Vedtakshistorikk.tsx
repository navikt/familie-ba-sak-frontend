import React from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Innholdstittel } from 'nav-frontend-typografi';

import { byggFunksjonellFeilRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useVedtakshistorikk } from '../../context/Infotrygd/VedtakshistorikkContext';
import { IInfotrygdstønader } from '../../typer/infotrygd';
import { hentFrontendFeilmelding } from '../../utils/ressursUtils';
import { Vedtakstabell } from './Vedtakstabell';

const VedtakshistorikkContainer = styled.div`
    margin: 1rem;
`;

const HentVedtakFlex = styled.div`
    margin-top: 4rem;
    margin-bottom: 2rem;
    display: flex;
`;

const HentVedtakKnapp = styled(Knapp)`
    margin-left: 1rem;
    margin-top: 30px;
    margin-bottom: auto;
    height: 40px;
`;

export const Vedtakshistorikk: React.FC = () => {
    const { onSubmit, tilgangFeilmelding, settSubmitRessurs, skjema } = useVedtakshistorikk();

    const skjemaErLåst = skjema.submitRessurs.status === RessursStatus.HENTER;

    const visTabell = () => {
        if (skjema.submitRessurs.status === RessursStatus.SUKSESS) {
            return <Vedtakstabell stønader={skjema.submitRessurs.data.stønader} />;
        } else {
            return undefined;
        }
    };

    return (
        <>
            <VedtakshistorikkContainer>
                <Innholdstittel>Vedtakshistorikk fra Infotrygd</Innholdstittel>
                <HentVedtakFlex>
                    <SkjemaGruppe feil={hentFrontendFeilmelding(skjema.submitRessurs)}>
                        <Input
                            {...skjema.felter.ident.hentNavInputProps(skjema.visFeilmeldinger)}
                            id={'hent-person'}
                            label={'Skriv inn fødselsnummer/D-nummer'}
                            bredde={'XL'}
                            placeholder={'fnr/dnr'}
                        />
                    </SkjemaGruppe>
                    <HentVedtakKnapp
                        mini
                        spinner={skjemaErLåst}
                        disabled={skjemaErLåst}
                        onClick={() => {
                            onSubmit(
                                {
                                    method: 'POST',
                                    data: { ident: skjema.felter.ident.verdi },
                                    url:
                                        '/familie-ba-sak/api/infotrygd/hent-infotrygdstonader-for-soker',
                                },
                                (ressurs: Ressurs<IInfotrygdstønader>) => {
                                    if (ressurs.status === RessursStatus.SUKSESS) {
                                        if (!ressurs.data.harTilgang) {
                                            settSubmitRessurs(
                                                byggFunksjonellFeilRessurs<IInfotrygdstønader>(
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
                        Hent vedtak
                    </HentVedtakKnapp>
                </HentVedtakFlex>
                {visTabell()}
            </VedtakshistorikkContainer>
        </>
    );
};
