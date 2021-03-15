import * as React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import Alertstripe from 'nav-frontend-alertstriper';

import { useHttp } from '@navikt/familie-http';

import { aktivVedtakPåBehandling } from '../../../api/fagsak';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';

interface ISimuleringProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const StyledAlertstripe = styled(Alertstripe)`
    margin-bottom: 2rem;
`;

const Simulering: React.FunctionComponent<ISimuleringProps> = ({ åpenBehandling, fagsak }) => {
    const { request } = useHttp();
    const history = useHistory();
    const aktivtVedtak = aktivVedtakPåBehandling(åpenBehandling);

    const nesteOnClick = async () => {
        await request<IBehandling, any>({
            method: 'POST',
            url: `/familie-ba-sak/api/simulering/${aktivtVedtak?.id}/bekreft`,
        });
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vedtak`);
    };

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/tilkjent-ytelse`);
    };

    return (
        <Skjemasteg
            senderInn={false}
            tittel="Simulering"
            className="simulering"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
        >
            <StyledAlertstripe type="info">
                Det er ingen etterbetaling, feilutbetaling eller neste utbetaling (det er ikke
                implementert enda.)
            </StyledAlertstripe>
        </Skjemasteg>
    );
};

export default Simulering;
