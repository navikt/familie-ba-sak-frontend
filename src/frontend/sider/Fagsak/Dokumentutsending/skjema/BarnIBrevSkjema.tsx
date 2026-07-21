import { Box } from '@navikt/ds-react';

import { LeggTilBarnKnapp } from '../LeggTilBarnKnapp';
import { BarnCheckboxGruppe } from './BarnCheckboxGruppe';

interface Props {
    tittel: string;
}

export function BarnIBrevSkjema({ tittel }: Props) {
    return (
        <Box>
            <BarnCheckboxGruppe legend={tittel} />
            <LeggTilBarnKnapp />
        </Box>
    );
}
