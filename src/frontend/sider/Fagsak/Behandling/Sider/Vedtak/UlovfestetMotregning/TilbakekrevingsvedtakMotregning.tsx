import React, { useState } from 'react';

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import { FileTextIcon, FloppydiskIcon } from '@navikt/aksel-icons';
import { Box, Button, ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import Datovelger from './Datovelger';
import { Tekstfelt } from './Tekstfelt';
import type {
    OppdaterTilbakekrevingsvedtakMotregningDTO,
    TilbakekrevingsvedtakMotregningDTO,
} from '../../../../../../typer/tilbakekrevingsvedtakMotregning';

const PREUTFYLT_DEFAULT_TEKST_ÅRSAK_TIL_FEILUTBETALING =
    'Årsaken til feilutbetalingen er [SETT INN HVA SOM SKJEDDE, SKILL MELLOM BRUKERS HANDLINGER KONTRA BRUKERS FORSTÅELSE AV UTBETALINGEN].';
const PREUTFYLT_DEFAULT_TEKST_VURDERING_AV_SKYLD =
    'Vi vurderer at [VURDER SKYLD, SETT INN KONKRET BEGRUNNELSE, OG SKILL MELLOM MOTTAKERS HANDLINGER KONTRA MOTTAKERS FORSTÅELSE.].';

export type TilbakekrevingsvedtakMotregningSkjemaverdier = {
    årsakTilFeilutbetaling: string;
    vurderingAvSkyld: string;
    varselDato: string;
};

interface TilbakekrevingsvedtakMotregningProps {
    tilbakekrevingsvedtakMotregning: TilbakekrevingsvedtakMotregningDTO;
    oppdaterTilbakekrevingsvedtakMotregning: (
        tilbakekrevingsvedtakMotregning: OppdaterTilbakekrevingsvedtakMotregningDTO
    ) => Promise<void>;
    settVisDokumentModal: (vis: boolean) => void;
    hentBrevForTilbakekrevingsvedtakMotregning: () => void;
    hentetDokument: Ressurs<string>;
    erLesevisning: boolean;
}

export const TilbakekrevingsvedtakMotregning = ({
    tilbakekrevingsvedtakMotregning,
    oppdaterTilbakekrevingsvedtakMotregning,
    settVisDokumentModal,
    hentBrevForTilbakekrevingsvedtakMotregning,
    hentetDokument,
    erLesevisning,
}: TilbakekrevingsvedtakMotregningProps) => {
    const [lagrer, settLagrer] = useState(false);
    const [expansionCardErÅpen, settExpansionCardErÅpen] = useState(false);

    const form = useForm<TilbakekrevingsvedtakMotregningSkjemaverdier>({
        defaultValues: {
            årsakTilFeilutbetaling:
                tilbakekrevingsvedtakMotregning.årsakTilFeilutbetaling ??
                PREUTFYLT_DEFAULT_TEKST_ÅRSAK_TIL_FEILUTBETALING,
            vurderingAvSkyld:
                tilbakekrevingsvedtakMotregning.vurderingAvSkyld ??
                PREUTFYLT_DEFAULT_TEKST_VURDERING_AV_SKYLD,
            varselDato: tilbakekrevingsvedtakMotregning.varselDato,
        },
    });

    const { handleSubmit } = form;

    const lagreTilbakekrevingsvedtakOgLukkModal: SubmitHandler<
        TilbakekrevingsvedtakMotregningSkjemaverdier
    > = ({ varselDato, årsakTilFeilutbetaling, vurderingAvSkyld }) => {
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
                    <VStack gap="3" marginBlock="8">
                        <Heading level="2" size="small">
                            Tilbakekrevingsvedtak ved motregning
                        </Heading>

                        <ExpansionCard
                            size="small"
                            aria-label="Tilbakekrevingsvedtak ved motregning"
                            open={expansionCardErÅpen}
                        >
                            <ExpansionCard.Header
                                onClick={() => settExpansionCardErÅpen(!expansionCardErÅpen)}
                            >
                                <ExpansionCard.Title as="h3" size="small">
                                    Årsak til feilutbetaling og vurdering av skyld
                                </ExpansionCard.Title>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <VStack gap="6">
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
                                                variant="secondary"
                                                disabled={lagrer || erLesevisning}
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
                id={'forhandsvis-tilbakekrevingsvedtak-motregning-brev'}
                variant={'secondary'}
                size={'medium'}
                onClick={() => {
                    settVisDokumentModal(true);
                    hentBrevForTilbakekrevingsvedtakMotregning();
                }}
                loading={hentetDokument.status === RessursStatus.HENTER}
                icon={<FileTextIcon aria-hidden />}
            >
                Vis tilbakekrevingsvedtaksbrev
            </Button>
        </>
    );
};
