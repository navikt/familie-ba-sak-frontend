import * as React from 'react';

import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';

import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggFunksjonellFeilRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../../typer/behandling';
import { BehandlingStatus } from '../../../../typer/behandling';
import type { ITotrinnskontrollData } from '../../../../typer/totrinnskontroll';
import { TotrinnskontrollBeslutning } from '../../../../typer/totrinnskontroll';
import UIModalWrapper from '../../Modal/UIModalWrapper';
import type { ITrinn } from '../../Venstremeny/sider';
import { KontrollertStatus } from '../../Venstremeny/sider';
import TotrinnskontrollModalInnhold from './TotrinnskontrollModalInnhold';
import Totrinnskontrollskjema from './Totrinnskontrollskjema';

interface IProps {
    åpenBehandling: IBehandling;
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

const Totrinnskontroll: React.FunctionComponent<IProps> = ({ åpenBehandling }) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { trinnPåBehandling, settIkkeKontrollerteSiderTilManglerKontroll, settÅpenBehandling } =
        useBehandling();
    const { request } = useHttp();
    const navigate = useNavigate();

    const [innsendtVedtak, settInnsendtVedtak] = React.useState<Ressurs<IBehandling>>(
        byggTomRessurs()
    );
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
        settModalVerdi({ ...modalVerdi, beslutning });
        const manglerBegrunnelse =
            beslutning === TotrinnskontrollBeslutning.UNDERKJENT && !begrunnelse;
        if (beslutning === TotrinnskontrollBeslutning.IKKE_VURDERT) {
            settInnsendtVedtak(byggFeiletRessurs('Totrinnskontroll ikke vurdert ved innsending'));
        } else if (manglerBegrunnelse) {
            settInnsendtVedtak(byggFeiletRessurs('Mangler begrunnelse ved innsending'));
        } else {
            request<ITotrinnskontrollData, IBehandling>({
                method: 'POST',
                data: {
                    beslutning,
                    begrunnelse,
                    kontrollerteSider: Object.entries(trinnPåBehandling).map(([_, side]) => {
                        return side.navn;
                    }),
                },
                url: `/familie-ba-sak/api/behandlinger/${åpenBehandling.behandlingId}/steg/iverksett-vedtak`,
            })
                .then((response: Ressurs<IBehandling>) => {
                    settInnsendtVedtak(response);
                    if (response.status === RessursStatus.SUKSESS) {
                        settÅpenBehandling(response);
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
                                    navigate(`/fagsak/${fagsakId}/saksoversikt`);
                                }}
                                children={'Gå til saksoversikten'}
                            />,
                            <Knapp
                                key={'oppgavebenk'}
                                type={'hoved'}
                                mini={true}
                                onClick={() => {
                                    settModalVerdi(initiellModalVerdi);
                                    navigate('/oppgaver');
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
