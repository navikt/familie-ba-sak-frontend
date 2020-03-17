import * as React from 'react';
import { useSøknad } from '../../../context/SøknadContext';
import { Sidetittel } from 'nav-frontend-typografi';
import SøknadType from './SøknadType';
import SøkerOppholdINorge from './SøkerOppholdINorge';

const RegistrerSøknad: React.FunctionComponent = () => {
    const { søknad, settSøknad } = useSøknad();

    return (
        <div className={'søknad'}>
            <Sidetittel children={'Informasjon fra søknaden'} />
            <br />

            <SøknadType settSøknad={settSøknad} søknad={søknad} />

            <SøkerOppholdINorge settSøknad={settSøknad} søknad={søknad} />
        </div>
    );
};

export default RegistrerSøknad;
