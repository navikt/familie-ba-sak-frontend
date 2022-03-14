import React from 'react';

import type { ISODateString } from '@navikt/familie-form-elements';
import { FamilieDatovelger } from '@navikt/familie-form-elements';
import type { Felt } from '@navikt/familie-skjema';

interface IProps {
    datoFelt: Felt<string | undefined>;
}

const VarselOmRevurderingSamboerSkjema = (props: IProps) => {
    const { datoFelt } = props;

    return (
        <FamilieDatovelger
            id={'456789'}
            label={'Velg dato'}
            onChange={(dato?: ISODateString) => datoFelt.validerOgSettFelt(dato)}
            valgtDato={datoFelt.verdi}
        />
    );
};

export default VarselOmRevurderingSamboerSkjema;
