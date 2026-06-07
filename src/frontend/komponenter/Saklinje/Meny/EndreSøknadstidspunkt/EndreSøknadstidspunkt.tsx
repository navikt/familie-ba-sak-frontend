import { ActionMenu } from '@navikt/ds-react';

interface Props {
    åpneModal: () => void;
}

export function EndreSøknadstidspunkt({ åpneModal }: Props) {
    return <ActionMenu.Item onSelect={åpneModal}>Endre søknadstidspunkt</ActionMenu.Item>;
}
