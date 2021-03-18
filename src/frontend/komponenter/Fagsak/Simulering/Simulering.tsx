import * as React from 'react';

import { useHistory } from 'react-router';

import Alertstripe from 'nav-frontend-alertstriper';

import { useHttp } from '@navikt/familie-http';

import { aktivVedtakPåBehandling } from '../../../api/fagsak';
import { useSimulering } from '../../../context/SimuleringContext';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import SimuleringPanel from './SimuleringPanel';
import SimuleringTabell from './SimuleringTabell';

interface ISimuleringProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const Simulering: React.FunctionComponent<ISimuleringProps> = ({ åpenBehandling, fagsak }) => {
    const aktivtVedtak = aktivVedtakPåBehandling(åpenBehandling);
    const { request } = useHttp();
    const history = useHistory();
    const { simuleringResultat } = useSimulering();

    const nesteOnClick = async () => {
        await request<IBehandling, string>({
            method: 'POST',
            url: `/familie-ba-sak/api/simuleringResultat/${aktivtVedtak?.id}/bekreft`,
        });
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vedtak`);
    };

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/tilkjent-ytelse`);
    };

    return (
        <Skjemasteg
            senderInn={false}
            tittel="SimuleringResultat"
            className="simuleringResultat"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
        >
            {simuleringResultat?.type === 'suksess' ? (
                Object.keys(simuleringResultat.simulering.periodeDictionary).length === 0 ? (
                    <Alertstripe type="info">
                        Det er ingen etterbetaling, feilutbetaling eller neste utbetaling
                    </Alertstripe>
                ) : (
                    <>
                        <SimuleringPanel simulering={simuleringResultat.simulering} />
                        <SimuleringTabell simulering={simuleringResultat.simulering} />
                    </>
                )
            ) : (
                <Alertstripe type="info">
                    Det har skjedd en feil: {simuleringResultat?.feilmelding}
                </Alertstripe>
            )}
        </Skjemasteg>
    );
};
export default Simulering;
