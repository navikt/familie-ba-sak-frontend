import * as React from 'react';

import styled from 'styled-components';

import Alertstripe from 'nav-frontend-alertstriper';
import navFarger from 'nav-frontend-core';
import { EtikettInfo } from 'nav-frontend-etiketter';
import Lenke from 'nav-frontend-lenker';
import { Feiloppsummering, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Undertekst } from 'nav-frontend-typografi';

import { ExternalLink } from '@navikt/ds-icons';
import { BodyLong, Heading, HelpText } from '@navikt/ds-react';
import { FamilieRadioGruppe, FamilieTextarea, FlexDiv } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useSimulering } from '../../../context/SimuleringContext';
import useDokument from '../../../hooks/useDokument';
import { DokumentIkon } from '../../../ikoner/DokumentIkon';
import { Tilbakekrevingsvalg, visTilbakekrevingsvalg } from '../../../typer/simulering';
import type { Målform } from '../../../typer/søknad';
import { målform } from '../../../typer/søknad';
import IkonKnapp, { IkonPosisjon } from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
import PdfVisningModal from '../../Felleskomponenter/PdfVisningModal/PdfVisningModal';

const ForhåndsvisVarselKnappContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
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

const StyledHelpText = styled(HelpText)`
    margin-left: 1rem;
`;

const StyledHelpTextContainer = styled.div`
    max-width: 20rem;
`;

const StyledEtikettInfo = styled(EtikettInfo)`
    margin-left: auto;
    background-color: ${navFarger.navLysGra};
    border-color: ${navFarger.navGra60};
    padding: 0 0.5rem;
`;

const TilbakekrevingSkjemaGruppe = styled(SkjemaGruppe)`
    margin-top: 4rem;
    width: 90%;
    max-width: 40rem;

    .radiogruppe {
        margin-top: 2rem;
    }
`;

const StyledAlertstripe = styled(Alertstripe)`
    margin-top: 1.5rem;
`;

const StyledElement = styled(Element)`
    margin-top: 4rem;
`;

interface IForhåndsvisTilbakekrevingsvarselbrevRequest {
    fritekst: string;
}

