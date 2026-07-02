import { Box, LocalAlert } from '@navikt/ds-react';

export function SøknadRegistrert() {
    return (
        <Box marginBlock={'space-28 space-12'}>
            <LocalAlert status={'warning'}>
                <LocalAlert.Header>
                    <LocalAlert.Title>Søknad registrert</LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>
                    En søknad er allerede registrert på behandlingen. Vi har fylt ut søknaden i skjemaet.
                </LocalAlert.Content>
            </LocalAlert>
        </Box>
    );
}
