import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import Alertstripe from 'nav-frontend-alertstriper';
import navFarger from 'nav-frontend-core';
import { EtikettInfo } from 'nav-frontend-etiketter';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import { Radio, Feiloppsummering, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';

import { FamilieTextarea, FamilieRadioGruppe } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { RessursStatus, Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/BehandlingContext';
import { useSimulering } from '../../../context/SimuleringContext';
import { DokumentIkon } from '../../../ikoner/DokumentIkon';
import { visTilbakekrevingsvalg, Tilbakekrevingsvalg } from '../../../typer/simulering';
import { Målform, målform } from '../../../typer/søknad';
import IkonKnapp from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
import PdfVisningModal from '../../Felleskomponenter/PdfVisningModal/PdfVisningModal';
import useForhåndsvisning from '../../Felleskomponenter/PdfVisningModal/useForhåndsvisning';
import SkjultLegend from '../../Felleskomponenter/SkjultLegend';

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

const TilbakekrevingSkjemaGruppe = styled(SkjemaGruppe)`
    margin-top: 4rem;
    max-width: 25rem;
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

const TilbakekrevingSkjema: React.FC<{ søkerMålform: Målform; fagsakId: number }> = ({
    søkerMålform,
    fagsakId,
}) => {
    const { request } = useHttp();
    const { erLesevisning, åpenBehandling } = useBehandling();
    const { tilbakekrevingSkjema, hentFeilTilOppsummering, maksLengdeTekst } = useSimulering();
    const { fritekstVarsel, begrunnelse, tilbakekrevingsvalg } = tilbakekrevingSkjema.felter;
    const [harÅpenTilbakekrevingRessurs, settHarÅpentTilbakekrevingRessurs] = useState<
        Ressurs<boolean>
    >({
        status: RessursStatus.HENTER,
    });
    const {
        hentForhåndsvisning,
        visForhåndsvisningModal,
        hentetForhåndsvisning,
        settVisForhåndsviningModal,
    } = useForhåndsvisning();

    useEffect(() => {
        request<undefined, boolean>({
            method: 'GET',
            url: `/familie-ba-sak/api/fagsaker/${fagsakId}/har-apen-tilbakekreving`,
            påvirkerSystemLaster: true,
        }).then(response => {
            settHarÅpentTilbakekrevingRessurs(response);
        });
    }, [fagsakId]);

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
                    Det foreligger en åpen tilbakekrevingsbehandling, endringer i vedtaket vil
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
                åpen={visForhåndsvisningModal}
                onRequestClose={() => settVisForhåndsviningModal(false)}
                pdfdata={hentetForhåndsvisning}
            />

            <TilbakekrevingSkjemaGruppe legend={<SkjultLegend>Tilbakekrevingsvalg</SkjultLegend>}>
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
                    legend={<Element>Tilbakekreving</Element>}
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
                                    spinner={hentetForhåndsvisning.status === RessursStatus.HENTER}
                                    knappPosisjon={'venstre'}
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

                <FamilieTextarea
                    label="Begrunnelse"
                    {...begrunnelse.hentNavInputProps(
                        tilbakekrevingSkjema.visFeilmeldinger ||
                            begrunnelse.verdi.length > maksLengdeTekst
                    )}
                    erLesevisning={erLesevisning()}
                    maxLength={maksLengdeTekst}
                />

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
