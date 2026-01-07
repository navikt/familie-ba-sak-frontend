import React from 'react';

import { CalendarIcon } from '@navikt/aksel-icons';
import { ActionMenu } from '@navikt/ds-react';

interface Props {
    åpneModal: () => void;
}

const EndreEndringstidspunkt: React.FC<Props> = ({ åpneModal }) => {
    return (
        <ActionMenu.Item onSelect={åpneModal}>
            <CalendarIcon fontSize={'1.4rem'} />
            Oppdater endringstidspunkt
        </ActionMenu.Item>
    );
};

export default EndreEndringstidspunkt;
