import * as React from 'react';
import { useEffect, useState } from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

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

const StyledAlertstripe = styled(Alertstripe)`
    margin-bottom: 2rem;
`;

const Simulering: React.FunctionComponent<ISimuleringProps> = ({ åpenBehandling, fagsak }) => {
    const aktivtVedtak = aktivVedtakPåBehandling(åpenBehandling);
    const { request } = useHttp();
    const history = useHistory();
    const [simuleringResultat, settSimuleringResultat] = useState<Ressurs<ISimuleringDTO>>({
        status: RessursStatus.HENTER,
    });
    const [senderInn, settSenderInn] = useState(false);
    const [erFeilMedBekreft, settErFeilMedBekreft] = useState<undefined | string>(undefined);

    useEffect(() => {
        request<IBehandling, ISimuleringDTO>({
            method: 'GET',
            url: `/familie-ba-sak/api/simulering/${aktivtVedtak?.id}`,
        }).then(response => {
            settSimuleringResultat(response);
        });
    }, [aktivtVedtak]);

    const nesteOnClick = async () => {
        settSenderInn(true);
        request<IBehandling, IFagsak>({
            method: 'POST',
            url: `/familie-ba-sak/api/simulering/${aktivtVedtak?.id}/bekreft`,
        }).then((ressurs: Ressurs<IFagsak>) => {
            settSenderInn(false);
            if (ressurs.status === RessursStatus.SUKSESS) {
                history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vedtak`);
            } else if (
                ressurs.status === RessursStatus.FEILET ||
                ressurs.status === RessursStatus.FUNKSJONELL_FEIL ||
                ressurs.status === RessursStatus.IKKE_TILGANG
            ) {
                settErFeilMedBekreft(ressurs.frontendFeilmelding);

                /*
                 *  Todo: Midliertidig slik at man kan jobbe lokalt med toggel på uten at det krasjer.
                 *  Må fjernes når toggelen for simulering fjernes.
                 */
                process.env.NODE_ENV === 'development' &&
                    history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vedtak`);
            }
        });
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
            senderInn={senderInn}
            tittel="Simulering"
            className="simulering"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
        >
            <>
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
                {erFeilMedBekreft && (
                    <StyledAlertstripe type="feil">
                        Det har skjedd en feil og vi klarte ikke å bekrefte simuleringen:{' '}
                        {erFeilMedBekreft}
                    </StyledAlertstripe>
                )}
            </>
        </Skjemasteg>
    );
};
export default Simulering;
