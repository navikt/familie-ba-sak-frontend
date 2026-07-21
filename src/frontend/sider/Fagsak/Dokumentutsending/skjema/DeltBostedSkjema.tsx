import { Box } from '@navikt/ds-react';

import { LeggTilBarnKnapp } from '../LeggTilBarnKnapp';
import { BarnCheckboxGruppe } from './BarnCheckboxGruppe';
import { DeltBostedAvtaler } from './DeltBostedAvtaler';

export function DeltBostedSkjema() {
    return (
        <Box>
            <BarnCheckboxGruppe
                legend={'Hvilke barn har delt bosted?'}
                barnInnhold={barn => <DeltBostedAvtaler barn={barn} />}
            />
            <LeggTilBarnKnapp />
        </Box>
    );
}
