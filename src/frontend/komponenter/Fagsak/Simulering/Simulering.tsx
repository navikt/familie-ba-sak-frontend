import * as React from 'react';
import { useState } from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import Alertstripe from 'nav-frontend-alertstriper';

import { useHttp } from '@navikt/familie-http';
import { RessursStatus } from '@navikt/familie-typer';

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
    const [feilMedBekreft, settErFeilMedBekreft] = useState<undefined | string>(undefined);
    const [senderInn, settSenderInn] = useState(false);

    const nesteOnClick = async () => {
        settSenderInn(true);
        request<IBehandling, any>({
            method: 'POST',
            url: `/familie-ba-sak/api/simulering/${aktivtVedtak?.id}/bekreft`,
        }).then((ressurs: IRessurs<IFagsak>) => {
            settSenderInn(false);
            if (response.status === RessursStatus.SUKSESS) {
                history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vedtak`);
            } else if (
                response.status === RessursStatus.FEILET ||
                response.status === RessursStatus.FUNKSJONELL_FEIL ||
                response.status === RessursStatus.IKKE_TILGANG
            ) {
                settErFeilMedBekreft(response.frontendFeilmelding);
            }
        }); 
    };

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/tilkjent-ytelse`);
    };

    return (
        <Skjemasteg
            senderInn={senderInn}
            tittel="Simulering"
            className="simulering"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
        >
            <StyledAlertstripe type="info">
                Det er ingen etterbetaling, feilutbetaling eller neste utbetaling (Visning av
                simuleringen er ikke implementert enda)
            </StyledAlertstripe>

            {feilMedBekreft && (
                <StyledAlertstripe type="feil">
                    Det har skjedd en feil og vi klarte ikke å bekrefte simuleringen:{' '}
                    {feilMedBekreft}
                </StyledAlertstripe>
            )}
        </Skjemasteg>
    );
};

export default Simulering;
