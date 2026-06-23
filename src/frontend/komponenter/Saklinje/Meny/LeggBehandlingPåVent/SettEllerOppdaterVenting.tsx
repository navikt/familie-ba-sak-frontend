import { useBehandling } from '@hooks/useBehandling';
import { BehandlingStatus } from '@typer/behandling';

import { ActionMenu } from '@navikt/ds-react';

interface Props {
    åpneModal: () => void;
}

export function SettEllerOppdaterVenting({ åpneModal }: Props) {
    const behandling = useBehandling();

    if (behandling.status !== BehandlingStatus.UTREDES) {
        return null;
    }

    const erBehandlingAlleredePåVent = !!behandling.aktivSettPåVent;

    return (
        <ActionMenu.Item onSelect={åpneModal}>
            {erBehandlingAlleredePåVent ? 'Endre ventende behandling' : 'Sett behandling på vent'}
        </ActionMenu.Item>
    );
}
