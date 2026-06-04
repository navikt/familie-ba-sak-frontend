import { useNavigate } from 'react-router';

import { BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';

export function NotFound() {
    const navigate = useNavigate();

    function gåTilForsiden() {
        navigate('/');
    }

    return (
        <Box marginBlock={'space-128'} marginInline={'space-128'}>
            <VStack align={'start'} gap={'space-32'}>
                <Heading level={'1'} size={'large'}>
                    Beklager, vi fant ikke siden
                </Heading>
                <BodyShort>Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.</BodyShort>
                <BodyShort>Vennligst sjekk at URL-en er riktig.</BodyShort>
                <Button variant={'primary'} size={'small'} onClick={gåTilForsiden}>
                    Gå til forsiden
                </Button>
            </VStack>
        </Box>
    );
}
