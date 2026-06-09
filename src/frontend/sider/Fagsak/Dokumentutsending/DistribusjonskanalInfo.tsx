import { Distribusjonskanal } from '@typer/dokument';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, InfoCard, Loader, LocalAlert } from '@navikt/ds-react';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

interface Props {
    distribusjonskanal: Ressurs<Distribusjonskanal>;
}

export function DistribusjonskanalInfo({ distribusjonskanal }: Props) {
    switch (distribusjonskanal.status) {
        case RessursStatus.SUKSESS:
            switch (distribusjonskanal.data) {
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
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
        case RessursStatus.IKKE_TILGANG:
            return (
                <Box marginBlock={'space-16'}>
                    <LocalAlert status="error">
                        <LocalAlert.Header>
                            <LocalAlert.Title>{distribusjonskanal.frontendFeilmelding}</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                </Box>
            );
        case RessursStatus.IKKE_HENTET:
        case RessursStatus.HENTER:
            return (
                <Box marginBlock={'space-16'}>
                    <InfoCard data-color="info">
                        <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                            <Loader title="Laster" />
                        </InfoCard.Message>
                    </InfoCard>
                </Box>
            );
        default:
            return (
                <Box marginBlock={'space-16'}>
                    <LocalAlert status="error">
                        <LocalAlert.Header>
                            <LocalAlert.Title>Ukjent feil ved henting av distribusjonskanal</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                </Box>
            );
    }
}
