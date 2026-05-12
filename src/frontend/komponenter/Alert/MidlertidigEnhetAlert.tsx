import { LocalAlert } from '@navikt/ds-react';

import { useBehandlingContext } from '../../sider/Fagsak/Behandling/context/BehandlingContext';
import { BehandlingStatus } from '../../typer/behandling';
import { MIDLERTIDIG_BEHANDLENDE_ENHET_ID } from '../../utils/behandling';

export function MidlertidigEnhetAlert() {
    const { behandling } = useBehandlingContext();

    const erBehandleneEnhetMidlertidig =
        behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId === MIDLERTIDIG_BEHANDLENDE_ENHET_ID;

    const erBehandlingAvsluttet = behandling.status === BehandlingStatus.AVSLUTTET;

    if (!erBehandleneEnhetMidlertidig || erBehandlingAvsluttet) {
        return null;
    }

    return (
        <LocalAlert status={'warning'}>
            <LocalAlert.Header>
                <LocalAlert.Title>Behandlingen er låst</LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>
                Denne behandlingen er låst fordi vi ikke har klart å sette behandlende enhet. Du må endre dette i menyen
                før du kan fortsette.
            </LocalAlert.Content>
        </LocalAlert>
    );
}
