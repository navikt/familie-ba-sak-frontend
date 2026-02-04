import * as React from 'react';

import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { Button, Modal } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggFunksjonellFeilRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import TotrinnskontrollModalInnhold from './TotrinnskontrollModalInnhold';
import { Totrinnskontrollskjema } from './Totrinnskontrollskjema';
import type { IBehandling } from '../../../../../typer/behandling';
import { BehandlingStatus } from '../../../../../typer/behandling';
import type { ITotrinnskontrollData } from '../../../../../typer/totrinnskontroll';
import { TotrinnskontrollBeslutning } from '../../../../../typer/totrinnskontroll';
import { useFagsakContext } from '../../../FagsakContext';
import { useBehandlingContext } from '../../context/BehandlingContext';
import type { ITrinn } from '../../Sider/sider';
import { KontrollertStatus } from '../../Sider/sider';

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

export function Totrinnskontroll() {
    const { fagsak } = useFagsakContext();
    const { behandling, trinnPåBehandling, settIkkeKontrollerteSiderTilManglerKontroll, settÅpenBehandling } =
        useBehandlingContext();
    const { request } = useHttp();
    const navigate = useNavigate();

    const [innsendtVedtak, settInnsendtVedtak] = React.useState<Ressurs<IBehandling>>(byggTomRessurs());
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

    const sendInnVedtak = (beslutning: TotrinnskontrollBeslutning, begrunnelse: string, egetVedtak: boolean) => {
        if (
            !egetVedtak &&
            Object.values(trinnPåBehandling).some(trinn => trinn.kontrollert !== KontrollertStatus.KONTROLLERT)
        ) {
            settIkkeKontrollerteSiderTilManglerKontroll();
            settInnsendtVedtak(byggFunksjonellFeilRessurs('Du må kontrollere alle steg i løsningen.'));
            return;
        }

        settInnsendtVedtak(byggHenterRessurs());
        settModalVerdi({ ...modalVerdi, beslutning });
        const manglerBegrunnelse = beslutning === TotrinnskontrollBeslutning.UNDERKJENT && !begrunnelse;
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
                url: `/familie-ba-sak/api/behandlinger/${behandling.behandlingId}/steg/iverksett-vedtak`,
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
            {behandling.status === BehandlingStatus.FATTER_VEDTAK && (
                <Container className="totrinnskontroll">
                    <Totrinnskontrollskjema sendInnVedtak={sendInnVedtak} innsendtVedtak={innsendtVedtak} />
                </Container>
            )}

            {modalVerdi.skalVises && (
                <Modal
                    open
                    onClose={() => settModalVerdi(initiellModalVerdi)}
                    header={{ heading: 'Totrinnskontroll', size: 'medium' }}
                >
                    <Modal.Body>
                        <TotrinnskontrollModalInnhold beslutning={modalVerdi.beslutning} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            key={'saksoversikt'}
                            variant={'secondary'}
                            size={'medium'}
                            onClick={() => {
                                settModalVerdi(initiellModalVerdi);
                                navigate(`/fagsak/${fagsak.id}/saksoversikt`);
                            }}
                            children={'Se saksoversikt'}
                        />
                        <Button
                            key={'oppgavebenk'}
                            variant={'secondary'}
                            size={'medium'}
                            onClick={() => {
                                settModalVerdi(initiellModalVerdi);
                                navigate('/oppgaver');
                            }}
                            children={'Se oppgavebenk'}
                        />
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}