const TilbakekrevingSkjema: React.FC<{
    søkerMålform: Målform;
    harÅpenTilbakekrevingRessurs: Ressurs<boolean>;
}> = ({ søkerMålform, harÅpenTilbakekrevingRessurs }) => {
    const { erLesevisning, åpenBehandling } = useBehandling();
    const { tilbakekrevingSkjema, hentFeilTilOppsummering, maksLengdeTekst } = useSimulering();
    const { fritekstVarsel, begrunnelse, tilbakekrevingsvalg } = tilbakekrevingSkjema.felter;
    const { hentForhåndsvisning, visDokumentModal, hentetDokument, settVisDokumentModal } =
        useDokument();

    const radioOnChange = (tilbakekrevingsalternativ: Tilbakekrevingsvalg) => {
        tilbakekrevingSkjema.felter.tilbakekrevingsvalg.validerOgSettFelt(
            tilbakekrevingsalternativ
        );
    };

    if (
        harÅpenTilbakekrevingRessurs.status === RessursStatus.FEILET ||
        harÅpenTilbakekrevingRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
        harÅpenTilbakekrevingRessurs.status === RessursStatus.IKKE_TILGANG
    ) {
        return (
            <StyledAlertstripe type="feil">
                Det har skjedd er feil:
                {harÅpenTilbakekrevingRessurs.frontendFeilmelding}
            </StyledAlertstripe>
        );
    }

    if (
        harÅpenTilbakekrevingRessurs.status === RessursStatus.SUKSESS &&
        harÅpenTilbakekrevingRessurs.data &&
        !erLesevisning()
    ) {
        return (
            <>
                <StyledElement>Tilbakekrevingsvalg</StyledElement>
                <StyledAlertstripe type="advarsel">
                    Det foreligger en åpen tilbakekrevingsbehandling. Endringer i vedtaket vil
                    automatisk oppdatere eksisterende feilutbetalte perioder og beløp.
                </StyledAlertstripe>
            </>
        );
    }

    if (erLesevisning() && !tilbakekrevingSkjema.felter.tilbakekrevingsvalg.verdi) {
        return (
            <>
                <StyledElement>Tilbakekrevingsvalg</StyledElement>
                <StyledAlertstripe type="advarsel">
                    Tilbakekreving uten varsel er valgt automatisk, da feilutbetailngen ble avdekket
                    etter at saken ble sendt til beslutter.
                </StyledAlertstripe>
            </>
        );
    }

    return (
        <>
            <PdfVisningModal
                åpen={visDokumentModal}
                onRequestClose={() => settVisDokumentModal(false)}
                pdfdata={hentetDokument}
            />

            <TilbakekrevingSkjemaGruppe legend="Tilbakekreving">
                <FamilieTextarea
                    label={
                        <FlexDiv>
                            Årsak til feilutbetaling og videre behandling
                            <StyledHelpText
                                title="Hvordan skal feltet fylles ut?"
                                placement="right"
                            >
                                <StyledHelpTextContainer>
                                    <Heading size="xsmall">Hvordan skal feltet fylles ut?</Heading>
                                    <BodyLong size="small">
                                        Pass på at teksten besvarer dette:
                                        <ul>
                                            <li>Hva er årsaken til feilutbetaling?</li>
                                            <li>Hvordan ble feilutbetalingen oppdaget?</li>
                                            <li>Når ble feilutbetalingen oppdaget?</li>
                                        </ul>
                                    </BodyLong>
                                    <Heading size="xsmall">
                                        Teksteksempel ved opprett tilbakekreving
                                    </Heading>
                                    <BodyLong size="small" spacing={true}>
                                        Barn født 01.02.03 flyttet fra bruker 01.01.2019. Bruker har
                                        mottatt barnetrygd for barnet etter at barnet ikke lenger
                                        bor fast sammen med bruker.
                                    </BodyLong>
                                    <BodyLong size="small" spacing={true}>
                                        Ble oppdaget når den andre forelderen fremsatte søknad om
                                        barnetrygd for barnet.
                                    </BodyLong>
                                    <BodyLong size="small" spacing={true}>
                                        Søknaden ble mottatt 11.03.2022. Bruker har ikke meldt fra
                                        om dette selv.
                                    </BodyLong>
                                    <Heading size="xsmall">
                                        Teksteksempel ved avvent tilbakekreving
                                    </Heading>
                                    <BodyLong size="small">
                                        Feilutbetaling gjelder kun inneværende måned, og
                                        utbetalingen stoppes antakelig.
                                    </BodyLong>
                                </StyledHelpTextContainer>
                            </StyledHelpText>
                        </FlexDiv>
                    }
                    {...begrunnelse.hentNavInputProps(
                        tilbakekrevingSkjema.visFeilmeldinger ||
                            begrunnelse.verdi.length > maksLengdeTekst
                    )}
                    erLesevisning={erLesevisning()}
                    maxLength={maksLengdeTekst}
                    description="Hva er årsaken til feilutbetaling? Hvordan og når ble feilutbetalingen oppdaget? Begrunn hvordan feilutbetalingen skal behandles videre."
                />

                <FamilieRadioGruppe
                    {...tilbakekrevingsvalg.hentNavBaseSkjemaProps(
                        tilbakekrevingSkjema.visFeilmeldinger
                    )}
                    erLesevisning={erLesevisning()}
                    verdi={
                        tilbakekrevingsvalg.verdi
                            ? visTilbakekrevingsvalg[tilbakekrevingsvalg.verdi]
                            : undefined
                    }
                    legend="Fastsett videre behandling"
                >
                    <Radio
                        label={'Opprett tilbakekreving, send varsel'}
                        name={'tilbakekreving'}
                        checked={
                            tilbakekrevingsvalg.verdi ===
                            Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL
                        }
                        onChange={() =>
                            radioOnChange(Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL)
                        }
                        id={'Opprett-tilbakekreving-send-varsel'}
                    />
                    {fritekstVarsel.erSynlig && (
                        <FritekstVarsel>
                            <FamilieTextarea
                                label={
                                    <FritektsVarselLabel>
                                        <FlexRad>
                                            <Element>Fritekst i varselet</Element>
                                            <StyledHelpText placement="right">
                                                <StyledHelpTextContainer>
                                                    <BodyLong size="small" spacing={true}>
                                                        Her skal du oppgi hvorfor brukeren ikke
                                                        skulle fått utbetalt ytelsen i perioden(e).
                                                        Du må også oppgi hvordan feilutbetalingen
                                                        ble oppdaget, hvem som oppdaget den og når
                                                        den ble oppdaget eller meldt til NAV.
                                                    </BodyLong>
                                                    <BodyLong size="small" spacing={true}>
                                                        Eksempel på tekst:
                                                    </BodyLong>
                                                    <BodyLong size="small" spacing={true}>
                                                        Vi mottok melding fra deg (dato) om at du
                                                        flyttet utenlands (dato). Du har ikke rett
                                                        på barnetrygd når du oppholder deg
                                                        utenlands. Da vi mottok meldingen fra deg,
                                                        var det allerede utbetalt barnetrygd for
                                                        perioden (Fom dato - Tom dato).
                                                    </BodyLong>
                                                    <Lenke
                                                        href="https://navno.sharepoint.com/sites/intranett-kommunikasjon/SitePages/Språk.aspx"
                                                        target="_blank"
                                                    >
                                                        <span>
                                                            Se retningslinjer for klarspråk:
                                                        </span>
                                                        <ExternalLink />
                                                    </Lenke>
                                                </StyledHelpTextContainer>
                                            </StyledHelpText>
                                        </FlexRad>
                                        <StyledEtikettInfo>
                                            <Undertekst>
                                                Skriv {målform[søkerMålform].toLowerCase()}
                                            </Undertekst>
                                        </StyledEtikettInfo>
                                    </FritektsVarselLabel>
                                }
                                {...fritekstVarsel.hentNavInputProps(
                                    tilbakekrevingSkjema.visFeilmeldinger ||
                                        fritekstVarsel.verdi.length > maksLengdeTekst
                                )}
                                erLesevisning={erLesevisning()}
                                maxLength={maksLengdeTekst}
                            />

                            <ForhåndsvisVarselKnappContainer>
                                <IkonKnapp
                                    id={'forhandsvis-varsel'}
                                    erLesevisning={false}
                                    label={'Forhåndsvis varsel'}
                                    ikon={<DokumentIkon />}
                                    onClick={() =>
                                        åpenBehandling.status === RessursStatus.SUKSESS &&
                                        hentForhåndsvisning<IForhåndsvisTilbakekrevingsvarselbrevRequest>(
                                            {
                                                method: 'POST',
                                                url: `/familie-ba-sak/api/tilbakekreving/${åpenBehandling.data.behandlingId}/forhandsvis-varselbrev`,
                                                data: {
                                                    fritekst: fritekstVarsel.verdi,
                                                },
                                            }
                                        )
                                    }
                                    spinner={hentetDokument.status === RessursStatus.HENTER}
                                    ikonPosisjon={IkonPosisjon.VENSTRE}
                                    mini={true}
                                />
                            </ForhåndsvisVarselKnappContainer>
                        </FritekstVarsel>
                    )}
                    <Radio
                        label={'Opprett tilbakekreving, ikke send varsel'}
                        name={'tilbakekreving'}
                        checked={
                            tilbakekrevingsvalg.verdi ===
                            Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_UTEN_VARSEL
                        }
                        onChange={() =>
                            radioOnChange(Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_UTEN_VARSEL)
                        }
                        id={'Opprett-tilbakekreving-ikke-send-varsel'}
                    />
                    <Radio
                        label={'Avvent tilbakekreving'}
                        name={'tilbakekreving'}
                        checked={
                            tilbakekrevingsvalg.verdi === Tilbakekrevingsvalg.IGNORER_TILBAKEKREVING
                        }
                        onChange={() => radioOnChange(Tilbakekrevingsvalg.IGNORER_TILBAKEKREVING)}
                        id={'avvent-tilbakekreving'}
                    />
                </FamilieRadioGruppe>
                {erLesevisning() && fritekstVarsel.erSynlig && (
                    <FamilieTextarea
                        label="Fritekst i varselet"
                        {...fritekstVarsel.hentNavInputProps(tilbakekrevingSkjema.visFeilmeldinger)}
                        erLesevisning={erLesevisning()}
                    />
                )}

                {tilbakekrevingSkjema.visFeilmeldinger && hentFeilTilOppsummering().length > 0 && (
                    <Feiloppsummering
                        tittel={'For å gå videre må du rette opp følgende:'}
                        feil={hentFeilTilOppsummering()}
                    />
                )}
            </TilbakekrevingSkjemaGruppe>
        </>
    );
};
export default TilbakekrevingSkjema;
