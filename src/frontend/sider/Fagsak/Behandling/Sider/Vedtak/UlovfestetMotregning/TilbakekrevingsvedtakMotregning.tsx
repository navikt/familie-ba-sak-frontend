import { useErLesevisning } from '@hooks/useErLesevisning';
import { FloppydiskIcon } from '@navikt/aksel-icons';
import { Box, Button, ErrorMessage, ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

import Datovelger from './Datovelger';
import { ForhåndsvisTilbakekrevingsvedtaksbrev } from './ForhåndsvisTilbakekrevingsvedtaksbrev';
import { Tekstfelt } from './Tekstfelt';
import { useTilbakekrevingsvedtakMotregningForm } from './useTilbakekrevingsvedtakMotregningForm';

export function TilbakekrevingsvedtakMotregning() {
    const erLesevisning = useErLesevisning();

    const [expansionCardErÅpen, settExpansionCardErÅpen] = useState(false);

    const { form, onSubmit } = useTilbakekrevingsvedtakMotregningForm({
        lukkExpansionCard: () => settExpansionCardErÅpen(false),
    });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    return (
        <>
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
