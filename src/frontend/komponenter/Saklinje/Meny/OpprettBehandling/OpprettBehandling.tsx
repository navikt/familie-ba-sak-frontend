import { ActionMenu } from '@navikt/ds-react';

interface Props {
    åpneModal: () => void;
}

export function OpprettBehandling({ åpneModal }: Props) {
    return <ActionMenu.Item onSelect={åpneModal}>Opprett behandling</ActionMenu.Item>;
}
