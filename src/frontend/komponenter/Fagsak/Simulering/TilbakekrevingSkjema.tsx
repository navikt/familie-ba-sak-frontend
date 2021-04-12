import * as React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { EtikettInfo } from 'nav-frontend-etiketter';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import { Radio, Feiloppsummering } from 'nav-frontend-skjema';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';

import { FamilieTextarea, FamilieRadioGruppe } from '@navikt/familie-form-elements';

import { useBehandling } from '../../../context/BehandlingContext';
import { useSimulering } from '../../../context/SimuleringContext';
import { TilbakekrevingAlternativ } from '../../../typer/simulering';
import { Målform, målform } from '../../../typer/søknad';

const TextAreaWrapper = styled.div`
    max-width: 25rem;
`;

const StyledTextArea = styled(FamilieTextarea)`
    max-width: 25rem;
`;
const FritekstVarsel = styled.div`
    margin-left: 2rem;
`;

const FritektsVarselLabel = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`;

const FlexRad = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
`;

const StyledHjelpetekst = styled(Hjelpetekst)`
    margin-left: 1rem;
`;

const StyledNormaltekst = styled(Normaltekst)`
    max-width: 20rem;
`;

const StyledEtikettInfo = styled(EtikettInfo)`
    margin-left: auto;
    background-color: ${navFarger.navLysGra};
    border-color: ${navFarger.navGra60};
    padding: 0 0.5rem;
`;

const Tilbakekreving = styled.div`
    margin-top: 4rem;
`;

const TilbakekrevingSkjema: React.FC<{ søkerMålform: Målform }> = ({ søkerMålform }) => {
    const { erLesevisning } = useBehandling();
    const { skjema, hentFeilTilOppsummering } = useSimulering();

    const radioOnChange = (tilbakekrevingsalternativ: TilbakekrevingAlternativ) => {
        skjema.felter.tilbakekreving.validerOgSettFelt(tilbakekrevingsalternativ);
    };

    return (
        <Tilbakekreving>
            {' '}
            <FamilieRadioGruppe
                {...skjema.felter.tilbakekreving.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                verdi={
                    skjema.felter.tilbakekreving.verdi
                        ? skjema.felter.tilbakekreving.verdi.toString()
                        : undefined
                }
                legend={<Element>Tilbakekreving</Element>}
            >
                <Radio
                    label={'Opprett tilbakekreving, send varsel'}
                    name={'tilbakekreving'}
                    checked={
                        skjema.felter.tilbakekreving.verdi ===
                        TilbakekrevingAlternativ.OPPRETT_SEND_VARSEL
                    }
                    onChange={() => radioOnChange(TilbakekrevingAlternativ.OPPRETT_SEND_VARSEL)}
                    id={'Opprett-tilbakekreving-send-varsel'}
                />
                {skjema.felter.fritekstVarsel.erSynlig && (
                    <FritekstVarsel>
                        <TextAreaWrapper>
                            <StyledTextArea
                                label={
                                    <FritektsVarselLabel>
                                        <FlexRad>
                                            <Element>Fritekst i varselet</Element>
                                            <StyledHjelpetekst type={PopoverOrientering.Hoyre}>
                                                <StyledNormaltekst>
                                                    Her skal du oppgi hvorfor brukeren ikke skulle
                                                    fått utbetalt ytelsen i perioden(e). Du må også
                                                    oppgi hvordan feilutbetalingen ble oppdaget,
                                                    hvem som oppdaget den og når den ble oppdaget
                                                    eller meldt til NAV.
                                                </StyledNormaltekst>
                                                <br />
                                                <StyledNormaltekst>
                                                    Eksempel på tekst:
                                                </StyledNormaltekst>
                                                <br />
                                                <StyledNormaltekst>
                                                    Vi mottok melding fra deg (dato) om at du
                                                    flyttet utenlands (dato). Du har ikke rett på
                                                    barnetrygd når du oppholder deg utenlands. Da vi
                                                    mottok meldingen fra deg, var det allerede
                                                    utbetalt barnetrygd for perioden (Fom dato - Tom
                                                    dato).
                                                </StyledNormaltekst>
                                            </StyledHjelpetekst>
                                        </FlexRad>
                                        <StyledEtikettInfo>
                                            <Undertekst>
                                                Skriv {målform[søkerMålform].toLowerCase()}
                                            </Undertekst>
                                        </StyledEtikettInfo>
                                    </FritektsVarselLabel>
                                }
                                {...skjema.felter.fritekstVarsel.hentNavInputProps(
                                    skjema.visFeilmeldinger
                                )}
                                erLesevisning={erLesevisning()}
                                maxLength={1500}
                            />
                        </TextAreaWrapper>
                    </FritekstVarsel>
                )}
                <Radio
                    label={'Opprett tilbakekreving, ikke send varsel'}
                    name={'tilbakekreving'}
                    checked={
                        skjema.felter.tilbakekreving.verdi ===
                        TilbakekrevingAlternativ.OPPRETT_IKKE_SEND_VARSEL
                    }
                    onChange={() =>
                        radioOnChange(TilbakekrevingAlternativ.OPPRETT_IKKE_SEND_VARSEL)
                    }
                    id={'Opprett-tilbakekreving-ikke-send-varsel'}
                />
                <Radio
                    label={'Avvent tilbakekreving'}
                    name={'tilbakekreving'}
                    checked={
                        skjema.felter.tilbakekreving.verdi ===
                        TilbakekrevingAlternativ.AVVENT_TILMBAKEKREVING
                    }
                    onChange={() => radioOnChange(TilbakekrevingAlternativ.AVVENT_TILMBAKEKREVING)}
                    id={'avvent-tilbakekreving'}
                />
            </FamilieRadioGruppe>
            <TextAreaWrapper>
                <StyledTextArea
                    label="Begrunnelse"
                    {...skjema.felter.begrunnelse.hentNavInputProps(skjema.visFeilmeldinger)}
                    erLesevisning={erLesevisning()}
                    maxLength={1500}
                />
            </TextAreaWrapper>
            {skjema.visFeilmeldinger && hentFeilTilOppsummering().length > 0 && (
                <Feiloppsummering
                    tittel={'For å gå videre må du rette opp følgende:'}
                    feil={hentFeilTilOppsummering()}
                />
            )}
        </Tilbakekreving>
    );
};
export default TilbakekrevingSkjema;
