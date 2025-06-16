import React, { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import { Button, ErrorMessage } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import { FAGSAK_QUERY_KEY_PREFIX } from '../../../hooks/useHentFagsak';
import type { IMinimalFagsak } from '../../../typer/fagsak';

interface Props {
    fagsakId: number;
}

const StyledButton = styled(Button)`
    margin-top: 1rem;
`;

export const GjennomførValutajusteringKnapp: React.FunctionComponent<Props> = ({ fagsakId }) => {
    const { request } = useHttp();
    const queryClient = useQueryClient();

    const [visFeilmelidng, settVisFeilmelding] = useState(false);

    const gjenomførValutajustering = () => {
        settVisFeilmelding(false);

        request<void, IMinimalFagsak>({
            url: `/familie-ba-sak/api/forvalter/valutajustering/${fagsakId}/juster-valuta`,
            method: 'POST',
            påvirkerSystemLaster: true,
        }).then(response => {
            if (response.status === RessursStatus.SUKSESS) {
                const fagsakId = response.data.id;
                queryClient.invalidateQueries({ queryKey: [FAGSAK_QUERY_KEY_PREFIX, fagsakId] });
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
