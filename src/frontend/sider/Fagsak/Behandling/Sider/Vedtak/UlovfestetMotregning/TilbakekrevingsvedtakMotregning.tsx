import { useState } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useHentEllerOpprettTilbakekrevingsvedtaksbrevPdf } from '@hooks/useHentEllerOpprettTilbakekrevingsvedtaksbrevPdf';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { useTilbakekrevingsvedtakMotregning } from '@sider/Fagsak/Behandling/Sider/Simulering/UlovfestetMotregning/useTilbakekrevingsvedtakMotregning';
import { BehandlerRolle, BehandlingSteg, hentStegNummer } from '@typer/behandling';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import { FileTextIcon, FloppydiskIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { Box, Button, ErrorMessage, ExpansionCard, Heading, HStack, Loader, Modal, VStack } from '@navikt/ds-react';

import Datovelger from './Datovelger';
import { Tekstfelt } from './Tekstfelt';
import Styles from './TilbakekrevingsvedtakMotregning.module.css';

const PREUTFYLT_DEFAULT_TEKST_ÅRSAK_TIL_FEILUTBETALING =
    'Årsaken til feilutbetalingen er [SETT INN HVA SOM SKJEDDE, SKILL MELLOM BRUKERS HANDLINGER KONTRA BRUKERS FORSTÅELSE AV UTBETALINGEN].';
const PREUTFYLT_DEFAULT_TEKST_VURDERING_AV_SKYLD =
    'Vi vurderer at [VURDER SKYLD, SETT INN KONKRET BEGRUNNELSE, OG SKILL MELLOM MOTTAKERS HANDLINGER KONTRA MOTTAKERS FORSTÅELSE.].';

export type TilbakekrevingsvedtakMotregningSkjemaverdier = {
    årsakTilFeilutbetaling: string;
    vurderingAvSkyld: string;
    varselDato: string;
};

export function TilbakekrevingsvedtakMotregning() {
    const saksbehandler = useSaksbehandler();
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();

    const { oppdaterTilbakekrevingsvedtakMotregning } = useTilbakekrevingsvedtakMotregning(behandling);

    const [visModal, settVisModal] = useState(false);
    const [lagrer, settLagrer] = useState(false);
    const [expansionCardErÅpen, settExpansionCardErÅpen] = useState(false);

    const tilbakekrevingsvedtakMotregning = behandling.tilbakekrevingsvedtakMotregning;
    const årsakTilFeilutbetaling = tilbakekrevingsvedtakMotregning?.årsakTilFeilutbetaling;
    const vurderingAvSkyld = tilbakekrevingsvedtakMotregning?.vurderingAvSkyld;
    const varselDato = tilbakekrevingsvedtakMotregning?.varselDato;

    const form = useForm<TilbakekrevingsvedtakMotregningSkjemaverdier>({
        values: {
            årsakTilFeilutbetaling: årsakTilFeilutbetaling ?? PREUTFYLT_DEFAULT_TEKST_ÅRSAK_TIL_FEILUTBETALING,
            vurderingAvSkyld: vurderingAvSkyld ?? PREUTFYLT_DEFAULT_TEKST_VURDERING_AV_SKYLD,
            varselDato: varselDato ?? '',
        },
    });

    const { handleSubmit } = form;

    const {
        data: tilbakekrevingsvedtaksbrevPdf,
        mutate: hentEllerOpprettTilbakekrevingsvedtaksbrevPdf,
        isPending: hentEllerOpprettTilbakekrevingsvedtaksbrevPdfIsPending,
        error: hentEllerOpprettTilbakekrevingsvedtaksbrevPdfError,
    } = useHentEllerOpprettTilbakekrevingsvedtaksbrevPdf();

    function onVisTilbakekrevingsvedtaksbrevClicked() {
        const { behandlingId, steg } = behandling;

        const erMinstSaksbehandler = saksbehandler.rolle >= BehandlerRolle.SAKSBEHANDLER;
        const erBeslutter = saksbehandler.rolle === BehandlerRolle.BESLUTTER;

        const erFørBeslutteVedtak = hentStegNummer(steg) < hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);
        const erPåBeslutteVedtak = hentStegNummer(steg) === hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const skalGenerereBrevUnderBehandling = erMinstSaksbehandler && erFørBeslutteVedtak;
        const skalGenerereBrevUnderBeslutning = erBeslutter && erPåBeslutteVedtak;

        const httpMethod = skalGenerereBrevUnderBehandling || skalGenerereBrevUnderBeslutning ? 'POST' : 'GET';

        hentEllerOpprettTilbakekrevingsvedtaksbrevPdf({ httpMethod, behandlingId });

        settVisModal(true);
    }

    const lagreTilbakekrevingsvedtakOgLukkModal: SubmitHandler<TilbakekrevingsvedtakMotregningSkjemaverdier> = ({
        varselDato,
        årsakTilFeilutbetaling,
        vurderingAvSkyld,
    }) => {
        settLagrer(true);
        oppdaterTilbakekrevingsvedtakMotregning({
            varselDato: varselDato,
            årsakTilFeilutbetaling: årsakTilFeilutbetaling,
            vurderingAvSkyld: vurderingAvSkyld,
        }).finally(() => {
            settLagrer(false);
            settExpansionCardErÅpen(false);
        });
    };

    return (
        <>
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(lagreTilbakekrevingsvedtakOgLukkModal)}>
                    <VStack gap="space-12" marginBlock="space-32">
                        <Heading level="2" size="small">
                            Tilbakekrevingsvedtak ved motregning
                        </Heading>

                        <ExpansionCard
                            size="small"
                            aria-label="Tilbakekrevingsvedtak ved motregning"
                            open={expansionCardErÅpen}
                        >
                            <ExpansionCard.Header onClick={() => settExpansionCardErÅpen(!expansionCardErÅpen)}>
                                <ExpansionCard.Title as="h3" size="small">
                                    Årsak til feilutbetaling og vurdering av skyld
                                </ExpansionCard.Title>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <VStack gap="space-24">
                                    <Datovelger
                                        feltnavn="varselDato"
                                        tittel="Varseldato"
                                        beskrivelse="Dato bruker fikk varsel om feilutbetaling."
                                        erLesevisning={erLesevisning}
                                    />
                                    <Tekstfelt
                                        feltnavn="årsakTilFeilutbetaling"
                                        tittel="Årsak til feilutbetaling"
                                        beskrivelse="Hva var grunnen til feilutbetalingen?"
                                        erLesevisning={erLesevisning}
                                    />
                                    <Tekstfelt
                                        feltnavn="vurderingAvSkyld"
                                        tittel="Vurdering av skyld"
                                        beskrivelse="I hvilken grad har bruker forårsaket en feilutbetaling eller forstått at det var en feilutbetaling?"
                                        erLesevisning={erLesevisning}
                                    />

                                    {!erLesevisning && (
                                        <Box width="fit-content">
                                            <Button
                                                size="medium"
                                                type="submit"
                                                variant="primary"
                                                disabled={erLesevisning}
                                                loading={lagrer}
                                                icon={<FloppydiskIcon aria-hidden />}
                                            >
                                                Lagre
                                            </Button>
                                        </Box>
                                    )}
                                </VStack>
                            </ExpansionCard.Content>
                        </ExpansionCard>
                    </VStack>
                </form>
            </FormProvider>
            <Button
                variant={'secondary'}
                size={'medium'}
                onClick={onVisTilbakekrevingsvedtaksbrevClicked}
                loading={hentEllerOpprettTilbakekrevingsvedtaksbrevPdfIsPending}
                icon={<FileTextIcon aria-hidden={true} />}
            >
                Vis tilbakekrevingsvedtaksbrev
            </Button>
            <Modal
                className={Styles.modal}
                open={visModal}
                onClose={() => settVisModal(false)}
                header={{ heading: 'Forhåndsvis tilbakekrevingsvedtaksbrev', closeButton: true }}
                width={'100rem'}
                portal={true}
            >
                {hentEllerOpprettTilbakekrevingsvedtaksbrevPdfIsPending && (
                    <HStack height={'100%'} justify={'center'} align={'center'} gap={'space-8'}>
                        <Loader size={'small'} title={'Laster Tilbakekrevingsvedtaksbrev...'} />
                        <Heading size={'small'} level={'2'}>
                            Laster Tilbakekrevingsvedtaksbrev...
                        </Heading>
                    </HStack>
                )}
                {hentEllerOpprettTilbakekrevingsvedtaksbrevPdfError && (
                    <HStack height={'100%'} justify={'center'} align={'center'} gap={'space-8'}>
                        <XMarkOctagonFillIcon color={'var(--ax-text-danger-subtle)'} fontSize={'1.2rem'} />
                        <ErrorMessage>{hentEllerOpprettTilbakekrevingsvedtaksbrevPdfError.message}</ErrorMessage>
                    </HStack>
                )}
                {!hentEllerOpprettTilbakekrevingsvedtaksbrevPdfIsPending &&
                    !hentEllerOpprettTilbakekrevingsvedtaksbrevPdfError && (
                        <iframe
                            className={Styles.iframe}
                            title={'Tilbakekrevingsvedtaksbrev'}
                            src={tilbakekrevingsvedtaksbrevPdf}
                        />
                    )}
            </Modal>
        </>
    );
}
