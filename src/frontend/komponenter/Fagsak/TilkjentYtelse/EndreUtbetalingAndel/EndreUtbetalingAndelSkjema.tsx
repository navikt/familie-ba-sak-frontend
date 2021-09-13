import * as React from 'react';

import { Feilmelding } from 'nav-frontend-typografi';

import { useEndreUtbetalingAndelSkjema } from './useEndeUtbetalingAndelSkjema';

const EndreUtbetalingAndelSkjema: React.FC = () => {
    const { skjema, feilmelding } = useEndreUtbetalingAndelSkjema();
    return feilmelding ? (
        <Feilmelding children={feilmelding} />
    ) : (
        <div>{skjema.felter.midlertidigFelt.verdi.toString()}</div>
    );
};

export default EndreUtbetalingAndelSkjema;
