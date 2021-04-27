import * as React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import Alertstripe from 'nav-frontend-alertstriper';

import { RessursStatus, Ressurs } from '@navikt/familie-typer';

import { aktivVedtakPåBehandling } from '../../../api/fagsak';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { useSimulering } from '../../../context/SimuleringContext';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { ITilbakekreving } from '../../../typer/simulering';
import { hentSøkersMålform } from '../../../utils/behandling';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import SimuleringPanel from './SimuleringPanel';
import SimuleringTabell from './SimuleringTabell';
import TilbakekrevingSkjema from './TilbakekrevingSkjema';

interface ISimuleringProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const StyledAlertstripe = styled(Alertstripe)`
    margin-bottom: 2rem;
`;

const Simulering: React.FunctionComponent<ISimuleringProps> = ({ åpenBehandling, fagsak }) => {
    const aktivtVedtak = aktivVedtakPåBehandling(åpenBehandling);

    const history = useHistory();
    const {
        erFeilutbetaling,
        hentSkjemadata,
        onSubmit,
        simuleringsresultat,
        skjema,
        tilbakekrevingErToggletPå,
    } = useSimulering();

    const { settFagsak } = useFagsakRessurser();

    const nesteOnClick = () => {
        onSubmit<ITilbakekreving | undefined>(
            {
                data: hentSkjemadata(),
                method: 'POST',
                url: `/familie-ba-sak/api/vedtak/${aktivtVedtak?.id}/tilbakekreving`,
            },
            (ressurs: Ressurs<IFagsak>) => {
                if (ressurs.status === RessursStatus.SUKSESS) {
                    settFagsak(ressurs);
                    history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vedtak`);
                }

                /*
                 *  Todo: Midliertidig slik at man kan jobbe lokalt med toggel på uten at det krasjer.
                 *  Må fjernes når toggelen for simulering fjernes.
                 */
                process.env.NODE_ENV === 'development' &&
                    history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vedtak`);
            }
        );
    };

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/tilkjent-ytelse`);
    };

    if (
        simuleringsresultat.status === RessursStatus.HENTER ||
        simuleringsresultat.status === RessursStatus.IKKE_HENTET
    ) {
        return <div />;
    }

    return (
        <Skjemasteg
            senderInn={skjema.submitRessurs.status === RessursStatus.HENTER}
            tittel="Simulering"
            className="simulering"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
        >
            {simuleringsresultat?.status === RessursStatus.SUKSESS ? (
                simuleringsresultat.data.perioder.length === 0 ? (
                    <Alertstripe type="info">
                        Det er ingen etterbetaling, feilutbetaling eller neste utbetaling
                    </Alertstripe>
                ) : (
                    <>
                        <SimuleringPanel simulering={simuleringsresultat.data} />
                        <SimuleringTabell simulering={simuleringsresultat.data} />
                        {tilbakekrevingErToggletPå && erFeilutbetaling && (
                            <TilbakekrevingSkjema
                                søkerMålform={hentSøkersMålform(åpenBehandling)}
                            />
                        )}
                    </>
                )
            ) : (
                <Alertstripe type="info">
                    Det har skjedd en feil: {simuleringsresultat?.frontendFeilmelding}
                </Alertstripe>
            )}

            {(skjema.submitRessurs.status === RessursStatus.FEILET ||
                skjema.submitRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
                skjema.submitRessurs.status === RessursStatus.IKKE_TILGANG) && (
                <StyledAlertstripe type="feil">
                    Det har skjedd en feil og vi klarte ikke å bekrefte simuleringen:{' '}
                    {skjema.submitRessurs.frontendFeilmelding}
                </StyledAlertstripe>
            )}
        </Skjemasteg>
    );
};

export default Simulering;
