import { Distribusjonskanal } from '@typer/dokument';

import { Box, LocalAlert } from '@navikt/ds-react';

interface Props {
    distribusjonskanal: Distribusjonskanal;
}

export function UkjentAdresseAlert({ distribusjonskanal }: Props) {
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
