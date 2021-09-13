import * as React from 'react';
import { useEndreUtbetalingAndelSkjema } from './useEndeUtbetalingAndelSkjema';
import { IPersonMedAndelerTilkjentYtelse } from '../../../../typer/beregning';
import { Feilmelding } from 'nav-frontend-typografi';

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
