import * as React from 'react';

import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

import { useAppContext } from '../../../context/AppContext';
import { useLeggTilBarnModalContext } from '../../../komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';

export function LeggTilBarnKnapp() {
    const { åpneModal } = useLeggTilBarnModalContext();
    const { harInnloggetSaksbehandlerSkrivetilgang } = useAppContext();

    if (!harInnloggetSaksbehandlerSkrivetilgang()) {
        return null;
    }

    return (
        <Button variant={'tertiary'} size={'medium'} onClick={() => åpneModal()} icon={<PlusCircleIcon />}>
            Legg til barn
        </Button>
    );
}
