import createUseContext from 'constate';
import { useState } from 'react';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/components/types.internal';

const [TidslinjeProvider, useTidslinje] = createUseContext(() => {
    const [aktivEtikett, settAktivEtikett] = useState<Skalaetikett | undefined>(undefined);

    return { aktivEtikett, settAktivEtikett };
});

export { TidslinjeProvider, useTidslinje };
