import * as React from 'react';

import { Loader, Heading } from '@navikt/ds-react';

const SystemetLaster = () => {
    return (
        <div className={'systemet-laster'}>
            <div className={'systemet-laster__content'}>
                <Heading
                    size={'medium'}
                    className={'systemet-laster__content--tekst'}
                    children={'Systemet laster'}
                />
                <Loader size="large" transparent={true} title="Systemet laster data" />
            </div>
        </div>
    );
};

export default SystemetLaster;
