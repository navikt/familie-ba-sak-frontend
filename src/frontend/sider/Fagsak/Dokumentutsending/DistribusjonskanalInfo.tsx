import { useHentDistribusjonskanal } from '@hooks/useHentDistribusjonskanal';
import { Distribusjonskanal } from '@typer/dokument';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, InfoCard, Loader, LocalAlert } from '@navikt/ds-react';

interface Props {
    personIdent: string;
}

export function DistribusjonskanalInfo({ personIdent }: Props) {
    const { data, isPending, isError } = useHentDistribusjonskanal(personIdent);

    if (isPending) {
        return (
            <Box marginBlock={'space-16'}>
                <InfoCard data-color="info">
                    <InfoCard.Message icon={<Loader title="Laster" />}>Laster distribusjonskanal...</InfoCard.Message>
                </InfoCard>
            </Box>
        );
    }

    if (isError || data === undefined) {
        return (
            <Box marginBlock={'space-16'}>
                <LocalAlert status="error">
                    <LocalAlert.Header>
                        <LocalAlert.Title>Feil ved henting av distribusjonskanal</LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            </Box>
        );
    }

    switch (data) {
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
