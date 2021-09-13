import * as React from 'react';

import { Feilmelding } from 'nav-frontend-typografi';

import { IPersonMedAndelerTilkjentYtelse } from '../../../../typer/beregning';
import { useEndreUtbetalingAndelSkjema } from './useEndeUtbetalingAndelSkjema';

interface IProps {
    tidslinjePerioder: IPersonMedAndelerTilkjentYtelse[];
}

const EndreUtbetalingAndelSkjema: React.FunctionComponent<IProps> = ({ tidslinjePerioder }) => {
    const { skjema, feilmelding } = useEndreUtbetalingAndelSkjema(tidslinjePerioder);
    return feilmelding ? (
        <Feilmelding children={feilmelding} />
    ) : (
        <div>Verdi her {skjema.felter.midlertidigFelt.verdi}</div>
    );
};

export default EndreUtbetalingAndelSkjema;
