import { useState } from 'react';

import { HentFagsakQueryKeyFactory } from '@hooks/useHentFagsak';
import { useQueryClient } from '@tanstack/react-query';
import type { IMinimalFagsak } from '@typer/fagsak';

import { Box, Button, ErrorMessage } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

interface Props {
    fagsakId: number;
}

export const GjennomførValutajusteringKnapp = ({ fagsakId }: Props) => {
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
                const fagsak = response.data;
                queryClient.setQueryData(HentFagsakQueryKeyFactory.fagsak(fagsakId), fagsak);
            } else {
                settVisFeilmelding(true);
            }
        });
    };

    return (
        <Box marginBlock={'space-16 space-0'}>
            <Button onClick={gjenomførValutajustering}>Gjennomfør valutajustering</Button>
            {visFeilmelidng && <ErrorMessage>Noe gikk galt med gjennomføringen av valutajustering</ErrorMessage>}
        </Box>
    );
};
