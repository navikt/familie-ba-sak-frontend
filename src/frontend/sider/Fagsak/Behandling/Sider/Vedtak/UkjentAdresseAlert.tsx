import { useDistribusjonskanalContext } from '@sider/Fagsak/DistribusjonskanalProvider';
import { Distribusjonskanal } from '@typer/dokument';

import { Box, LocalAlert } from '@navikt/ds-react';

export function UkjentAdresseAlert() {
    const { distribusjonskanal, distribusjonskanalError } = useDistribusjonskanalContext();

    if (distribusjonskanalError) {
        return (
            <Box marginBlock={'space-16'}>
                <LocalAlert status="warning">
                    <LocalAlert.Header>
                        <LocalAlert.Title>Klarte ikke laste inn distribusjonskanal.</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>{distribusjonskanalError.message}</LocalAlert.Content>
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
                            Legg til adresse i "Legg til brevmottaker". Hvis adresse ikke blir lagt til blir ikke brevet
                            sendt.
                        </LocalAlert.Content>
                    </LocalAlert>
                </Box>
            );
        default:
            return null;
    }
}
