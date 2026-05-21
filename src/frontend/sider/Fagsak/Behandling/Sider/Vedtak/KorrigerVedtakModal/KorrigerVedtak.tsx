import { useBehandling } from '@hooks/useBehandling';

import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { ActionMenu } from '@navikt/ds-react';

interface Props {
    åpneModal: () => void;
}

export function KorrigerVedtak({ åpneModal }: Props) {
    const behandling = useBehandling();
    return (
        <ActionMenu.Item onSelect={åpneModal}>
            <ExclamationmarkTriangleIcon fontSize={'1.4rem'} />
            {behandling.korrigertVedtak ? <>Vis korrigert vedtak</> : <>Korriger vedtak</>}
        </ActionMenu.Item>
    );
}
