import { Distribusjonskanal } from '@typer/dokument';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, InfoCard, LocalAlert } from '@navikt/ds-react';

interface Props {
    distribusjonskanal: Distribusjonskanal;
}

export function DistribusjonskanalInfo({ distribusjonskanal }: Props) {
    switch (distribusjonskanal) {
        case Distribusjonskanal.INGEN_DISTRIBUSJON:
        case Distribusjonskanal.UKJENT:
            return (
                <Box marginBlock={'space-16'}>
                    <LocalAlert status="warning">
                        <LocalAlert.Header>
                            <LocalAlert.Title>
                                Brevet kan ikke sendes fordi mottaker har ukjent adresse
                            </LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                </Box>
            );
        case Distribusjonskanal.DITT_NAV:
        case Distribusjonskanal.DPVT:
        case Distribusjonskanal.SDP:
            return (
                <Box marginBlock={'space-16'}>
                    <InfoCard data-color="info">
                        <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                            Brevet sendes digitalt
                        </InfoCard.Message>
                    </InfoCard>
                </Box>
            );
        default:
            return (
                <Box marginBlock={'space-16'}>
                    <InfoCard data-color="info">
                        <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                            Brevet sendes per post
                        </InfoCard.Message>
                    </InfoCard>
                </Box>
            );
    }
}
