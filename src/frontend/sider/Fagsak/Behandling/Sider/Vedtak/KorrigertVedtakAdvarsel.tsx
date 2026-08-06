import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, InfoCard } from '@navikt/ds-react';

export function KorrigertVedtakAdvarsel() {
    return (
        <Box marginBlock={'space-24'}>
            <InfoCard data-color={'info'}>
                <InfoCard.Message icon={<InformationSquareIcon aria-hidden={true} />}>
                    Vedtaket er korrigert etter § 35
                </InfoCard.Message>
            </InfoCard>
        </Box>
    );
}
