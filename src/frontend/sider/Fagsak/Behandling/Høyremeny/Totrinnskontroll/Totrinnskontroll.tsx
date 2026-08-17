import { useBehandling } from '@hooks/useBehandling';
import { BehandlingStatus } from '@typer/behandling';

import { Box } from '@navikt/ds-react';

import { TotrinnskontrollForm } from './TotrinnskontrollForm';

export function Totrinnskontroll() {
    const behandling = useBehandling();

    if (behandling.status !== BehandlingStatus.FATTER_VEDTAK) {
        return null;
    }

    return (
        <Box padding={'space-24'}>
            <TotrinnskontrollForm />
        </Box>
    );
}
