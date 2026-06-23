import { useBehandling } from '@hooks/useBehandling';

import { ActionMenu } from '@navikt/ds-react';

interface Props {
    åpneModal: () => void;
}

export function TaBehandlingAvVent({ åpneModal }: Props) {
    const behandling = useBehandling();

    if (behandling.aktivSettPåVent === undefined || behandling.aktivSettPåVent === null) {
        return null;
    }

    return <ActionMenu.Item onSelect={åpneModal}>Fortsett behandling</ActionMenu.Item>;
}
