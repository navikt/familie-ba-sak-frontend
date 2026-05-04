import { useState } from 'react';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, HStack, InfoCard } from '@navikt/ds-react';

import type { OppdaterTilbakekrevingsvedtakMotregningDTO } from '../../../../../../typer/tilbakekrevingsvedtakMotregning';

interface IProps {
    slettTilbakekrevingsvedtakMotregning: () => Promise<void>;
    oppdaterTilbakekrevingsvedtakMotregning: (dto: OppdaterTilbakekrevingsvedtakMotregningDTO) => Promise<void>;
}

export const BekreftSamtykkeTilMotregning = ({
    slettTilbakekrevingsvedtakMotregning,
    oppdaterTilbakekrevingsvedtakMotregning,
}: IProps) => {
    const [oppdaterer, settOppdaterer] = useState(false);
    const [sletter, settSletter] = useState(false);

    return (
        <InfoCard data-color="info">
            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                <BodyLong spacing>
                    Bruker har samtykket til at vi venter med etterbetalingen til vi har vurdert feilutbetalingen
                </BodyLong>
                <HStack gap="space-16" justify="center">
                    <Button
                        onClick={() => {
                            settSletter(true);
                            slettTilbakekrevingsvedtakMotregning().finally(() => settSletter(false));
                        }}
                        loading={sletter}
                        disabled={sletter || oppdaterer}
                        variant="secondary"
                    >
                        Nei
                    </Button>
                    <Button
                        onClick={() => {
                            settOppdaterer(true);
                            oppdaterTilbakekrevingsvedtakMotregning({ samtykke: true }).finally(() =>
                                settOppdaterer(false)
                            );
                        }}
                        loading={oppdaterer}
                        disabled={oppdaterer || sletter}
                    >
                        Ja
                    </Button>
                </HStack>
            </InfoCard.Message>
        </InfoCard>
    );
};
