import * as React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import Lenke from 'nav-frontend-lenker';
import { Feiloppsummering, SkjemaGruppe } from 'nav-frontend-skjema';

import { ExternalLink } from '@navikt/ds-icons';
import {
    Alert,
    BodyLong,
    BodyShort,
    Button,
    Heading,
    Label,
    Radio,
    RadioGroup,
    Tag,
} from '@navikt/ds-react';
import { FamilieTextarea, FlexDiv } from '@navikt/familie-form-elements';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useFagsakContext } from '../../../context/fagsak/FagsakContext';
import { useSimulering } from '../../../context/SimuleringContext';
import useDokument from '../../../hooks/useDokument';
import { DokumentIkon } from '../../../ikoner/DokumentIkon';
import { Tilbakekrevingsvalg, visTilbakekrevingsvalg } from '../../../typer/simulering';
import type { Målform } from '../../../typer/søknad';
import { målform } from '../../../typer/søknad';
import HelpText from '../../Felleskomponenter/HelpText';
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

const StyledTag = styled(Tag)`
    margin-left: auto;
    background-color: ${navFarger.navLysGra};
    border-color: ${navFarger.navGra60};
`;

const TilbakekrevingSkjemaGruppe = styled(SkjemaGruppe)`
    margin-top: 4rem;
    width: 90%;
    max-width: 40rem;

    .radiogruppe {
        margin-top: 2rem;
    }
`;

const StyledAlert = styled(Alert)`
    margin-top: 1.5rem;
`;

const StyledLabel = styled(Label)`
    margin-top: 4rem;
`;

interface IForhåndsvisTilbakekrevingsvarselbrevRequest {
    fritekst: string;
}

