import React from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import navFarger from 'nav-frontend-core';
import { Normaltekst } from 'nav-frontend-typografi';

import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { adressebeskyttelsestyper } from '../../../../typer/person';
import { formaterPersonIdent } from '../../../../utils/formatter';
import { ISøkResultat } from './typer';

import { inputId } from '.';

interface Props {
    formaterResultat?: (søkResultat: ISøkResultat) => React.ReactNode;
    søkResultatOnClick: (søkResultat: ISøkResultat) => void;
    søkResultater: Ressurs<ISøkResultat[]>;
    valgtSøkResultat: number;
}

const ResultatListe = styled.ul`
    width: 20rem;
    padding: 0;
    margin: 0;
`;

const StyledAlertStripe = styled(AlertStripe)`
    width: 20rem;
`;

const ResultatListeElement = styled.li<{ fokus: boolean }>`
    list-style-type: none;
    padding: 0.5rem;
    border-bottom: 1px solid ${navFarger.navGra60};
    outline: ${({ fokus }) => (fokus ? `3px solid ${navFarger.fokusFarge}` : '')};

    &:hover {
        background-color: ${navFarger.navLysGra};
        cursor: pointer;
    }
`;

const ResultatListeElementKnapp = styled.div`
    display: flex;
    flex-direction: row;

    & svg {
        text-align: center;
        padding-right: 0.5rem;
    }
`;

const SøkResultater: React.FC<Props> = ({
    formaterResultat,
    søkResultatOnClick,
    søkResultater,
    valgtSøkResultat,
}) => {
    switch (søkResultater.status) {
        case RessursStatus.SUKSESS:
            return søkResultater.data.length > 0 ? (
                <ResultatListe aria-labelledby={inputId}>
                    {søkResultater.data.map((søkResultat: ISøkResultat, index: number) => {
                        if (formaterResultat) {
                            return formaterResultat(søkResultat);
                        } else {
                            return (
                                <ResultatListeElement
                                    key={index}
                                    fokus={index === valgtSøkResultat}
                                >
                                    <ResultatListeElementKnapp
                                        aria-label={
                                            søkResultat.harTilgang
                                                ? søkResultat.navn
                                                : 'Person har diskresjonskode'
                                        }
                                        aria-selected={index === valgtSøkResultat}
                                        role={'option'}
                                        onClick={() => søkResultatOnClick(søkResultat)}
                                    >
                                        {søkResultat.ikon}
                                        <div>
                                            <Normaltekst>
                                                {søkResultat.harTilgang
                                                    ? `${søkResultat.navn} (${formaterPersonIdent(
                                                          søkResultat.ident
                                                      )})`
                                                    : `Personen har diskresjonskode ${
                                                          søkResultat.adressebeskyttelseGradering
                                                              ? adressebeskyttelsestyper[
                                                                    søkResultat
                                                                        .adressebeskyttelseGradering
                                                                ]
                                                              : 'ukjent'
                                                      }`}
                                            </Normaltekst>

                                            {!søkResultat.fagsakId && søkResultat.harTilgang && (
                                                <Normaltekst>
                                                    {`Ingen fagsak. ${
                                                        !søkResultat.fagsakId
                                                            ? 'Trykk for å opprette >'
                                                            : ''
                                                    }`}
                                                </Normaltekst>
                                            )}
                                        </div>
                                    </ResultatListeElementKnapp>
                                </ResultatListeElement>
                            );
                        }
                    })}
                </ResultatListe>
            ) : (
                <StyledAlertStripe type={'info'}>Beklager, ingen treff</StyledAlertStripe>
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
        case RessursStatus.IKKE_TILGANG:
            return (
                <StyledAlertStripe type="feil">
                    {søkResultater.frontendFeilmelding}
                </StyledAlertStripe>
            );
        case RessursStatus.HENTER:
            return <StyledAlertStripe type={'info'}>Søker...</StyledAlertStripe>;
        default:
            return (
                <StyledAlertStripe type={'info'}>
                    Tast inn fødselsnummer eller d-nummer. Trykk 'enter' for å søke.
                </StyledAlertStripe>
            );
    }
};

export default SøkResultater;
