import React, { useEffect, useState } from 'react';

import { Box, LocalAlert } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs } from '@navikt/familie-typer';

import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';

interface IProps {
    behandlingId: number;
}

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
        return (
            <Box marginBlock={'space-16'}>
                <LocalAlert status={'error'}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>{feilmelding}</LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            </Box>
        );
    } else return null;
};

export default MigreringInfoboks;
