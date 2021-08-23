import * as React from 'react';

import { AxiosError } from 'axios';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';

import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggFunksjonellFeilRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { BehandlingStatus, IBehandling } from '../../../../typer/behandling';
import { IFagsak } from '../../../../typer/fagsak';
import {
    TotrinnskontrollBeslutning,
    ITotrinnskontrollData,
} from '../../../../typer/totrinnskontroll';
import UIModalWrapper from '../../Modal/UIModalWrapper';
import { ITrinn, KontrollertStatus } from '../../Venstremeny/sider';
import TotrinnskontrollModalInnhold from './TotrinnskontrollModalInnhold';
import Totrinnskontrollskjema from './Totrinnskontrollskjema';

interface IProps {
    åpenBehandling: IBehandling;
    fagsak: IFagsak;
}

const Container = styled.div`
    padding: 0.5rem 1.5rem;
    display: flex;
`;

interface IModalVerdier {
    skalVises: boolean;
    beslutning: TotrinnskontrollBeslutning;
}

const initiellModalVerdi = {
    skalVises: false,
    beslutning: TotrinnskontrollBeslutning.IKKE_VURDERT,
};

const Totrinnskontroll: React.FunctionComponent<IProps> = ({ åpenBehandling, fagsak }) => {
    const { trinnPåBehandling, settIkkeKontrollerteSiderTilManglerKontroll } = useBehandling();
    const { request } = useHttp();
    const { settFagsak } = useFagsakRessurser();
    const history = useHistory();

    const [innsendtVedtak, settInnsendtVedtak] = React.useState<Ressurs<IFagsak>>(byggTomRessurs());
    const [modalVerdi, settModalVerdi] = React.useState<IModalVerdier>(initiellModalVerdi);
    React.useEffect(() => {
        settModalVerdi({
            ...modalVerdi,
            skalVises: innsendtVedtak.status === RessursStatus.SUKSESS,
        });
    }, [innsendtVedtak.status]);

    const [forrigeState, settForrigeState] = React.useState(trinnPåBehandling);
    const nullstillFeilmelding = () => {
        const erFørsteSjekk = Object.entries(forrigeState).some(([sideId, trinn]) => {
            const oppdatertTrinn: ITrinn = Object.entries(trinnPåBehandling)
                .filter(([oppdatertSideId, _]) => sideId === oppdatertSideId)
                .map(([_, aTrinn]) => aTrinn)[0];
            return (
                (trinn.kontrollert === KontrollertStatus.IKKE_KONTROLLERT ||
                    trinn.kontrollert === KontrollertStatus.MANGLER_KONTROLL) &&
                oppdatertTrinn.kontrollert === KontrollertStatus.KONTROLLERT
            );
        });
        if (erFørsteSjekk) {
            settInnsendtVedtak(byggTomRessurs());
        }
        settForrigeState(trinnPåBehandling);
    };

    React.useEffect(() => {
        nullstillFeilmelding();
    }, [trinnPåBehandling]);

    const sendInnVedtak = (
        beslutning: TotrinnskontrollBeslutning,
        begrunnelse: string,
        egetVedtak: boolean
    ) => {
        if (
            !egetVedtak &&
            Object.values(trinnPåBehandling).some(
                trinn => trinn.kontrollert !== KontrollertStatus.KONTROLLERT
            )
        ) {
            settIkkeKontrollerteSiderTilManglerKontroll();
            settInnsendtVedtak(
                byggFunksjonellFeilRessurs('Du må kontrollere alle steg i løsningen.')
            );
            return;
        }

        settInnsendtVedtak(byggHenterRessurs());
        settModalVerdi({ ...modalVerdi, beslutning: beslutning });
        const manglerBegrunnelse =
            beslutning === TotrinnskontrollBeslutning.UNDERKJENT && !begrunnelse;
        if (beslutning === TotrinnskontrollBeslutning.IKKE_VURDERT) {
            settInnsendtVedtak(byggFeiletRessurs('Totrinnskontroll ikke vurdert ved innsending'));
        } else if (manglerBegrunnelse) {
            settInnsendtVedtak(byggFeiletRessurs('Mangler begrunnelse ved innsending'));
        } else {
            request<ITotrinnskontrollData, IFagsak>({
                method: 'POST',
                data: {
                    beslutning,
                    begrunnelse,
                    kontrollerteSider: Object.entries(trinnPåBehandling).map(([_, side]) => {
                        return side.navn;
                    }),
                },
                url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/iverksett-vedtak`,
            })
                .then((response: Ressurs<IFagsak>) => {
                    settInnsendtVedtak(response);
                    if (response.status === RessursStatus.SUKSESS) {
                        settFagsak(response);
                    }
                })
                .catch((_error: AxiosError) => {
                    settInnsendtVedtak(byggFeiletRessurs('Ukjent feil, sende inn vedtak.'));
                });
        }
    };

    return (
        <>
            {åpenBehandling?.status === BehandlingStatus.FATTER_VEDTAK && (
                <Container className="totrinnskontroll">
                    <Totrinnskontrollskjema
                        åpenBehandling={åpenBehandling}
                        sendInnVedtak={sendInnVedtak}
                        innsendtVedtak={innsendtVedtak}
                    />
                </Container>
            )}

            {modalVerdi && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Totrinnskontroll',
                        lukkKnapp: false,
                        visModal: modalVerdi.skalVises,
                        actions: [
                            <Knapp
                                key={'saksoversikt'}
                                mini={true}
                                onClick={() => {
                                    settModalVerdi(initiellModalVerdi);
                                    history.push(`/fagsak/${fagsak.id}/saksoversikt`);
                                }}
                                children={'Gå til saksoversikten'}
                            />,
                            <Knapp
                                key={'oppgavebenk'}
                                type={'hoved'}
                                mini={true}
                                onClick={() => {
                                    settModalVerdi(initiellModalVerdi);
                                    history.push('/oppgaver');
                                }}
                                children={'Gå til oppgavebenken'}
                            />,
                        ],
                    }}
                >
                    <TotrinnskontrollModalInnhold beslutning={modalVerdi.beslutning} />
                </UIModalWrapper>
            )}
        </>
    );
};

export default Totrinnskontroll;
