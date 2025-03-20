import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import { byggTomRessurs } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';

interface IProps {
    behandlingId: number;
}

const StyledAlert = styled(Alert)`
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
        return <StyledAlert variant="info">{feilmelding}</StyledAlert>;
    } else return null;
};

export default MigreringInfoboks;
