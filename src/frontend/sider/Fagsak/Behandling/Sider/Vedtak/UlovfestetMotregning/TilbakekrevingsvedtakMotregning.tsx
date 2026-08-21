import { useErLesevisning } from '@hooks/useErLesevisning';
import { useOppdaterTilbakekrevingsvedtakMotregning } from '@hooks/useOppdaterTilbakekrevingsvedtakMotregning';
import { FloppydiskIcon } from '@navikt/aksel-icons';
import { Box, Button, ErrorMessage, ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Datovelger from './Datovelger';
import { ForhåndsvisTilbakekrevingsvedtaksbrev } from './ForhåndsvisTilbakekrevingsvedtaksbrev';
import { Tekstfelt } from './Tekstfelt';

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
    const erLesevisning = useErLesevisning();

    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const { mutateAsync: oppdaterTilbakekrevingsvedtakMotregning } = useOppdaterTilbakekrevingsvedtakMotregning();

    const [expansionCardErÅpen, settExpansionCardErÅpen] = useState(false);

    const tilbakekrevingsvedtakMotregning = behandling.tilbakekrevingsvedtakMotregning;
    const årsakTilFeilutbetaling = tilbakekrevingsvedtakMotregning?.årsakTilFeilutbetaling;
    const vurderingAvSkyld = tilbakekrevingsvedtakMotregning?.vurderingAvSkyld;
    const varselDato = tilbakekrevingsvedtakMotregning?.varselDato;

    const form = useForm<TilbakekrevingsvedtakMotregningSkjemaverdier>({
        defaultValues: {
            årsakTilFeilutbetaling: årsakTilFeilutbetaling ?? PREUTFYLT_DEFAULT_TEKST_ÅRSAK_TIL_FEILUTBETALING,
            vurderingAvSkyld: vurderingAvSkyld ?? PREUTFYLT_DEFAULT_TEKST_VURDERING_AV_SKYLD,
            varselDato: varselDato,
        },
    });

    const {
        handleSubmit,
        setError,
        formState: { isSubmitting, errors },
    } = form;

    async function lagreTilbakekrevingsvedtak({
        varselDato,
        årsakTilFeilutbetaling,
        vurderingAvSkyld,
    }: TilbakekrevingsvedtakMotregningSkjemaverdier): Promise<void> {
        try {
            const oppdatertBehandling = await oppdaterTilbakekrevingsvedtakMotregning({
                behandlingId: behandling.behandlingId,
                tilbakekrevingsvedtakMotregning: { varselDato, årsakTilFeilutbetaling, vurderingAvSkyld },
            });
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            settExpansionCardErÅpen(false);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'En ukjent feil oppstod.';
            setError('root', { message });
        }
    }

    return (
        <>
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(lagreTilbakekrevingsvedtak)}>
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
                                                loading={isSubmitting}
                                                icon={<FloppydiskIcon aria-hidden />}
                                            >
                                                Lagre
                                            </Button>
                                        </Box>
                                    )}
                                    {errors.root?.message && <ErrorMessage>{errors.root.message}</ErrorMessage>}
                                </VStack>
                            </ExpansionCard.Content>
                        </ExpansionCard>
                    </VStack>
                </form>
            </FormProvider>
            <ForhåndsvisTilbakekrevingsvedtaksbrev />
        </>
    );
}
