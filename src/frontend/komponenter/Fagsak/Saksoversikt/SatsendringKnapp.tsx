import React, { useState } from 'react';

import styled from 'styled-components';

import { AddCircle } from '@navikt/ds-icons';
import { Button, ErrorMessage } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import { useFagsakContext } from '../../../context/fagsak/FagsakContext';
import { useSatsendringsknapp } from './useSatsendringsknapp';

const StyledButton = styled(Button)`
    margin-top: 2rem;
`;

const StyledErrorMessage = styled(ErrorMessage)`
    margin-top: 1rem;
`;

interface IProps {
    fagsakId: number;
}

export const SatsendringKnapp: React.FunctionComponent<IProps> = ({ fagsakId }) => {
    const { request } = useHttp();
    const { oppdaterKanKjøreSatsendring } = useSatsendringsknapp({
        fagsakId,
    });
    const { oppdaterGjeldendeFagsak } = useFagsakContext();
    const [kjørSatsendringRessurs, settKjørSatsendringRessurs] = useState<Ressurs<void>>(
        byggTomRessurs()
    );

    const oppdaterFagsakMedSatsendring = () => {
        request<undefined, undefined>({
            method: 'PUT',
            url: `/familie-ba-sak/api/satsendring/${fagsakId}/kjor-satsendring-synkront`,
            påvirkerSystemLaster: true,
        }).then((kjørSatsendringRessurs: Ressurs<undefined>) => {
            settKjørSatsendringRessurs(kjørSatsendringRessurs);

            if (kjørSatsendringRessurs.status === RessursStatus.SUKSESS) {
                oppdaterKanKjøreSatsendring();
                oppdaterGjeldendeFagsak();
            }
        });
    };

    return (
        <>
            <StyledButton icon={<AddCircle />} onClick={oppdaterFagsakMedSatsendring}>
                Gjennomfør satsendring
            </StyledButton>

            {kjørSatsendringRessurs.status === RessursStatus.FUNKSJONELL_FEIL && (
                <StyledErrorMessage>
                    {kjørSatsendringRessurs.frontendFeilmelding}
                </StyledErrorMessage>
            )}
            {kjørSatsendringRessurs.status === RessursStatus.FEILET && (
                <StyledErrorMessage>
                    Det har skjedd en feil, og satsendringen ble ikke gjennomført. Prøv igjen eller
                    kontakt brukerstøtte hvis problemet vedvarer.
                </StyledErrorMessage>
            )}
        </>
    );
};
