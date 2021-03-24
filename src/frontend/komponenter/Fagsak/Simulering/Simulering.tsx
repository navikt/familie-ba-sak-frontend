import * as React from 'react';
import { useEffect, useState } from 'react';

import { useHistory } from 'react-router';

import Alertstripe from 'nav-frontend-alertstriper';

import { useHttp } from '@navikt/familie-http';
import { RessursStatus, Ressurs } from '@navikt/familie-typer';

import { aktivVedtakPåBehandling } from '../../../api/fagsak';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { ISimuleringDTO } from '../../../typer/simulering';
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
    const [simuleringResultat, settSimuleringResultat] = useState<Ressurs<ISimuleringDTO>>({
        status: RessursStatus.HENTER,
    });

    useEffect(() => {
        request<IBehandling, ISimuleringDTO>({
            method: 'GET',
            url: `/familie-ba-sak/api/simulering/${aktivtVedtak?.id}`,
        }).then(response => {
            settSimuleringResultat(response);
        });
    }, [aktivtVedtak]);

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

    if (
        simuleringResultat.status === RessursStatus.HENTER ||
        simuleringResultat.status === RessursStatus.IKKE_HENTET
    ) {
        return <div />;
    }

    return (
        <Skjemasteg
            senderInn={false}
            tittel="SimuleringResultat"
            className="simuleringResultat"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
        >
            {simuleringResultat?.status === RessursStatus.SUKSESS ? (
                simuleringResultat.data.perioder.length === 0 ? (
                    <Alertstripe type="info">
                        Det er ingen etterbetaling, feilutbetaling eller neste utbetaling
                    </Alertstripe>
                ) : (
                    <>
                        <SimuleringPanel simulering={simuleringResultat.data} />
                        <SimuleringTabell simulering={simuleringResultat.data} />
                    </>
                )
            ) : (
                <Alertstripe type="info">
                    Det har skjedd en feil: {simuleringResultat?.frontendFeilmelding}
                </Alertstripe>
            )}
        </Skjemasteg>
    );
};
export default Simulering;
