import * as React from 'react';

import NavFrontendSpinner from 'nav-frontend-spinner';
import { Systemtittel } from 'nav-frontend-typografi';

const SystemetLaster = () => {
    return (
        <div className={'systemet-laster'}>
            <div className={'systemet-laster__content'}>
                <Systemtittel
                    className={'systemet-laster__content--tekst'}
                    children={'Systemet laster'}
                />
                <NavFrontendSpinner
                    className={'systemet-laster__content--spinner'}
                    transparent={true}
                />
            </div>
        </div>
    );
};

export default SystemetLaster;
