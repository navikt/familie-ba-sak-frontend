import * as React from 'react';

import { ExternalLinkIcon, FileTextIcon } from '@navikt/aksel-icons';
import {
    Alert,
    BodyLong,
    BodyShort,
    Box,
    Button,
    ErrorSummary,
    Fieldset,
    Heading,
    HStack,
    Label,
    Link,
    Radio,
    RadioGroup,
    Spacer,
    Tag,
    Textarea,
    VStack,
} from '@navikt/ds-react';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useSimuleringContext } from './SimuleringContext';
import styles from './TilbakekrevingSkjema.module.css';
import { ModalType } from '../../../../../context/ModalContext';
import { useModal } from '../../../../../hooks/useModal';
import {
    mutationKey,
    useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf,
} from '../../../../../hooks/useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf';
import { BrevmottakereAlert } from '../../../../../komponenter/Brevmottaker/BrevmottakereAlert';
import HelpText from '../../../../../komponenter/HelpText';
import type { IBehandling } from '../../../../../typer/behandling';
import { Tilbakekrevingsvalg, visTilbakekrevingsvalg } from '../../../../../typer/simulering';
import type { Målform } from '../../../../../typer/søknad';
import { målform } from '../../../../../typer/søknad';
import { useBrukerContext } from '../../../BrukerContext';
import { useBehandlingContext } from '../../context/BehandlingContext';

