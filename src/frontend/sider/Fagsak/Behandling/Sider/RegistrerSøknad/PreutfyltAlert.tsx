import * as React from 'react';

import { Alert } from '@navikt/ds-react';

import { useBehandlingContext } from '../../context/BehandlingContext';

export function PreutfyltAlert() {
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();

    if (erLesevisning || behandling.søknadsgrunnlag !== undefined) {
        return null;
    }

    return (
        <Alert variant={'warning'}>
            En søknad er allerede registrert på behandlingen. Vi har fylt ut søknaden i skjemaet.
        </Alert>
    );
}
