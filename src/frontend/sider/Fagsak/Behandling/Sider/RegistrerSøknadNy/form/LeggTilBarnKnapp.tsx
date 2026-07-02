import { useLeggTilBarnModalContext } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';

import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

export function LeggTilBarnKnapp() {
    const { åpneModal } = useLeggTilBarnModalContext();

    return (
        <div>
            <Button type={'button'} variant={'tertiary'} size={'medium'} onClick={åpneModal} icon={<PlusCircleIcon />}>
                Legg til barn
            </Button>
        </div>
    );
}
