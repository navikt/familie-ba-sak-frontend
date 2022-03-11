import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AlertStripeInfo } from 'nav-frontend-alertstriper';

import { useHttp } from '@navikt/familie-http';
import { byggTomRessurs, type Ressurs } from '@navikt/familie-typer';

import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';

interface IProps {
    behandlingId: number;
}

const StyledAlertStripeInfo = styled(AlertStripeInfo)`
    margin: 1rem 0;
`;

const MigreringInfoboks: React.FC<IProps> = ({ behandlingId }) => {
    const { request } = useHttp();
    const [melding, settMelding] = useState<Ressurs<boolean>>(byggTomRessurs());

    useEffect(() => {
        request<void, boolean>({
            method: 'GET',
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/behandlingsresultat/valider`,
        }).then((response: Ressurs<boolean>) => {
            settMelding(response);
        });
    }, []);

    const feilmelding = hentFrontendFeilmelding(melding);

    if (feilmelding !== undefined) {
        return <StyledAlertStripeInfo>{feilmelding}</StyledAlertStripeInfo>;
    } else return null;
};

export default MigreringInfoboks;
