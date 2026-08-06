import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, InfoCard } from '@navikt/ds-react';

export function KorrigertEtterbetalingAdvarsel() {
    return (
        <Box marginBlock={'space-24'}>
            <InfoCard data-color={'info'}>
                <InfoCard.Message icon={<InformationSquareIcon aria-hidden={true} />}>
                    Etterbetalingsbeløp i brevet er manuelt korrigert
                </InfoCard.Message>
            </InfoCard>
        </Box>
    );
}
