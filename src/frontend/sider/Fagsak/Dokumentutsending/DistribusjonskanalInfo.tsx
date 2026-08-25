import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, ErrorMessage, InfoCard, LocalAlert } from '@navikt/ds-react';
import { useDistribusjonskanalContext } from '@sider/Fagsak/DistribusjonskanalProvider';
import { Distribusjonskanal } from '@typer/dokument';

export function DistribusjonskanalInfo() {
    const { distribusjonskanal, distribusjonskanalError } = useDistribusjonskanalContext();

    if (distribusjonskanalError) {
        return (
            <Box marginBlock={'space-16'}>
                <LocalAlert status="error">
                    <LocalAlert.Header>
                        <LocalAlert.Title>Feil ved henting av distribusjonskanal</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>
                        <ErrorMessage>{distribusjonskanalError.message}</ErrorMessage>
                    </LocalAlert.Content>
                </LocalAlert>
            </Box>
        );
    }

    switch (distribusjonskanal) {
        case Distribusjonskanal.INGEN_DISTRIBUSJON:
        case Distribusjonskanal.UKJENT:
            return (
                <Box marginBlock={'space-16'}>
                    <LocalAlert status="warning">
                        <LocalAlert.Header>
                            <LocalAlert.Title>
                                Søker mottar ikke digitale brev og har ingen kjent adresse.
                            </LocalAlert.Title>
                        </LocalAlert.Header>
                        <LocalAlert.Content>
                            Legg til adresse i "Legg til brevmottaker". Hvis adresse ikke blir lagt til kan ikke brevet
                            sendes.
                        </LocalAlert.Content>
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