const TilbakekrevingSkjema: React.FC<{
    søkerMålform: Målform;
    harÅpenTilbakekrevingRessurs: Ressurs<boolean>;
    åpenBehandling: IBehandling;
}> = ({ søkerMålform, harÅpenTilbakekrevingRessurs, åpenBehandling }) => {
    const { vurderErLesevisning } = useBehandlingContext();
    const { tilbakekrevingSkjema, hentFeilTilOppsummering, maksLengdeTekst } = useSimuleringContext();

    const { åpneModal: åpneForhåndsvisOpprettingAvPdfModal } = useModal(ModalType.FORHÅNDSVIS_OPPRETTING_AV_PDF);

    const { mutate: opprettTilbakekrevingVarselBrevPdf, isPending: isOpprettTilbakekrevingVarselBrevPdfPending } =
        useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf({
            onMutate: () => åpneForhåndsvisOpprettingAvPdfModal({ mutationKey }),
        });

    const { bruker } = useBrukerContext();

    const { fritekstVarsel, begrunnelse, tilbakekrevingsvalg } = tilbakekrevingSkjema.felter;
    const brevmottakere = åpenBehandling.brevmottakere ?? [];
    const erLesevisning = vurderErLesevisning();

    const radioOnChange = (tilbakekrevingsalternativ: Tilbakekrevingsvalg) => {
        tilbakekrevingSkjema.felter.tilbakekrevingsvalg.validerOgSettFelt(tilbakekrevingsalternativ);
    };

    if (
        harÅpenTilbakekrevingRessurs.status === RessursStatus.FEILET ||
        harÅpenTilbakekrevingRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
        harÅpenTilbakekrevingRessurs.status === RessursStatus.IKKE_TILGANG
    ) {
        return (
            <Box marginBlock={'space-24 space-0'}>
                <Alert variant="error">
                    Det har skjedd en feil:
                    {harÅpenTilbakekrevingRessurs.frontendFeilmelding}
                </Alert>
            </Box>
        );
    }

    if (
        harÅpenTilbakekrevingRessurs.status === RessursStatus.SUKSESS &&
        harÅpenTilbakekrevingRessurs.data &&
        !erLesevisning
    ) {
        return (
            <VStack marginBlock={'space-64 space-0'} gap={'space-24'}>
                <Label>Tilbakekrevingsvalg</Label>
                <Alert variant="warning">
                    Det foreligger en åpen tilbakekrevingsbehandling. Endringer i vedtaket vil automatisk oppdatere
                    eksisterende feilutbetalte perioder og beløp.
                </Alert>
            </VStack>
        );
    }

    if (erLesevisning && !tilbakekrevingSkjema.felter.tilbakekrevingsvalg.verdi) {
        return (
            <VStack marginBlock={'space-64 space-0'} gap={'space-24'}>
                <Label>Tilbakekrevingsvalg</Label>
                <Alert variant="warning">
                    Tilbakekreving uten varsel er valgt automatisk, da feilutbetalingen ble avdekket etter at saken ble
                    sendt til beslutter.
                </Alert>
            </VStack>
        );
    }

    return (
        <>
            <Fieldset className={styles.fieldset} legend="Tilbakekreving" hideLegend>
                <VStack gap={'space-32'}>
                    <Heading level="2" size="medium">
                        Tilbakekreving
                    </Heading>
                    <Textarea
                        label={
                            <HStack gap={'space-16'}>
                                Årsak til feilutbetaling og videre behandling
                                <HelpText title="Hvordan skal feltet fylles ut?" placement="right">
                                    <Box maxWidth={'20rem'}>
                                        <Heading size="xsmall">Hvordan skal feltet fylles ut?</Heading>
                                        <BodyLong size="small">
                                            Pass på at teksten besvarer dette:
                                            <ul>
                                                <li>Hva er årsaken til feilutbetaling?</li>
                                                <li>Hvordan ble feilutbetalingen oppdaget?</li>
                                                <li>Når ble feilutbetalingen oppdaget?</li>
                                            </ul>
                                        </BodyLong>
                                        <Heading size="xsmall">Teksteksempel ved opprett tilbakekreving</Heading>
                                        <BodyLong size="small" spacing={true}>
                                            Barn født 01.02.03 flyttet fra bruker 01.01.2019. Bruker har mottatt
                                            barnetrygd for barnet etter at barnet ikke lenger bor fast sammen med
                                            bruker.
                                        </BodyLong>
                                        <BodyLong size="small" spacing={true}>
                                            Ble oppdaget når den andre forelderen fremsatte søknad om barnetrygd for
                                            barnet.
                                        </BodyLong>
                                        <BodyLong size="small" spacing={true}>
                                            Søknaden ble mottatt 11.03.2022. Bruker har ikke meldt fra om dette selv.
                                        </BodyLong>
                                        <Heading size="xsmall">Teksteksempel ved avvent tilbakekreving</Heading>
                                        <BodyLong size="small">
                                            Feilutbetaling gjelder kun inneværende måned, og utbetalingen stoppes
                                            antakelig.
                                        </BodyLong>
                                    </Box>
                                </HelpText>
                            </HStack>
                        }
                        {...begrunnelse.hentNavInputProps(
                            tilbakekrevingSkjema.visFeilmeldinger || begrunnelse.verdi.length > maksLengdeTekst
                        )}
                        readOnly={erLesevisning}
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
                            {...tilbakekrevingsvalg.hentNavBaseSkjemaProps(tilbakekrevingSkjema.visFeilmeldinger)}
                            value={tilbakekrevingsvalg.verdi}
                            onChange={(val: Tilbakekrevingsvalg) => radioOnChange(val)}
                            legend={
                                <HStack gap={'space-16'}>
                                    Fastsett videre behandling
                                    <HelpText placement="right">
                                        <Box maxWidth={'20rem'}>
                                            <Heading size="small">Hvordan fastsette videre behandling?</Heading>
                                            <Heading size="xsmall">Opprett tilbakekreving, send varsel</Heading>
                                            <BodyLong size="small" spacing={true}>
                                                Hovedregel er at en feilutbetaling skal varsles, og at bruker får varsel
                                                samtidig med revurderingsvedtaket.
                                            </BodyLong>
                                            <Heading size="xsmall">Opprett tilbakekreving, ikke send varsel</Heading>
                                            <BodyLong size="small" spacing={true}>
                                                Velges unntaksvis når man er usikker på om inneværende måned blir
                                                feilutbetalt eller ikke. Eller at det fremstår som relativt sikkert at
                                                feilutbetalt beløp ikke skal kreves inn.
                                            </BodyLong>
                                            <Heading size="small">Avvent tilbakekreving</Heading>
                                            <BodyLong size="small" spacing={true}>
                                                Velges når man er rimelig sikker på at det ikke blir feilutbetaling.
                                            </BodyLong>
                                        </Box>
                                    </HelpText>
                                </HStack>
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
                                    {tilbakekrevingsvalg.verdi ===
                                        Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL && (
                                        <BrevmottakereAlert
                                            className={styles.brevmottakereAlert}
                                            bruker={bruker}
                                            erPåBehandling={true}
                                            brevmottakere={brevmottakere}
                                            erLesevisning={erLesevisning}
                                            åpenBehandling={åpenBehandling}
                                        />
                                    )}
                                    {fritekstVarsel.erSynlig && (
                                        <VStack marginInline={'space-32 space-0'}>
                                            <Textarea
                                                className={styles.fritekstVarsel}
                                                label={
                                                    <HStack align="center" justify="space-between" wrap={false}>
                                                        <HStack align="center" wrap={false} gap={'space-16'}>
                                                            Fritekst i varselet
                                                            <HelpText placement="right">
                                                                <Box maxWidth={'20rem'}>
                                                                    <BodyLong size="small" spacing={true}>
                                                                        Her skal du oppgi hvorfor brukeren ikke skulle
                                                                        fått utbetalt ytelsen i perioden(e). Du må også
                                                                        oppgi hvordan feilutbetalingen ble oppdaget,
                                                                        hvem som oppdaget den og når den ble oppdaget
                                                                        eller meldt til Nav.
                                                                    </BodyLong>
                                                                    <BodyLong size="small" spacing={true}>
                                                                        Eksempel på tekst:
                                                                    </BodyLong>
                                                                    <BodyLong size="small" spacing={true}>
                                                                        Vi mottok melding fra deg (dato) om at du
                                                                        flyttet utenlands (dato). Du har ikke rett på
                                                                        barnetrygd når du oppholder deg utenlands. Da vi
                                                                        mottok meldingen fra deg, var det allerede
                                                                        utbetalt barnetrygd for perioden (Fom dato - Tom
                                                                        dato).
                                                                    </BodyLong>
                                                                    <Link
                                                                        href="https://navno.sharepoint.com/sites/intranett-kommunikasjon/SitePages/Språk.aspx"
                                                                        target="_blank"
                                                                    >
                                                                        <span>Se retningslinjer for klarspråk:</span>
                                                                        <ExternalLinkIcon fontSize={'1.3rem'} />
                                                                    </Link>
                                                                </Box>
                                                            </HelpText>
                                                        </HStack>
                                                        <Spacer />
                                                        <Tag variant="neutral" size="small">
                                                            Skriv {målform[søkerMålform].toLowerCase()}
                                                        </Tag>
                                                    </HStack>
                                                }
                                                {...fritekstVarsel.hentNavInputProps(
                                                    tilbakekrevingSkjema.visFeilmeldinger ||
                                                        fritekstVarsel.verdi.length > maksLengdeTekst
                                                )}
                                                readOnly={erLesevisning}
                                                maxLength={maksLengdeTekst}
                                            />
                                            <HStack justify={'end'} marginBlock={'space-0 space-16'}>
                                                <Button
                                                    variant={'tertiary'}
                                                    id={'forhandsvis-varsel'}
                                                    onClick={() => {
                                                        opprettTilbakekrevingVarselBrevPdf({
                                                            behandlingId: åpenBehandling.behandlingId,
                                                            payload: { fritekst: fritekstVarsel.verdi },
                                                        });
                                                    }}
                                                    size={'small'}
                                                    icon={<FileTextIcon />}
                                                    disabled={isOpprettTilbakekrevingVarselBrevPdfPending}
                                                >
                                                    Forhåndsvis varsel
                                                </Button>
                                            </HStack>
                                        </VStack>
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
                    {erLesevisning && fritekstVarsel.erSynlig && (
                        <Textarea
                            label="Fritekst i varselet"
                            {...fritekstVarsel.hentNavInputProps(tilbakekrevingSkjema.visFeilmeldinger)}
                            readOnly={erLesevisning}
                        />
                    )}
                    {tilbakekrevingSkjema.visFeilmeldinger && hentFeilTilOppsummering().length > 0 && (
                        <ErrorSummary heading={'For å gå videre må du rette opp følgende:'}>
                            {hentFeilTilOppsummering().map(item => (
                                <ErrorSummary.Item href={`#${item.skjemaelementId}`}>
                                    {item.feilmelding}
                                </ErrorSummary.Item>
                            ))}
                        </ErrorSummary>
                    )}
                </VStack>
            </Fieldset>
        </>
    );
};
export default TilbakekrevingSkjema;
