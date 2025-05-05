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
} from '../../Simulering/UlovfestetMotregning/TilbakekrevingsvedtakMotregningDTO';

export type TilbakekrevingsvedtakMotregningSkjemaverdier = {
    årsakTilFeilutbetaling: string;
    vurderingAvSkyld: string;
    varselDato: string;
};

interface TilbakekrevingsvedtakMotregningExpansionCardProps {
    tilbakekrevingsvedtakMotregning: TilbakekrevingsvedtakMotregningDTO;
    oppdaterTilbakekrevingsvedtakMotregning: (
        tilbakekrevingsvedtakMotregning: OppdaterTilbakekrevingsvedtakMotregningDTO
    ) => Promise<void>;
    settVisDokumentModal: (vis: boolean) => void;
    hentBrevForTilbakekrevingsvedtakMotregning: () => void;
    hentetDokument: Ressurs<string>;
}

export const TilbakekrevingsvedtakMotregning = ({
    tilbakekrevingsvedtakMotregning,
    oppdaterTilbakekrevingsvedtakMotregning,
    settVisDokumentModal,
    hentBrevForTilbakekrevingsvedtakMotregning,
    hentetDokument,
}: TilbakekrevingsvedtakMotregningExpansionCardProps) => {
    const [lagrer, settLagrer] = useState(false);
    const [expansionCardErÅpen, settExpansionCardErÅpen] = useState(false);

    const form = useForm<TilbakekrevingsvedtakMotregningSkjemaverdier>({
        defaultValues: {
            årsakTilFeilutbetaling: tilbakekrevingsvedtakMotregning.årsakTilFeilutbetaling ?? '',
            vurderingAvSkyld: tilbakekrevingsvedtakMotregning.vurderingAvSkyld ?? '',
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
                                    Årsak til feilutbetaling
                                </ExpansionCard.Title>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <VStack gap="6">
                                    <Datovelger
                                        feltnavn="varselDato"
                                        tittel="Varseldato"
                                        beskrivelse="Dato for når varsel ble sendt til bruker"
                                    />
                                    <Tekstfelt
                                        feltnavn="årsakTilFeilutbetaling"
                                        tittel="Årsak til feilutbetaling"
                                        beskrivelse="Hva er grunnen til feilutbetalingen?"
                                    />
                                    <Tekstfelt
                                        feltnavn="vurderingAvSkyld"
                                        tittel="Vurdering av skyld"
                                        beskrivelse="Burde bruker forstått at det var en feilutbetaling?"
                                    />
                                    <Box width="fit-content">
                                        <Button
                                            size="medium"
                                            type="submit"
                                            variant="secondary"
                                            disabled={lagrer}
                                            loading={lagrer}
                                            icon={<FloppydiskIcon aria-hidden />}
                                        >
                                            Lagre
                                        </Button>
                                    </Box>
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
