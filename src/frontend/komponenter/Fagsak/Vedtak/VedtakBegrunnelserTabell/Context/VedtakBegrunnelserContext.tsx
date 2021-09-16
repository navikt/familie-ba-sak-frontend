import React, { useEffect, useState } from 'react';

import constate from 'constate';

import { RessursStatus } from '@navikt/familie-typer';

import {
    IRestAvslagbegrunnelser,
    IRestVedtakBegrunnelse,
    IVedtakForBehandling,
} from '../../../../../typer/vedtak';

export interface IVedtakBegrunnelseSubmit {
    periodeId: string;
    feilmelding: string;
    status: RessursStatus;
}

const initialVedtakBegrunnelseSubmit = {
    periodeId: '',
    feilmelding: '',
    status: RessursStatus.IKKE_HENTET,
};

interface IProps {
    aktivVedtak?: IVedtakForBehandling;
}

const [VedtakBegrunnelserProvider, useVedtakBegrunnelser] = constate(({ aktivVedtak }: IProps) => {
    const [vedtakBegrunnelseSubmit] = useState<IVedtakBegrunnelseSubmit>(
        initialVedtakBegrunnelseSubmit
    );

    const [vedtakBegrunnelser, settVedtakBegrunnelser] = React.useState<IRestVedtakBegrunnelse[]>(
        []
    );

    const [avslagBegrunnelser, settAvslagBegrunnelser] = React.useState<IRestAvslagbegrunnelser[]>(
        []
    );

    useEffect(() => {
        if (aktivVedtak) {
            settVedtakBegrunnelser(aktivVedtak.begrunnelser);
            settAvslagBegrunnelser(aktivVedtak.avslagBegrunnelser);
        }
    }, [aktivVedtak]);

    return {
        avslagBegrunnelser,
        vedtakBegrunnelseSubmit,
        vedtakBegrunnelser,
    };
});

export { VedtakBegrunnelserProvider, useVedtakBegrunnelser };
