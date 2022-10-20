import * as React from 'react';

import NavFrontendSpinner from 'nav-frontend-spinner';

import { Heading } from '@navikt/ds-react';

const SystemetLaster = () => {
    return (
        <div className={'systemet-laster'}>
            <div className={'systemet-laster__content'}>
                <Heading
                    size={'medium'}
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
