import React from 'react';

import { Button } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';

import { erProd } from '../../../../../utils/miljø';

export const TømPersonopplysningerCacheITestmiljøKnapp = () => {
    const { request } = useHttp();

    const tømCache = () => {
        if (erProd()) {
            return;
        }

        request<undefined, string>({
            method: 'POST',
            url: `/familie-ba-sak/api/preprod/clear-personopplysninger-cache`,
            påvirkerSystemLaster: true,
        }).catch(() => alert('Klarte ikke å tømme personopplysninger-cache'));
    };

    return <Button onClick={tømCache}>Tøm personopplysninger-cache</Button>;
};
