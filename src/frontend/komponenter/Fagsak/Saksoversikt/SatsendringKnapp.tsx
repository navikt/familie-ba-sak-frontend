import React, { useState } from 'react';

import styled from 'styled-components';

import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Alert, Button, ErrorMessage } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import { useSatsendringsknapp } from './useSatsendringsknapp';
import { useFagsakContext } from '../../../context/fagsak/FagsakContext';
import type { IMinimalFagsak } from '../../../typer/fagsak';

const StyledAlert = styled(Alert)`
    margin-top: 2rem;
`;

const StyledButton = styled(Button)`
    margin-top: 1rem;
`;

const StyledErrorMessage = styled(ErrorMessage)`
    margin-top: 1rem;
`;

interface IProps {
    minimalFagsak: IMinimalFagsak;
}

export const SatsendringKnapp: React.FunctionComponent<IProps> = ({ minimalFagsak }) => {
    const { request } = useHttp();
    const { settKanKjøreSatsendringTilFalse } = useSatsendringsknapp({
        minimalFagsak,
    });
    const { oppdaterGjeldendeFagsak } = useFagsakContext();
    const [kjørSatsendringRessurs, settKjørSatsendringRessurs] = useState<Ressurs<void>>(
        byggTomRessurs()
    );

    const oppdaterFagsakMedSatsendring = () => {
        request<undefined, undefined>({
            method: 'PUT',
            url: `/familie-ba-sak/api/satsendring/${minimalFagsak.id}/kjor-satsendring-synkront`,
            påvirkerSystemLaster: true,
        }).then((kjørSatsendringRessurs: Ressurs<undefined>) => {
            settKjørSatsendringRessurs(kjørSatsendringRessurs);

            if (kjørSatsendringRessurs.status === RessursStatus.SUKSESS) {
                settKanKjøreSatsendringTilFalse();
                oppdaterGjeldendeFagsak();
            }
        });
    };

    return (
        <>
            <StyledAlert variant={'warning'}>
                NB! Du skal kun bruke "Gjennomfør satsendring"-knappen når du skal gjennomføre en
                revurdering uten endringer med resultat "fortsatt innvilget". I alle andre
                behandlinger vil satsendringen legges til automatisk.
            </StyledAlert>

            <StyledButton icon={<PlusCircleIcon />} onClick={oppdaterFagsakMedSatsendring}>
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
