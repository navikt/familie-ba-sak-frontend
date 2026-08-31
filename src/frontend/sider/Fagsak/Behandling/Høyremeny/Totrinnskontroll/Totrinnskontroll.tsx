import { useBehandling } from '@hooks/useBehandling';
import { Box } from '@navikt/ds-react';
import { BehandlingStatus } from '@typer/behandling';

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