const TilbakekrevingSkjema: React.FC<{
    søkerMålform: Målform;
    harÅpenTilbakekrevingRessurs: Ressurs<boolean>;
}> = ({ søkerMålform, harÅpenTilbakekrevingRessurs }) => {
    const { vurderErLesevisning, åpenBehandling } = useBehandling();
    const { tilbakekrevingSkjema, hentFeilTilOppsummering, maksLengdeTekst } = useSimulering();
    const { fritekstVarsel, begrunnelse, tilbakekrevingsvalg } = tilbakekrevingSkjema.felter;
    const { hentForhåndsvisning, visDokumentModal, hentetDokument, settVisDokumentModal } =
        useDokument();
    const { bruker: brukerRessurs } = useFagsakContext();
    const bruker = brukerRessurs.status === RessursStatus.SUKSESS ? brukerRessurs.data : undefined;

    const erLesevisning = vurderErLesevisning();

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
            <StyledAlert variant="error">
                Det har skjedd er feil:
                {harÅpenTilbakekrevingRessurs.frontendFeilmelding}
            </StyledAlert>
        );
    }

    if (
        harÅpenTilbakekrevingRessurs.status === RessursStatus.SUKSESS &&
        harÅpenTilbakekrevingRessurs.data &&
        !vurderErLesevisning()
    ) {
        return (
            <>
                <StyledLabel>Tilbakekrevingsvalg</StyledLabel>
                <StyledAlert variant="warning">
                    Det foreligger en åpen tilbakekrevingsbehandling. Endringer i vedtaket vil
                    automatisk oppdatere eksisterende feilutbetalte perioder og beløp.
                </StyledAlert>
            </>
        );
    }

    if (vurderErLesevisning() && !tilbakekrevingSkjema.felter.tilbakekrevingsvalg.verdi) {
        return (
            <>
                <StyledLabel>Tilbakekrevingsvalg</StyledLabel>
                <StyledAlert variant="warning">
                    Tilbakekreving uten varsel er valgt automatisk, da feilutbetalingen ble avdekket
                    etter at saken ble sendt til beslutter.
                </StyledAlert>
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
                    erLesevisning={vurderErLesevisning()}
                    maxLength={maksLengdeTekst}
                    description="Hva er årsaken til feilutbetaling? Hvordan og når ble feilutbetalingen oppdaget? Begrunn hvordan feilutbetalingen skal behandles videre."
                />
                {erLesevisning ? (
                    <>
                        <Label>Fastsett videre behandling</Label>
                        <BodyShort>
                            {tilbakekrevingsvalg.verdi
                                ? visTilbakekrevingsvalg[tilbakekrevingsvalg.verdi]
                                : 'Ingen valgt'}
                        </BodyShort>
                    </>
                ) : (
                    <RadioGroup
                        {...tilbakekrevingsvalg.hentNavBaseSkjemaProps(
                            tilbakekrevingSkjema.visFeilmeldinger
                        )}
                        value={tilbakekrevingsvalg.verdi}
                        onChange={(val: Tilbakekrevingsvalg) => radioOnChange(val)}
                        legend={
                            <FlexDiv>
                                Fastsett videre behandling
                                <StyledHelpText placement="right">
                                    <StyledHelpTextContainer>
                                        <Heading size="small">
                                            Hvordan fastsette videre behandling?
                                        </Heading>
                                        <Heading size="xsmall">
                                            Opprett tilbakekreving, send varsel
                                        </Heading>
                                        <BodyLong size="small" spacing={true}>
                                            Hovedregel er at en feilutbetaling skal varsles, og at
                                            bruker får varsel samtidig med revurderingsvedtaket.
                                        </BodyLong>
                                        <Heading size="xsmall">
                                            Opprett tilbakekreving, ikke send varsel
                                        </Heading>
                                        <BodyLong size="small" spacing={true}>
                                            Velges unntaksvis når man er usikker på om inneværende
                                            måned blir feilutbetalt eller ikke. Eller at det
                                            fremstår som relativt sikkert at feilutbetalt beløp ikke
                                            skal kreves inn.
                                        </BodyLong>
                                        <Heading size="small">Avvent tilbakekreving</Heading>
                                        <BodyLong size="small" spacing={true}>
                                            Velges når man er rimelig sikker på at det ikke blir
                                            feilutbetaling.
                                        </BodyLong>
                                    </StyledHelpTextContainer>
                                </StyledHelpText>
                            </FlexDiv>
                        }
                    >
                        {bruker && !bruker.dødsfallDato && (
                            <>
                                <Radio
                                    value={Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL}
                                    name={'tilbakekreving'}
                                    id={'Opprett-tilbakekreving-send-varsel'}
                                >
                                    {'Opprett tilbakekreving, send varsel'}
                                </Radio>
                                {fritekstVarsel.erSynlig && (
                                    <FritekstVarsel>
                                        <FamilieTextarea
                                            label={
                                                <FritektsVarselLabel>
                                                    <FlexRad>
                                                        <Label>Fritekst i varselet</Label>
                                                        <StyledHelpText placement="right">
                                                            <StyledHelpTextContainer>
                                                                <BodyLong
                                                                    size="small"
                                                                    spacing={true}
                                                                >
                                                                    Her skal du oppgi hvorfor
                                                                    brukeren ikke skulle fått
                                                                    utbetalt ytelsen i perioden(e).
                                                                    Du må også oppgi hvordan
                                                                    feilutbetalingen ble oppdaget,
                                                                    hvem som oppdaget den og når den
                                                                    ble oppdaget eller meldt til
                                                                    NAV.
                                                                </BodyLong>
                                                                <BodyLong
                                                                    size="small"
                                                                    spacing={true}
                                                                >
                                                                    Eksempel på tekst:
                                                                </BodyLong>
                                                                <BodyLong
                                                                    size="small"
                                                                    spacing={true}
                                                                >
                                                                    Vi mottok melding fra deg (dato)
                                                                    om at du flyttet utenlands
                                                                    (dato). Du har ikke rett på
                                                                    barnetrygd når du oppholder deg
                                                                    utenlands. Da vi mottok
                                                                    meldingen fra deg, var det
                                                                    allerede utbetalt barnetrygd for
                                                                    perioden (Fom dato - Tom dato).
                                                                </BodyLong>
                                                                <Lenke
                                                                    href="https://navno.sharepoint.com/sites/intranett-kommunikasjon/SitePages/Språk.aspx"
                                                                    target="_blank"
                                                                >
                                                                    <span>
                                                                        Se retningslinjer for
                                                                        klarspråk:
                                                                    </span>
                                                                    <ExternalLink />
                                                                </Lenke>
                                                            </StyledHelpTextContainer>
                                                        </StyledHelpText>
                                                    </FlexRad>
                                                    <StyledTag variant="info" size="small">
                                                        Skriv {målform[søkerMålform].toLowerCase()}
                                                    </StyledTag>
                                                </FritektsVarselLabel>
                                            }
                                            {...fritekstVarsel.hentNavInputProps(
                                                tilbakekrevingSkjema.visFeilmeldinger ||
                                                    fritekstVarsel.verdi.length > maksLengdeTekst
                                            )}
                                            erLesevisning={vurderErLesevisning()}
                                            maxLength={maksLengdeTekst}
                                        />

                                        <ForhåndsvisVarselKnappContainer>
                                            <Button
                                                variant={'tertiary'}
                                                id={'forhandsvis-varsel'}
                                                onClick={() =>
                                                    åpenBehandling.status ===
                                                        RessursStatus.SUKSESS &&
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
                                                loading={
                                                    hentetDokument.status === RessursStatus.HENTER
                                                }
                                                size={'small'}
                                                icon={<DokumentIkon />}
                                            >
                                                {'Forhåndsvis varsel'}
                                            </Button>
                                        </ForhåndsvisVarselKnappContainer>
                                    </FritekstVarsel>
                                )}
                            </>
                        )}
                        <Radio
                            value={Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_UTEN_VARSEL}
                            name={'tilbakekreving'}
                            id={'Opprett-tilbakekreving-ikke-send-varsel'}
                        >
                            {'Opprett tilbakekreving, ikke send varsel'}
                        </Radio>
                        <Radio
                            value={Tilbakekrevingsvalg.IGNORER_TILBAKEKREVING}
                            name={'tilbakekreving'}
                            id={'avvent-tilbakekreving'}
                        >
                            {'Avvent tilbakekreving'}
                        </Radio>
                    </RadioGroup>
                )}
                {vurderErLesevisning() && fritekstVarsel.erSynlig && (
                    <FamilieTextarea
                        label="Fritekst i varselet"
                        {...fritekstVarsel.hentNavInputProps(tilbakekrevingSkjema.visFeilmeldinger)}
                        erLesevisning={vurderErLesevisning()}
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
