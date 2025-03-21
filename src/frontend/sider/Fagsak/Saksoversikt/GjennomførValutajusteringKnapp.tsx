import React, { useState } from 'react';

import styled from 'styled-components';

import { Button, ErrorMessage } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import type { IMinimalFagsak } from '../../../typer/fagsak';
import { useFagsakContext } from '../FagsakContext';

interface Props {
    fagsakId: number;
}

const StyledButton = styled(Button)`
    margin-top: 1rem;
`;

export const GjennomførValutajusteringKnapp: React.FunctionComponent<Props> = ({ fagsakId }) => {
    const { request } = useHttp();
    const { settMinimalFagsak } = useFagsakContext();
    const [visFeilmelidng, settVisFeilmelding] = useState(false);

    const gjenomførValutajustering = () => {
        settVisFeilmelding(false);

        request<void, IMinimalFagsak>({
            url: `/familie-ba-sak/api/forvalter/valutajustering/${fagsakId}/juster-valuta`,
            method: 'POST',
            påvirkerSystemLaster: true,
        }).then(response => {
            if (response.status === RessursStatus.SUKSESS) {
                settMinimalFagsak(response);
            } else {
                settVisFeilmelding(true);
            }
        });
    };

    return (
        <>
            <StyledButton onClick={gjenomførValutajustering}>
                Gjennomfør valutajustering
            </StyledButton>
            {visFeilmelidng && (
                <ErrorMessage>Noe gikk galt med gjennomføringen av valutajustering</ErrorMessage>
            )}
        </>
    );
};
